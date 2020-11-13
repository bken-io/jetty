import React from "react";
import Home from "./components/Home";
import styled from "styled-components";
import Settings from "./components/Settings";
import TitleBar from "./components/TitleBar";
import Sidebar from "./components/Sidebar";

import { Route } from "react-router-dom";

const Content = styled.div`
  overflow: auto;
  width: calc(100vw - 60px);
  height: calc(1000vh - 30px);
`;

function App() {
  return (
    <div>
      <TitleBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Content>
          <Route exact path="/" component={Home} />
          <Route exact path="/settings" component={Settings} />
        </Content>
      </div>
    </div>
  );
}

export default App;
