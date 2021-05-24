import React, { useCallback, useMemo, useState } from 'react'

import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'

import { getFullDisplayBalance } from '../../../utils/formatBalance'
import { BigNumber } from 'ethers';

interface WithdrawModalProps extends ModalProps {
  max: BigNumber,
  onConfirm: (amount: string) => void,
  tokenName?: string,
  decimals?: number,
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '', decimals = 18 }) => {
  const [val, setVal] = useState('')

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, decimals)
  }, [max,decimals])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal>
      <ModalTitle text={`提款 g${tokenName}`} />
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={`g${tokenName}`}
      />
      <ModalActions>
        <Button text="取消" variant="secondary" onClick={onDismiss} />
        <Button text="确认" onClick={() => onConfirm(val)} />
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal