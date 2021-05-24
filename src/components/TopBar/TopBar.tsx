import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'
import TxButton from './components/TxButton'
import sidebarbg from '../../assets/img/sidebar.jpg';
const TopBar: React.FC = () => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
        <Sidebar>
          <StyledTopLogo>
            <Logo />
          </StyledTopLogo>
          <Nav />
          </Sidebar>
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <TxButton />
            <AccountButton />
          </div>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}
const Sidebar = styled.div`
      @media (min-width:768px){
        position: fixed;
        left: 0;
        top: 0;
        width: 240px;
        background: url(${sidebarbg}) #d4c4a4 no-repeat;
        height: 100%;
        z-index: 99;
      }

`
const StyledTopBar = styled.div`
    position: fixed;
    width: 100%;
    z-index: 9999;
    `

    const StyledTopLogo = styled.div`
    // flex:1;
    // @media (max-width: 835px) {
    //   flex:0;
    // }
        `

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${props => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
  flex-wrap: wrap;
`

export default TopBar