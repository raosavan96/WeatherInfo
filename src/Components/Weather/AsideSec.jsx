import React, { useEffect, useState } from "react";
import "./Weather.css";
import UmbrellPng from "./images/umbrella.png";

function AsideSec() {
  const savedThemee =
    JSON.parse(localStorage.getItem("themee")) || "light_mode";

  const setMode = JSON.parse(localStorage.getItem("tmode")) || "Mode";

  const [ThemE, setThemE] = useState(savedThemee);
  const [modeName, setModeName] = useState(setMode);

  function handleTheme() {
    ThemE === "dark_mode" ? setThemE("light_mode") : setThemE("dark_mode");
    ThemE === "dark_mode" ? setModeName("Dark") : setModeName("Light");
  }

  useEffect(() => {
    localStorage.setItem("themee", JSON.stringify(ThemE));
    localStorage.setItem("tmode", JSON.stringify(modeName));
    let a = (document.body.className = ThemE);
    console.log(a);
  }, [ThemE]);

  return (
    <>
      <div className={`aside_sec flex justify-center py-3`}>
        <div className={`umbrela`}>
          <img src={UmbrellPng} />
        </div>

        <div
          className={`mt-4 flex justify-center items-center flex-col mode_css`}
        >
          <div className="toggle-container">
            <input type="checkbox" id="toggle" className="toggle-checkbox" />
            <label
              for="toggle"
              className="toggle-label"
              onClick={() => {
                handleTheme();
              }}
            >
              <span className="toggle-circle"></span>
            </label>
          </div>
          <p className={`mode`}>{modeName}</p>
        </div>
      </div>
    </>
  );
}

export default AsideSec;
