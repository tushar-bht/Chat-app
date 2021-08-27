import React, { useState } from "react";

import Drawer from "../components/drawer";
import { FaChevronCircleDown } from "react-icons/fa";

import { FaChevronCircleUp } from "react-icons/fa";
import "./Header.css";

export default function Header(props) {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className={`header-box ${props.className}`}>
      <div className="header-content">
        <p>Scoup</p>
        {!drawer && (
          <FaChevronCircleDown
            className="details-button"
            onClick={() => {
              setDrawer((prev) => !prev);
            }}
          />
        )}
        {drawer && (
          <FaChevronCircleUp
            className="details-button"
            onClick={() => {
              setDrawer((prev) => !prev);
            }}
          />
        )}
      </div>
      {drawer && (
        <div
          style={{
            alignSelf: "center",
            animation: "fadeInDown 600ms ease-in-out",
          }}
        >
          <Drawer {...props} />
        </div>
      )}
    </div>
  );
}
