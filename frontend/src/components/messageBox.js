import React, { useContext } from "react";

import { AuthContext } from "./context/auth-context";

import "./messageBox.css";

export default function MessageBox(props) {
  let userClass;
  const context = useContext(AuthContext);

  if (props.message.creator.id === context.userId) userClass = "align-right";

  return (
    <div className={`message-container ${userClass}`}>
      <div className="name-container">
        <span style={{ marginLeft: "10px" }}>{props.message.creator.name}</span>
      </div>

      <div className="content-container">
        <span>{props.message.content}</span>
      </div>
    </div>
  );
}
