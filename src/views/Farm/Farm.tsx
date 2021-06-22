import React from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useFarm from '../../hooks/useFarm';
import useRedeem from '../../hooks/useRedeem';
import { Farm as FarmEntity } from '../../go-farm';

const Farm: React.FC = () => {
  // useEffect(() => window.scrollTo(0, 0));

  const { farmId } = useParams();
  const farm = useFarm(farmId);
  const { account } = useWallet();
  const { onRedeem } = useRedeem(farm);

  return account && farm ? (
    <>
      <PageHeader
        // icon={<img src={require("../../assets/img/farm.png")} width="80%" height="90%" alt="farms" style={{position: "absolute",top: "5%",left:"10%"}}/>}
        subtitle={`存入 ${farm?.depositTokenName} 赚取 ${farm?.earnTokenName}`}
        title={farm?.name}
      />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest farm={farm} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake farm={farm} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
         <LPTokenHelpText farm={farm} />
        <Spacer size="lg" />
        <div>
          <Button onClick={onRedeem} text="取出本金" />
        </div>
        <Spacer size="lg" />
      </StyledBank>
    </>
  ) : !farm ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ farm: FarmEntity }> = ({ farm }) => {
  return (
    <StyledLink href={
      farm.TokenB === 'HT' 
        ? `https://garfield.finance/#/add/CURRENCY/${farm.TokenA_Address}` 
        : `https://garfield.finance/#/add/${farm.TokenA_Address}/${farm.TokenB_Address}`} 
        target="_blank">
       <StyledIcon>{<img src={require("../../assets/img/HT.png")} width="80%" height="80%"  style={{position:"relative",top:"-5px"}}/>}</StyledIcon>
       <div style={{width:'40%',margin:'0 auto'}}>{`为了挖矿的整体平稳，收益将会采取阶段锁仓制，72小时内提取收益将会锁定75%，5日内提取收益锁定50%，7日内提取收益锁定15%。挖矿超过七天，收益可以全部提取。锁定的部分需要再次质押挖矿才可解锁，并且再次质押的金额需要超过锁定时挖矿的金额的最大值。`}
      {`  在Garfield为 ${farm.TokenA}/${farm.TokenB} 交易对提供流动性  `}</div>
      <StyledIcon>{<img src={require("../../assets/img/HT.png")} width="80%" height="80%"  style={{position:"relative",top:"-5px"}}/>}</StyledIcon>
    </StyledLink>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader
        icon="🏚"
        title="没有赛道"
        subtitle="目前所有的赛道禁行"
      />
    </Center>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="解锁钱包" />
    </Center>
  );
};
const StyledIcon = styled.div`
  font-size: 28px;
  width:24px;
  height:24px;
  padding-left:10px;
  padding-right:5px;
`;
const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// const StyledUniswapLPGuide = styled.div`
//   margin: -24px auto 48px;
// `;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  display: inherit;
  text-shadow: 2px 2px 2px #000000;
  color: ${(props) => props.theme.color.grey[200]};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Farm;
