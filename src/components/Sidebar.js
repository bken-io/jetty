import React, { useEffect, useState } from "react";

import styled from "styled-components";
import FlightIcon from "@material-ui/icons/Flight";
import SettingsIcon from "@material-ui/icons/Settings";

import { Link } from "react-router-dom";
const { ipcRenderer, shell } = window.require("electron");

const SidebarContainer = styled.div`
  width: 60px;
  display: flex;
  background: #ffcc00;
  flex-direction: column;
  height: calc(100vh - 30px);
  justify-content: space-between;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
`;

const SidebarItem = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const VersionText = styled.div`
  font-size: 0.6em;
  font-weight: 700;
  color: #212c34;
  text-transform: uppercase;
`;

function Navigation() {
  const [version, setVersion] = useState();

  useEffect(() => {
    ipcRenderer.send("app_version");
    ipcRenderer.on("app_version", (event, arg) => {
      ipcRenderer.removeAllListeners("app_version");
      setVersion(arg.version);
    });
  }, []);

  return (
    <SidebarContainer>
      <SidebarContent>
        <SidebarItem>
          <Link to="/">
            <FlightIcon style={{ fontSize: "2.5em", color: "#212c34" }} />
          </Link>
        </SidebarItem>
        <SidebarItem>
          <Link to="/settings">
            <SettingsIcon style={{ fontSize: "2.5em", color: "#212c34" }} />
          </Link>
        </SidebarItem>
      </SidebarContent>
      <SidebarContent>
        <SidebarItem>
          <VersionText
            onClick={() => {
              shell.openExternal("https://github.com/bken-io/jetty/releases");
            }}
          >
            {version}
          </VersionText>
        </SidebarItem>
      </SidebarContent>
    </SidebarContainer>
  );
}

export default Navigation;
