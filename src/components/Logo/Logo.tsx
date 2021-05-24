import React from 'react';
import styled from 'styled-components';

import farmer from '../../assets/img/farmer.png';

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <StyledLink href="/">
      <img src={farmer}  alt=""/>
      </StyledLink>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[100]};
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  @media (min-width: 768px) {
    img {
      width:198px;
    }
    margin:20px 0 44px 20px;
    height:48px;
  }
  @media (max-width: 768px) {
    img {
      width:120px;
    }
    height:32px;
  }
`;

export default Logo;
