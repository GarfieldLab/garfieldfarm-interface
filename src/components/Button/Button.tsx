import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Link } from 'react-router-dom';

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  to?: string;
  variant?: 'default' | 'secondary' | 'tertiary';
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
  width,
}) => {
  const { color, spacing } = useContext(ThemeContext);

  let buttonColor: string;
  switch (variant) {
    case 'secondary':
      buttonColor = color.teal[200];
      break;
    case 'default':
    default:
      buttonColor = color.primary.main;
  }

  let boxShadow: string;
  let buttonSize: number;
  let buttonPadding: number;
  let fontSize: number;
  switch (size) {
    case 'sm':
      buttonPadding = spacing[3];
      buttonSize = 36;
      fontSize = 14;
      break;
    case 'lg':
      buttonPadding = spacing[4];
      buttonSize = 72;
      fontSize = 16;
      break;
    case 'md':
    default:
      buttonPadding = spacing[4];
      buttonSize = 56;
      fontSize = 16;
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>;
    } else if (href) {
      return (
        <StyledExternalLink href={href} target="__blank">
          {text}
        </StyledExternalLink>
      );
    } else {
      return text;
    }
  }, [href, text, to]);

  return (
    <StyledButton
      boxShadow={boxShadow}
      color={buttonColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
      width={width}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  );
};

interface StyledButtonProps {
  boxShadow: string;
  color: string;
  disabled?: boolean;
  fontSize: number;
  padding: number;
  size: number;
  width?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background:#ebe0da;
  border:1px solid #372007;
  border-radius: 5px;
  box-shadow:3px 3px 0 #372007;
  color: #372007;
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.fontSize}px;
  font-weight: 700;
  height: ${(props) => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.padding}px;
  padding-right: ${(props) => props.padding}px;
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  width: ${(props) => (!props.width ? '100%' : props.width)};
`;

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

export default Button;
