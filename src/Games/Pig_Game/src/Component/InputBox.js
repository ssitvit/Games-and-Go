import React, { useState, useEffect } from "react";
import "./style.css";

function InputBox({ onChangeInput, inputValue }) {
  console.log(inputValue, "inputValue i m from input box");

  return (
    <div className="">
      <div className="no_Text">Enter Winning Score</div>
      <input
        type="number"
        id="inputType"
        placeholder="Enter Winning Score"
        value={inputValue}
        onChange={(e) => onChangeInput(e)}
      ></input>
    </div>
  );
}

export default InputBox;
