import React from 'react'
import styled from 'styled-components'

interface PageHeaderProps {
  icon?: React.ReactNode,
  subtitle?: string,
  title?: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <StyledPageHeader>
      <StyledIcon>{icon}</StyledIcon>
      <StyledTitle>{title}</StyledTitle>
    </StyledPageHeader>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  width: 100%;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 96px;
  height: 180px;
  line-height: 96px;
  position: relative;
  text-align: center;
  width: 280px;
`

const StyledTitle = styled.h1`
  color: ${props => props.theme.color.grey[100]};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-shadow: 3px 3px 3px #000000;
`

const StyledSubtitle = styled.h1`
  color: ${props => props.theme.color.grey[100]};
  font-size: 22px;
  font-weight: 400;
  line-height:30px;
  margin: 0;
  padding: 0;
  text-shadow: 3px 3px 3px #000000;
  text-align: center;
  @media (max-width: 835px) {
    font-size: 25px;
  }
`

export default PageHeader