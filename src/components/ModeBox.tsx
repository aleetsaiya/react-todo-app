import React, { memo } from "react";
import { ShowingMode } from "../types/Item";
import styled from "styled-components";

const ModeBoxStyle = styled.div`
  width: 18rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  background-color: ${(props) => props.theme.itemBkColor};

  @media (max-width: 768px) {
    position: absolute;
    bottom: -5.5rem;
    left: 0rem;
    width: 100%;
    border-radius: 5px;
    min-height: 4rem;
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

type ModeBoxProps = {
  showingMode: ShowingMode;
  onShowingModeChange: (mode: ShowingMode) => void;
};

const modes: Readonly<ShowingMode[]> = ["All", "Active", "Completed"] as const;
const ModeBox: React.FC<ModeBoxProps> = ({
  showingMode,
  onShowingModeChange,
}) => {
  return (
    <ModeBoxStyle>
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

export default memo(ModeBox);
