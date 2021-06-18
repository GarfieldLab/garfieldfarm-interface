import { ChainId } from 'garfieldswap-sdk';
import { Configuration } from './go-farm/config';
import { FarmInfo, VaultInfo } from './go-farm';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 256,
    etherscanUrl: 'https://testnet.hecoinfo.com',
    defaultProvider: 'https://http-testnet.hecochain.com',
    MasterChef: '0xcD91fA66A5df5EC17ba1151863fd91411A5F367C',
    GetApy: '0xA7B4Cd0bCFF7Fa4E716167Af3b5ccaAD4b8CCD41',
    GetVaultApy: '0x528CE8B73df1395f03106e2217d53cc6f6aB8914',
    deployments: require('./go-farm/deployments/deployments.testnet.json'),
    externalTokens: {
      GFT: ['0xe2d5FA8568f165B340401EA1FFEb030CABbABAe8', 18],
      USDT: ['0x04F535663110A392A6504839BEeD34E019FdB4E0', 6],
      HUSD: ['0x8Dd66eefEF4B503EB556b1f50880Cc04416B916B', 8],
      HT: ['0x7af326b6351c8a9b8fb8cd205cbe11d4ac5fa836', 18],
      DOT: ['0xAbE5acA6C8996482b6a7CD3f63A02FaBCc20BAE7', 18],
      ETH: ['0xfeB76Ae65c11B363Bd452afb4A7eC59925848656',18],
      'GFT_HT-LP': ['0x19e549337034dcE4B070E68A69369a634B438215', 18],
      'GFT_USDT-LP': ['0xb6f2F3Af7c6F2c58E4fDBFedDE323339cD669B7D', 18],
      gUSDT: ['0xFDc291B37d6d6C6b7a1d956Dc7E6eb9f14eC07c2', 6],
      gHUSD: ['0xd3361CaD48bABdC88Db9715bac492bd6A7117ad5', 8],
      gHT: ['0x07544cd4902142e62c740E4af98C17Db434109E4', 18],
      gDOT: ['0xEFf90Ee417Ce874710C979CfaE8f82AB2868b49c', 18],
      gETH:['0xe3Ad4c6879b62f5d73CC720Ae0Eb8A947303d7ad',18]
    },
    vaults: {
      USDT: '0xFDc291B37d6d6C6b7a1d956Dc7E6eb9f14eC07c2',
      HUSD: '0xd3361CaD48bABdC88Db9715bac492bd6A7117ad5',
      HT: '0x07544cd4902142e62c740E4af98C17Db434109E4',
      DOT: '0xEFf90Ee417Ce874710C979CfaE8f82AB2868b49c',
      ETH:'0xe3Ad4c6879b62f5d73CC720Ae0Eb8A947303d7ad'
    },
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.HECO,
    etherscanUrl: 'https://hecoinfo.com',
    defaultProvider: 'https://http-mainnet.huobichain.com',
    MasterChef: '0x439B911d6423255A515d9762e966985D206CC177',
    GetApy: '0xE453Fd8FF38b46fBda57f236103f6336CBf50594',
    GetVaultApy: '0xaE3a4402B987Ad29D5e7F17Bbb4fD22a713f7DaE',
    deployments: require('./go-farm/deployments/deployments.mainnet.json'),
    externalTokens: {
      GFT: ['0x9B8a30A2b4Fb3Fc90fDc489bBc47E997b0e46CE5', 18],
      USDT: ['0xa71EdC38d189767582C38A3145b5873052c3e47a', 18],
      HUSD: ['0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047', 8],
      HT: ['0x7af326b6351c8a9b8fb8cd205cbe11d4ac5fa836', 18],
      DOT: ['0xA2c49cEe16a5E5bDEFDe931107dc1fae9f7773E3', 18],
      MDX: ['0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c', 18],
      'GFT_HT-LP': ['0x76603b33B9B1Ff7ea6F6C5DCD6d0F860dCA8d927', 18],
      'GFT_USDT-LP': ['0xCa10c46557671ba68Cefc8AD4Dc5456BDc9a5D06', 18],
      gUSDT: ['0xb95b9Fa817471BbC100F62d36187BC95C3F0c09B', 18],
      gMDX: ['0xCD0e39551Aba76A14fdac3c312192DFd141a3815', 18],
      gDOT: ['0x2f7624b3fc0564C357F6AaCa9b5A0A5F3027827A', 18],
      gHUSD: ['0x94832D6B65327c3bA11b005B98998F238091555D', 8],
      gHT: ['0xF56728794DaD2D02595876E0582185aF8f994Bcb', 18],
    },
    vaults: {
      GFT: '0x324e22a6D46D514dDEcC0D98648191825BEfFaE3',
      HUSD: '0x94832D6B65327c3bA11b005B98998F238091555D',
      HT: '0xF56728794DaD2D02595876E0582185aF8f994Bcb',
      USDT: '0xb95b9Fa817471BbC100F62d36187BC95C3F0c09B',
      DOT: '0x2f7624b3fc0564C357F6AaCa9b5A0A5F3027827A',
      MDX: '0xCD0e39551Aba76A14fdac3c312192DFd141a3815',
    },
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: FarmInfo } = {
  pool_0: {
    name: 'GFT-HT LP Token',
    depositTokenName: 'GFT_HT-LP',
    earnTokenName: 'GFT',
    TokenA: 'GFT',
    TokenB: 'HT',
    finished: false,
    sort: 1,
    pid: 0,
  },
  pool_1: {
    name: 'GFT-USDT LP Token',
    depositTokenName: 'GFT_USDT-LP',
    TokenA: 'GFT',
    TokenB: 'USDT',
    earnTokenName: 'GFT',
    finished: false,
    sort: 2,
    pid: 1,
  },
  // pool_2: {
  //   name: 'USDT',
  //   depositTokenName: 'USDT',
  //   earnTokenName: 'GFT',
  //   TokenA: 'USDT',
  //   TokenB: '',
  //   finished: false,
  //   sort: 3,
  //   pid: 2,
  // },
  // pool_3: {
  //   name: 'HUSD',
  //   depositTokenName: 'HUSD',
  //   earnTokenName: 'GFT',
  //   TokenA: 'HUSD',
  //   TokenB: '',
  //   finished: false,
  //   sort: 4,
  //   pid: 3,
  // },
  // pool_4: {
  //   name: 'HT',
  //   depositTokenName: 'HT',
  //   earnTokenName: 'GFT',
  //   TokenA: 'HT',
  //   TokenB: '',
  //   finished: false,
  //   sort: 5,
  //   pid: 4,
  // },
  // pool_5: {
  //   name: 'DOT',
  //   depositTokenName: 'DOT',
  //   earnTokenName: 'GFT',
  //   TokenA: 'DOT',
  //   TokenB: '',
  //   finished: false,
  //   sort: 6,
  //   pid: 5,
  // },
  // pool_6: {
  //   name: 'ETH',
  //   depositTokenName: 'ETH',
  //   earnTokenName: 'GFT',
  //   TokenA: 'ETH',
  //   TokenB: '',
  //   finished: false,
  //   sort: 7,
  //   pid: 6,
  // }
};
export const vaultDefinitions: { [contractName: string]: VaultInfo } = {
  pool_00: {
    name: 'GFT',
    depositTokenName: 'GFT',
    finished: false,
    sort: 0,
    id: 15,
  },
  pool_0: {
    name: 'USDT',
    depositTokenName: 'USDT',
    finished: false,
    sort: 1,
    id: 0,
  },
  pool_1: {
    name: 'MDX',
    depositTokenName: 'MDX',
    finished: false,
    sort: 2,
    id: 1,
  },
  pool_2: {
    name: 'DOT',
    depositTokenName: 'DOT',
    finished: false,
    sort: 3,
    id: 2,
  },
  pool_3: {
    name: 'HUSD',
    depositTokenName: 'HUSD',
    finished: false,
    sort: 4,
    id: 3,
  },
  pool_4: {
    name: 'HT',
    depositTokenName: 'HT',
    finished: false,
    sort: 5,
    id: 4,
  },
};
// export default configurations[process.env.NODE_ENV || "development"];
export default configurations['production'];
// export default configurations["development"];
