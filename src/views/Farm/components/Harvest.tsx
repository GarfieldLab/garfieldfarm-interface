import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import useEarnings from '../../../hooks/useEarnings';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useHarvest from '../../../hooks/useHarvest';

import TokenSymbol from '../../../components/TokenSymbol';
import { Farm } from '../../../go-farm';

interface HarvestProps {
  farm: Farm;
}

const Harvest: React.FC<HarvestProps> = ({ farm }) => {
  const earnings = useEarnings(farm.pid);
  const { onReward } = useHarvest(farm);
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={farm.earnToken.symbol} />
            </CardIcon>
            <Value value={getDisplayBalance(earnings)} />

            <Label text={`赚到的${farm.earnTokenName}`} />
          </StyledCardHeader>
          <StyledCardActions>
            <Button onClick={onReward} disabled={earnings.eq(0)} text="收获"  />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;
const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
