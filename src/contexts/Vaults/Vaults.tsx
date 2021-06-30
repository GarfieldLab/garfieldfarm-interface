import React, { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import Context from './context';
import useGoFarm from '../../hooks/useGoFarm';
import { Vault } from '../../go-farm';
import config, { vaultDefinitions } from '../../config';

const Vaults: React.FC = ({ children }) => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const goFarm = useGoFarm();

  const fetchPools = useCallback(async () => {
    const vaults: Vault[] = [];
    // const balance = await goFarm.getAllBalance();
    // const balance = await goFarm.getVaultTVLs();
    // console.log('price',price)

    const GFTapy = await goFarm.getGFTApy();
    const GFTprice = await goFarm.getGFTTVLPrice();
    const price = await goFarm.getVaultTVLPrice();
    const apys = await goFarm.getVaultApys();
    for (const vaultInfo of Object.values(vaultDefinitions)) {
      if (vaultInfo.finished) {
        if (!goFarm.isUnlocked) continue;
      }
      vaults.push({
        ...vaultInfo,
        address: config.MasterChef,
        depositToken: goFarm.externalTokens[vaultInfo.depositTokenName],
        earnToken: goFarm.externalTokens[vaultInfo.depositTokenName],
        apy: vaultInfo.id < 5 ? BigNumber.from(apys[vaultInfo.id]) : BigNumber.from(GFTapy).mul(100).mul(365),
        balance: vaultInfo.id < 5 ? BigNumber.from(price[vaultInfo.id]) : BigNumber.from(GFTprice),
        // apy:BigNumber.from(0),
        // balance: BigNumber.from(0),
      });
    }
    console.log(vaults);
    vaults.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setVaults(vaults);
  }, [goFarm, setVaults]);

  useEffect(() => {
    if (goFarm) {
      fetchPools().catch((err) => console.log(`Failed to fetch Vaults: ${err.stack}`));
    }
  }, [goFarm, fetchPools]);

  return <Context.Provider value={{ vaults }}>{children}</Context.Provider>;
};

export default Vaults;
