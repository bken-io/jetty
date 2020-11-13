import React, { useState, useEffect } from "react";
const { ipcRenderer } = window.require("electron");

function FolderChooser() {
  const [folder, setFolder] = useState();

  useEffect(() => {
    ipcRenderer.send("loadFolder");

    ipcRenderer.on("loadFolder", (event, arg) => {
      setFolder(arg);
    });
  }, []);

  ipcRenderer.on("selectFolder", (event, arg) => {
    setFolder(arg);
  });

  const selectFolder = () => {
    ipcRenderer.send("selectFolder");
  };

  return (
    <div style={{ padding: "10px" }}>
      <h4>Please select your community folder</h4>
      <code>{folder}</code>
      <br />
      <button onClick={selectFolder}>select</button>
    </div>
  );
}

export default FolderChooser;
