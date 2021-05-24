import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => (
  <StyledCard>
    {children}
  </StyledCard>
)

const StyledCard = styled.div`
margin-top:10px;
  background-color: #372007;
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card