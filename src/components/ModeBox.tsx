import React from "react";
import { ShowingMode } from "../types/item";
import styled from "styled-components";

type ModeBoxProps = {
  showOnMobile?: boolean;
  showingMode: ShowingMode;
  onShowingModeChange: (mode: ShowingMode) => void;
};

const ModeBoxStyle = styled.div<{ showOnMobile: boolean }>`
  width: 18rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;

  @media (min-width: 769px) {
    display: ${(props) => (props.showOnMobile ? "none" : "flex")};
  }

  @media (max-width: 768px) {
    display: ${(props) => (props.showOnMobile ? "flex" : "none")};
  }
`;

const ModeBtn = styled.button<{
  active: boolean;
}>`
  color: ${(props) =>
    props.active ? "hsl(220, 98%, 61%)" : props.theme.secondColor};
  cursor: pointer;
  transition: all ease 0.2s;
  font-weight: bold;

  &:hover {
    color: ${(props) => !props.active && props.theme.color};
  }
`;

const isActive = (current: ShowingMode, target: ShowingMode) =>
  current === target;
const modes: Readonly<ShowingMode[]> = ["All", "Active", "Completed"] as const;

const ModeBox: React.FC<ModeBoxProps> = ({
  showOnMobile = false,
  showingMode,
  onShowingModeChange,
}) => {
  return (
    <ModeBoxStyle showOnMobile={showOnMobile}>
      {modes.map((mode: ShowingMode) => (
        <ModeBtn
          key={mode}
          active={isActive(showingMode, mode)}
          onClick={() => onShowingModeChange(mode)}
        >
          {mode}
        </ModeBtn>
      ))}
    </ModeBoxStyle>
  );
};

export default ModeBox;
