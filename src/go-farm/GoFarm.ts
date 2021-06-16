import { Fetcher, Route, Token } from 'garfieldswap-sdk';
import { Configuration } from './config';
import { StartTime, TokenStat, UserInfo, TotalPot, Allocations } from './types';
import { BigNumber, Contract, ethers, Overrides, PayableOverrides } from 'ethers';
import { BaseProvider, TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDefaultProvider } from '../utils/provider';
import IUniswapV2PairABI from './IUniswapV2Pair.abi.json';
import MasterChefABI from './deployments/masterChef.abi.json';
import GVaultABI from './deployments/gVault.abi.json';
import GVaultHTABI from './deployments/gVaultHT.abi.json';
import GetApyAbi from './deployments/GetApy.abi.json';
import GetVaultApyAbi from './deployments/GetVaultApy.abi.json';

/**
 * An API module of GoFarm Cash contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class GoFarm {
  myAccount: string;
  balance: BigNumber;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  pair: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };
  boardroomVersionOfUser?: string;

  bacDai: Contract;

  constructor(cfg: Configuration) {
    const { externalTokens, vaults } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    this.contracts['MasterChef'] = new Contract(cfg.MasterChef, MasterChefABI, provider);
    this.contracts['GetApy'] = new Contract(cfg.GetApy, GetApyAbi, provider);
    this.contracts['GetVaultApy'] = new Contract(cfg.GetVaultApy, GetVaultApyAbi, provider);
    this.externalTokens = {};
    this.pair = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal);
    }

    for (const [symbol, address] of Object.entries(vaults)) {
      const abi = symbol === 'HT' ? GVaultHTABI : GVaultABI;
      this.contracts[symbol] = new Contract(address, abi, provider);
    }

    // Uniswap V2 Pair
    this.bacDai = new Contract(externalTokens['GFT_USDT-LP'][0], IUniswapV2PairABI, provider);

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string, balance: BigNumber) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    this.balance = balance;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    this.bacDai = this.bacDai.connect(this.signer);
    this.boardroomVersionOfUser = 'latest';
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }
  gasAndValueOptions(gas: BigNumber, value: BigNumber): PayableOverrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied),
      value: value,
    };
  }

  /**
   * @returns GoFarm stats from Uniswap.
   * It may differ from the GFT price used on Treasury (which is calculated in TWAP)
   */
  async getGFTStatFromUniswap(): Promise<TokenStat> {
    const supply = await this.externalTokens['GFT'].displayedTotalSupply();
    return {
      priceInDAI: await this.getTokenPriceFromUniswap(this.externalTokens['GFT']),
      totalSupply: supply,
    };
  }

  async getShareStat(): Promise<TokenStat> {
    return {
      priceInDAI: await this.getTokenPriceFromUniswap(this.externalTokens['GFT']),
      totalSupply: await this.externalTokens['GFT'].displayedTotalSupply(),
    };
  }

  async getTokenPriceFromUniswap(tokenContract: ERC20): Promise<string> {
    await this.provider.ready;

    const { chainId } = this.config;
    const { USDT } = this.config.externalTokens;
    const usdt = new Token(chainId, USDT[0], 6);
    const token = new Token(chainId, tokenContract.address, 18);

    console.log(token)
    try {
      const usdtToToken = await Fetcher.fetchPairData(usdt, token, this.provider as unknown as BaseProvider);
      const priceInUSDT = new Route([usdtToToken], token);
      return priceInUSDT.midPrice.toSignificant(3);
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  async earnedFromFarm(pid: number, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts['MasterChef'];
    try {
      return await pool.pendingGFT(pid, account);
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnFarm(pid: number, account = this.myAccount): Promise<UserInfo> {
    const pool = this.contracts['MasterChef'];
    return await pool.userInfo(pid, account);
  }

  /**
   * Deposits token to given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async stake(pid: number, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts['MasterChef'];
    const gas = await pool.estimateGas.deposit(pid, amount);
    return await pool.deposit(pid, amount, this.gasOptions(gas));
  }
  async stakeV2(pid: number, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts['MasterChefV2'];
    const gas = await pool.estimateGas.deposit(pid, amount);
    return await pool.deposit(pid, amount, this.gasOptions(gas));
  }
  /**
   * Withdraws token from given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async unstake(pid: number, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts['MasterChef'];
    const gas = await pool.estimateGas.withdraw(pid, amount);
    return await pool.withdraw(pid, amount, this.gasOptions(gas));
  }
  async unstakeV2(pid: number, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts['MasterChefV2'];
    const gas = await pool.estimateGas.withdraw(pid, amount);
    return await pool.withdraw(pid, amount, this.gasOptions(gas));
  }

  /**
   * Transfers earned token reward from given pool to my account.
   */
  async harvest(pid: number): Promise<TransactionResponse> {
    const pool = this.contracts['MasterChef'];
    const gas = await pool.estimateGas.harvest(pid);
    return await pool.harvest(pid, this.gasOptions(gas));
  }
  async harvestV2(pid: number): Promise<TransactionResponse> {
    const pool = this.contracts['MasterChefV2'];
    const gas = await pool.estimateGas.harvest(pid);
    return await pool.harvest(pid, this.gasOptions(gas));
  }

  async getApy(): Promise<string> {
    const getApy = this.contracts['GetApy'];
    return await getApy.getAllApy();
  }


  async getAllPoolPrice(): Promise<string> {
    const getApy = this.contracts['GetApy'];
    return await getApy.getAllPoolPrice();
  }


  async getAllAlloc(): Promise<string> {
    const getApy = this.contracts['GetApy'];
    return await getApy.getAllAlloc();
  }

  async getTvl(): Promise<BigNumber> {
    const getApy = this.contracts['GetApy'];
    const getVaultApy = this.contracts['GetVaultApy'];
    const tvl = await getApy.getTvl();
    const vaultTvl = await getVaultApy.getTVL();
    return vaultTvl;
  }

  async getTvlV2(): Promise<BigNumber> {
    const getApy = this.contracts['GetApyV2'];
    return await getApy.getTvl();
  }

  async getStartTime(): Promise<StartTime> {
    const startTime = new Date(1615348800000);

    return { startTime };
  }

  /**
   * Harvests and withdraws deposited tokens from the pool.
   */
  async exit(pid: number): Promise<TransactionResponse> {
    const pool = this.contracts['MasterChef'];
    const gas = await pool.estimateGas.exit(pid);
    return await pool.exit(pid, this.gasOptions(gas));
  }

  async emergencyWithdraw(pid: number): Promise<TransactionResponse> {
    const pool = this.contracts['MasterChef'];
    const gas = await pool.estimateGas.emergencyWithdraw(pid);
    return await pool.emergencyWithdraw(pid, this.gasOptions(gas));
  }

  async exitV2(pid: number): Promise<TransactionResponse> {
    const pool = this.contracts['MasterChefV2'];
    const gas = await pool.estimateGas.exit(pid);
    return await pool.exit(pid, this.gasOptions(gas));
  }

  async getAllBalance(): Promise<string> {
    const getApy = this.contracts['GetApy'];
    return await getApy.getAllAlloc();
  }

  async getAllBalanceV2(): Promise<string> {
    const getApy = this.contracts['GetApyV2'];
    return await getApy.getAllAlloc();
  }

  async stakedBalanceOnVault(name: string, account = this.myAccount): Promise<BigNumber> {
    const vault = this.contracts[name];
    return await vault.balanceOf(account);
  }

  async tokenBalance(name: string, account = this.myAccount): Promise<BigNumber> {
    const token = this.externalTokens[name];
    return await token.balanceOf(account);
  }

  async vaultUnstake(name: string, amount: BigNumber): Promise<TransactionResponse> {
    const vault = this.contracts[name];
    const gas = await vault.estimateGas.withdraw(amount);
    return await vault.withdraw(amount, this.gasOptions(gas));
  }

  async vaultStake(name: string, amount: BigNumber): Promise<TransactionResponse> {
    const vault = this.contracts[name];
    if (name === 'HT') {
      const gas = await vault.estimateGas.deposit(amount, { value: amount });
      return await vault.deposit(amount, this.gasAndValueOptions(gas, amount));
    } else {
      const gas = await vault.estimateGas.deposit(amount);
      return await vault.deposit(amount, this.gasOptions(gas));
    }
  }

  async earnedFromVault(name: string, account = this.myAccount): Promise<BigNumber> {
    const vault = this.contracts[name];
    const getPricePerFullShare = await vault.getPricePerFullShare();
    const balance = await vault.balanceOf(account);
    return BigNumber.from(balance)
      .mul(getPricePerFullShare)
      .div(BigNumber.from('1000000000000000000'));
  }

  async vaultWithdrawAll(name: string): Promise<TransactionResponse> {
    const vault = this.contracts[name];
    const gas = await vault.estimateGas.withdrawAll();
    return await vault.withdrawAll(this.gasOptions(gas));
  }

  async getVaultApys(): Promise<string> {
    const getVaultApy = this.contracts['GetVaultApy'];
    const { vaults } = this.config;
    const _vaults = [];
    console.log(123, Object.entries(vaults));

    for (const [, address] of Object.entries(vaults)) {
      if (address !== this.externalTokens['sGFT'].address) {
        _vaults.push(address);
      }
    }
    return await getVaultApy.getApysOfWeek(_vaults);
  }

  async getVaultTVLs(): Promise<string> {
    const getVaultApy = this.contracts['GetVaultApy'];
    const { vaults } = this.config;
    const _vaults = [];
    for (const [, address] of Object.entries(vaults)) {
      if (address !== this.externalTokens['sGFT'].address) {
        _vaults.push(address);
      }
    }
    return await getVaultApy.getTVLs(_vaults);
  }

  async getVaultTVLPrice(): Promise<string> {
    const getVaultApy = this.contracts['GetVaultApy'];
    const { vaults } = this.config;
    const _vaults = [];
    for (const [, address] of Object.entries(vaults)) {
      if (address !== this.externalTokens['sGFT'].address) {
        _vaults.push(address);
      }
    }
    return await getVaultApy.getTVLPrice(_vaults);
  }
}
