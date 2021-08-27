import React from "react";

import "./profile.css";

export default function Profile(props) {
  return (
    <div className="member-profile">
      <span>{props.name}</span>
    </div>
  );
}
