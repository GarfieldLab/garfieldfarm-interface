import { useCallback } from 'react';
import useGoFarm from './useGoFarm';
import { Vault } from '../go-farm';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (vault: Vault) => {
  const goFarm = useGoFarm();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(
      goFarm.vaultWithdrawAll(vault.depositTokenName),
      `赎回 ${vault.depositTokenName}`,
    );
  }, [vault, goFarm, handleTransactionReceipt]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
