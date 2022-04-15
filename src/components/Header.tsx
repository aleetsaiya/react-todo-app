import React, { memo } from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: #fff;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`;

const WeatherIcon = styled.div`
  background: url(${(props) => props.theme.weatherIcon}) no-repeat;
  background-size: cover;
  width: 2.2rem;
  height: 2.2rem;
`;

type HeaderProps = {
  title: string;
  toggleTheme: () => void;
};

const Header: React.FC<HeaderProps> = ({ title, toggleTheme }) => {
  return (
    <Row>
      <Title>{title}</Title>
      <button onClick={toggleTheme}>
        <WeatherIcon />
      </button>
    </Row>
  );
};

export default memo(Header);
