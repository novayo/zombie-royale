import styled, { keyframes } from 'styled-components'


const animation = (left) => keyframes`
  0%   {left: ${left}px;}
  25%  {left: ${left + 50}px;}
  50%  {left: ${left + 100}px;}
  75%  {left: ${left + 50}px;}
  100% {left: ${left}px;}
`;

// 0%   {transform: rotate(0deg);}
// 100% {transform: rotate(360deg);}

export default styled.svg`
  width = ${props => props.width};
  height = ${props => props.height};
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  position: absolute;
  animation: ${props => animation(props.left)} 2s linear infinite;

`
