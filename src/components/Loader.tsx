import React from "react";
import styled, { keyframes } from "styled-components";

const LoaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const scaleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

const Ball = styled.div<{ bkColor: string; delay: number }>`
  border-radius: 50%;
  background-color: ${(props) => props.bkColor};
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 1rem;

  animation: ${scaleAnimation} 0.7s ease infinite;
  animation-delay: ${(props) => props.delay.toString() + "s"};
  animation-fill-mode: backwards;
`;

const Loader: React.FC = () => {
  return (
    <LoaderBox>
      <Ball bkColor="#e15b64" delay={0} />
      <Ball bkColor="#f8b26a" delay={0.15} />
      <Ball bkColor="#abbd81" delay={0.3} />
      <Ball bkColor="#81a3bd" delay={0.45} />
    </LoaderBox>
  );
};

export default Loader;
