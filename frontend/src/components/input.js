import React, { useState } from "react";

import "./input.css";

export default function Input(props) {
  return (
    <div className="input-component">
      <label>{props.label}</label>
      <br />
      <input
        onChange={(event) => {
          props.onChange(props.label, event.target.value);
        }}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
}
