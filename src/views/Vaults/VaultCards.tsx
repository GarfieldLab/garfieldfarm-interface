import React from 'react';
import styled from 'styled-components';

import { Vault } from '../../go-farm';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import useVaults from '../../hooks/useVaults';
import TokenSymbol from '../../components/TokenSymbol';
import Notice from '../../components/Notice';
import { getDisplayBalance,getDisplayApy,getDisplayApy2 } from '../../utils/formatBalance';

const VaultCards: React.FC = () => {
  const [vaults] = useVaults();

  const activeVaults = vaults.filter((vault) => !vault.finished);
  const inactiveVaults = vaults.filter((vault) => vault.finished);


  let finishedFirstRow = false;
  const inactiveRows = inactiveVaults.reduce<Vault[][]>(
    (vaultRows, vault) => {
      const newVaultRows = [...vaultRows];
      if (newVaultRows[newVaultRows.length - 1].length === (finishedFirstRow ? 2 : 2)) {
        newVaultRows.push([vault]);
        finishedFirstRow = true;
      } else {
        newVaultRows[newVaultRows.length - 1].push(vault);
      }
      return newVaultRows;
    },
    [[]],
  );

  return (
    <StyledCards>
      {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have vaults where the mining has finished.</b>
            <br />
            Please withdraw and settle your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )}
      <StyledRow>
        {activeVaults.map((vault, i) => (
          <React.Fragment key={vault.name}>
            <VaultCard vault={vault} />
            {i % 4 !== 3 && <StyledSpacer />}
          </React.Fragment>
        ))}
      </StyledRow>
      {inactiveRows[0].length > 0 && (
        <>
          <StyledInactiveVaultTitle>Inactive Vaults</StyledInactiveVaultTitle>
          {inactiveRows.map((vaultRow, i) => (
            <StyledRow key={i}>
              {vaultRow.map((vault, j) => (
                <React.Fragment key={j}>
                  <VaultCard vault={vault} />
                  {j < vaultRow.length - 1 && <StyledSpacer />}
                </React.Fragment>
              ))}
            </StyledRow>
          ))}
        </>
      )}
    </StyledCards>
  );
};

interface VaultCardProps {
  vault: Vault;
}

const VaultCard: React.FC<VaultCardProps> = ({ vault }) => {
  return (
    <StyledCardWrapper>
      { vault.depositTokenName.includes('GFT') ? (
          <StyledCardSuperAccent />
        ) : (
            <StyledCardNomal />
          )}
      <Card>
        <CardContent>
          <StyledContent>
            <LogoCard>
              <CardIcon>
                <TokenSymbol symbol={vault.depositTokenName} size={54} />
              </CardIcon>
            </LogoCard>
            <StyledTitle>{vault.name}</StyledTitle>
            <StyledDetails>
              {/* <StyledDetail>存入 {vault.depositTokenName.toUpperCase()}</StyledDetail>
              <StyledDetail>赚取 {`${vault.depositTokenName}`}</StyledDetail> */}
              {/* <StyledDetail>1日年化 {vault.depositTokenName.includes('GFT') ? getDisplayBalance(vault.apy,18,2) : getDisplayApy(vault.apy)}%</StyledDetail> */}
              {/* {vault.depositTokenName.includes('GFT') ? (<StyledDetail></StyledDetail>) : (
                <StyledDetail>复利APY {getDisplayApy2(vault.apy)}%</StyledDetail>
              )} */}
              {/* <StyledDetail>存款额 ${getDisplayBalance(vault.balance,vault.depositToken.decimal,0)}</StyledDetail> */}
            </StyledDetails>
            <Button text="加入" to={`/vault/${vault.depositTokenName}`} />
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  );
};

const LogoCard = styled.div`
  display: flex;
`;
const StyledCardNomal = styled.div`
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`;

// const StyledCardAccent = styled.div`
//   background: linear-gradient(
//     45deg,
//     rgba(255, 0, 0, 1) 0%,
//     rgba(255, 154, 0, 1) 10%,
//     rgba(208, 222, 33, 1) 20%,
//     rgba(79, 220, 74, 1) 30%,
//     rgba(63, 218, 216, 1) 40%,
//     rgba(47, 201, 226, 1) 50%,
//     rgba(28, 127, 238, 1) 60%,
//     rgba(95, 21, 242, 1) 70%,
//     rgba(186, 12, 248, 1) 80%,
//     rgba(251, 7, 217, 1) 90%,
//     rgba(255, 0, 0, 1) 100%
//   );
//   border-radius: 12px;
//   filter: blur(4px);
//   position: absolute;
//   top: -2px;
//   right: -2px;
//   bottom: -2px;
//   left: -2px;
//   z-index: -1;
// `;

const StyledCardSuperAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  border-radius: 12px;
  filter: blur(8px);
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  z-index: -1;
`; // eslint-disable-line no-unused-vars

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// const StyledLoadingWrapper = styled.div`
//   align-items: center;
//   display: flex;
//   flex: 1;
//   justify-content: center;
// `;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 5);
  position: relative;
  margin-bottom: 20px;
`;

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
  min-height: 133px;
`;

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledInactiveNoticeContainer = styled.div`
  width: 598px;
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
`;

const StyledInactiveVaultTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

export default VaultCards;
