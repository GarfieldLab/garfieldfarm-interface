import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">首页</StyledLink>
      <StyledLink exact activeClassName="active" to="/farm">挖矿</StyledLink>
      <StyledLink exact activeClassName="active" to="/vault">机枪池</StyledLink>
      <StyledLink2 href="https://heco.vote/#/gocash.heco" target="_blank">治理</StyledLink2>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
@media (max-width:768px){
  align-items: center;
  display: flex;
  @media (max-width: 835px) {
    font-size: 23px;
    margin-top:10px;
  }

}
`

const StyledLink = styled(NavLink)`
@media (min-width:768px){
  height: 40px;
  width: 200px;
  border-radius: 3px;
  outline: none;
  text-align: center;
  margin: 0 0 15px 20px;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: #372007;
  font-size: 20px;
  line-height: 40px;
  background: #ebe0da;
  border: 1px solid #a08357;
  display: inline-block;
}
@media (max-width:768px){
  color:#372007;
  background:#ebe0da;
  border:1px solid #372007;
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  margin:0 2px;
  border-radius:5px;
  box-shadow:3px 3px 0 #372007;
  font-size:12px;
  }
`
const StyledLink2 = styled.a`
@media (min-width:768px){
  height: 40px;
  width: 200px;
  border-radius: 3px;
  outline: none;
  text-align: center;
  margin: 0 0 15px 20px;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: #372007;
  font-size: 20px;
  line-height: 40px;
  background: #ebe0da;
  border: 1px solid #a08357;
  display: inline-block;
}
@media (max-width:768px){
  color:#372007;
  background:#ebe0da;
  border:1px solid #372007;
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  margin:0 2px;
  border-radius:5px;
  box-shadow:3px 3px 0 #372007;
  font-size:12px;
  }
display:inline-block;
`

export default Nav