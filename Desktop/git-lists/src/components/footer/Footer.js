import React from "react";
import "./Footer.css";
// Footer for the app
export default function Header(props) {
  return (
    <div className="footer">
      {props.note}
    </div>
  );
}
