import React from "react";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from "@material-ui/icons/Remove";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

const { ipcRenderer, shell } = window.require("electron");

const TitleBar = styled.div`
  display: flex;
  height: 30px;
  padding: 1px;
  width: 100vw;
  background: #192228;
  -webkit-app-region: drag;
  -webkit-user-select: none;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  min-width: 120px;
  display: flex;
  -webkit-app-region: no-drag;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffcc00;
  }
`;

const JettyText = styled.div`
  width: 60px;
  height: 30px;
  display: flex;
  color: #3f5564;
  font-size: 13px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  -webkit-app-region: no-drag;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

function titleBarAction(action) {
  console.log("action");
  ipcRenderer.send("titleBarAction", action);
}

export default function () {
  return (
    <TitleBar>
      <JettyText
        onClick={() => {
          shell.openExternal("https://github.com/bken-io/jetty");
        }}
      >
        Jetty
      </JettyText>
      <IconWrapper>
        <IconContainer onClick={() => titleBarAction("minimize")}>
          <RemoveIcon style={{ height: "18px" }} />
        </IconContainer>
        <IconContainer onClick={() => titleBarAction("maximize")}>
          <FullscreenIcon style={{ height: "18px" }} />
        </IconContainer>
        <IconContainer onClick={() => titleBarAction("close")}>
          <CloseIcon style={{ height: "18px" }} />
        </IconContainer>
      </IconWrapper>
    </TitleBar>
  );
}
