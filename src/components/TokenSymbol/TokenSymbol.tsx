import React from 'react';

import gftLogo from '../../assets/img/cat.png';
import USDTLogo from '../../assets/img/USDT.png';
import HUSDLogo from '../../assets/img/HUSD.png';
import BTCLogo from '../../assets/img/BTC.png';
import ETHLogo from '../../assets/img/ETH.png';
import HTLogo from '../../assets/img/HT.png';
import DOTLogo from '../../assets/img/DOT.png';
import BCHLogo from '../../assets/img/BCH.png';
import HPTLogo from '../../assets/img/HPT.png';
import LTCLogo from '../../assets/img/LTC.png';
import MDXLogo from '../../assets/img/MDX.png';
import BETHLogo from '../../assets/img/BETH.svg';
import FILLogo from '../../assets/img/FIL.png';
import UNILogo from '../../assets/img/UNI.svg';
import YFILogo from '../../assets/img/YFI.svg';
import LINKLogo from '../../assets/img/LINK.svg';
import VaultLogo from '../../assets/img/Vault.png';

const logosBySymbol: {[title: string]: string} = {
  'GFT': gftLogo,
  'USDT': USDTLogo,
  'HUSD': HUSDLogo,
  'BTC': BTCLogo,
  'ETH': ETHLogo,
  'HT': HTLogo,
  'DOT': DOTLogo,
  'BCH': BCHLogo,
  'HPT': HPTLogo,
  'LTC': LTCLogo,
  'MDX': MDXLogo,
  'BETH': BETHLogo,
  'FIL': FILLogo,
  'YFI': YFILogo,
  'UNI': UNILogo,
  'LINK': LINKLogo,
  'VAULT': VaultLogo
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
}

const TokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Logo symbol: ${symbol}`);
  }
  return (
    <img
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={size}
      height={size}
    />
  )
};

export default TokenSymbol;
