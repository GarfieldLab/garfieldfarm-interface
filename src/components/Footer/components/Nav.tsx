import React from 'react'
import styled from 'styled-components'
import  Configuration  from '../../../config';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href= {buyGFT} target="_blank">获取GFT</StyledLink>
      <StyledLink href="#" target="_blank">GitHub</StyledLink>
      <StyledLink href="#" target="_blank">Twitter</StyledLink>
      <StyledLink href="#" target="_blank">Telegram</StyledLink>
      <StyledLink href="#" target="_blank">Discord</StyledLink>
      <StyledLink href="#" target="_blank">Medium</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: 835px) {
    margin-bottom:20px;
  }
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[200]};
  padding-left: 2px;
  padding-right: 2px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[0]};
  }
`

const buyGFT ="https://garfield.finance/#/swap?inputCurrency="+Configuration.externalTokens['USDT'][0]+"&outputCurrency="+Configuration.externalTokens['GFT'][0];
export default Nav