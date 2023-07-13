import React from 'react';
import './fifteenGame.css';

class Fifteen extends React.Component {
  componentDidMount() {
    const setup = {
      puzzle_fifteen: {
        diff: 300, // number of movements of the slots for shuffling pictures
        size: [512, 640], // element size "fifteen" in pixels only
        grid: [3, 4], // the number of squares in the height and width of the picture
        fill: true, // Stretching the area with the game to fit the element is recommended for fullscreen
        number: false, // Slot sequence number
        art: {
          url: "art.jpg", // path to the picture (you can use any format of supported browsers, gif-animation of svg)
          ratio: false // enlarge the picture in height or width
        },
        // optional elements
        keyBoard: true, // Control using the keys on the keyboard
        gamePad: true, // Control using the joystick on the Gamepad
        time: 0.1, // block move animation time
        style: "background-color:#c4cebb;display:grid;justify-items:center;align-items:center;font-family:Arial;color:#fff;border-radius:12px;font-size:32px;" // style for puzzle square
      }
    };

    const slot_style = document.getElementById('slot_style');
    const img_file = document.getElementById('img_file');
    const img = document.getElementById("art");
    let file;

    img_file.addEventListener('change', loadFiles);

    function loadFiles(e) {
      file = img_file.files[0];
      adden_file();
    }

    function adden_file() {
      setup.puzzle_fifteen.art.url = window.URL.createObjectURL(file);
      img.src = setup.puzzle_fifteen.art.url;
      img.onload = function () {
        setup.puzzle_fifteen.size = [img.width, img.height];
        auto_grid();
        auto_style();
        fifteen_update();
      };
    }

    function auto_grid() {
      const s = setup.puzzle_fifteen;
      if (s.size[1] < s.size[0]) {
        s.grid = [Math.round(s.size[0] / (s.size[1] / 4)) - 1, 3];
      } else {
        s.grid = [3, Math.round(s.size[1] / (s.size[0] / 4)) - 1];
      }
      grid_width.value = s.grid[0];
      grid_height.value = s.grid[1];
      width.value = s.size[0];
      height.value = s.size[1];
    }

    function auto_style() {
      const s = setup.puzzle_fifteen;
      let v;
      let i;
      if (s.size[1] < s.size[0]) {
        v = Math.round((s.size[0] / s.grid[0]) / 16);
      } else {
        v = Math.round((s.size[1] / s.grid[1]) / 16);
      }
      const d = s.style.split(";");
      for (i = 0; i < d.length; i++) {
        if (d[i].includes("border-radius")) {
          s.style = s.style.replace(d[i], "border-radius:" + Math.round(v * 1.5) + "px");
        } else if (d[i].includes("font-size")) {
          s.style = s.style.replace(d[i], "font-size:" + (v * 3) + "px");
        }
      }
      slot_style.value = s.style;
    }

    function fifteen_update() {
      const f = document.getElementById("fifteen");
      f.innerHTML = "";
      ceation_slots();
    }

    function fifteen_build() {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a file with a picture');
      }
      reader.onload = function () {
        setup.puzzle_fifteen.art.url = reader.result;
        gen_file();
      };
      reader.onerror = function (error) {
        alert('Error: ' + error);
      };

      function gen_file() {
        const url = "fifteen_puzzle.js";
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const html = "data:text/json;charset=utf-8," + encodeURIComponent("<!DOCTYPE html>\n<html>\n<head>\n<style>\n body{height:97vh;padding:0;display:grid;align-content:center;justify-content:center;}\n</style>\n</head>\n<body>\n<div id='fifteen'></div>\n<script>\n" + this.responseText.replace("setup.puzzle_fifteen", JSON.stringify(setup.puzzle_fifteen, null, '\t')) + "\n<\/script>\n<\/body>\n<\/html>");
            const a = document.getElementById('dwonload');
            a.setAttribute("href", html);
            a.setAttribute("download", "index.html");
            a.click();
          }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onerror = function () {
          if (this.status == 0) {
            alert('runtime not loaded');
          }
        };
      }
    }

    const drop = {
      init: function () {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          window.addEventListener("dragover", function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
          window.addEventListener("drop", function (e) {
            e.preventDefault();
            e.stopPropagation();
            file = e.dataTransfer.files[0];
            adden_file();
          });
        }
      }
    };

    window.addEventListener("DOMContentLoaded", drop.init);

    const p = setup.puzzle_fifteen;
    let freeslot = [];
    let size = [];
    const m = [];
    let o;
    const f = document.getElementById("fifteen");

    ceation_slots();

    function ceation_slots() {
      size = [p.size[0] / (p.grid[0] + 1), p.size[1] / (p.grid[1] + 1)];
      const c = (p.emptySlot) ? p.emptySlot : (p.grid[1] + 1) * (p.grid[0] + 1);
      f.style.width = p.size[0] + 'px';
      f.style.height = p.size[1] + 'px';
      f.style.position = 'relative';
      if (p.fill) {
        fifteen_resize();
        window.addEventListener('resize', fifteen_resize, true);
      }
      o = 1;
      for (let y = 0; y <= p.grid[1]; y++) {
        for (let x = 0; x <= p.grid[0]; x++) {
          if (o != c) {
            if (!m[y]) {
              m[y] = [];
            }
            m[y][x] = o;
            const e = document.createElement("div");
            e.id = "slot" + o;
            e.setAttribute("onClick", "move_slot(" + o + ")");
            e.className = "slot";
            if (p.number) {
              e.innerHTML = o;
            }
            e.style = "background-image:url(" + p.art.url + ");background-size:" + ((p.art.ratio) ? p.size[0] + "px auto" : "auto " + p.size[1] + "px") + ";background-position:-" + (size[0] * x) + "px -" + (size[1] * y) + "px ;width:" + size[0] + "px;height:" + size[1] + "px;top:" + (size[1] * y) + "px;left:" + (size[0] * x) + "px;position:absolute;" + ((p.style) ? p.style : "");
            if (p.time) {
              e.style.transitionDuration = p.time + "s";
            }
            f.appendChild(e);
            o++;
          } else {
            m[y][x] = 0;
            freeslot = [y, x];
            o++;
          }
        }
      }
      stir_slots();
    }

    function stir_slots() {
      for (let y = 0; y < p.diff; y++) {
        let a = [];
        if ((Math.random() * 2) > 1) {
          a = [freeslot[0] + (-1 + Math.round(Math.random() * 2)), freeslot[1]];
          if (a[0] < 0) {
            a[0] = a[0] + 2;
          } else if (a[0] > p.grid[1]) {
            a[0] = a[0] - 2;
          }
        } else {
          a = [freeslot[0], freeslot[1] + (-1 + Math.round(Math.random() * 2))];
          if (a[1] < 0) {
            a[1] = a[1] + 2;
          } else if (a[1] > p.grid[0]) {
            a[1] = a[1] - 2;
          }
        }
        const s = [m[freeslot[0]][freeslot[1]], m[a[0]][a[1]]];
        m[freeslot[0]][freeslot[1]] = s[1];
        m[a[0]][a[1]] = s[0];
        freeslot = [a[0], a[1]];
      }
      for (let y = 0; y <= p.grid[1]; y++) {
        for (let x = 0; x <= p.grid[0]; x++) {
          if (m[y][x]) {
            const e = document.getElementById("slot" + m[y][x]);
            e.style.left = (x * size[0]) + "px";
            e.style.top = (y * size[1]) + "px";
          }
        }
      }
    }

    function move_slot(s) {
      let z = 0;
      let e;
      let a = [];
      let k, j;

      function move(y, x, h, w) {
        j = m[y][x];
        e = document.getElementById("slot" + j);
        e.style.left = ((x + w) * size[0]) + "px";
        e.style.top = ((y + h) * size[1]) + "px";
        m[y][x] = k;
        k = j;
      }

      for (let y = 0; y < p.grid[1] + 1; y++) {
        for (let x = 0; x < p.grid[0] + 1; x++) {
          if (m[y][x] == s) {
            a = [y, x];
            k = 0;
            if (freeslot[0] == a[0]) {
              if (freeslot[1] > a[1]) {
                for (z = 0; z < freeslot[1] - a[1]; z++) {
                  move(a[0], a[1] + z, 0, +1);
                }
              } else if (freeslot[1] < a[1]) {
                for (z = 0; z < a[1] - freeslot[1]; z++) {
                  move(a[0], a[1] - z, 0, -1);
                }
              }
              m[freeslot[0]][freeslot[1]] = k;
              freeslot = [a[0], a[1]];
              s = false;
              break;
            } else if (freeslot[1] == a[1]) {
              if (freeslot[0] > a[0]) {
                for (z = 0; z < freeslot[0] - a[0]; z++) {
                  move(a[0] + z, a[1], +1, 0);
                }
              } else if (freeslot[0] < a[0]) {
                for (z = 0; z < a[0] - freeslot[0]; z++) {
                  move(a[0] - z, a[1], -1, 0);
                }
              }
              m[freeslot[0]][freeslot[1]] = k;
              freeslot = [a[0], a[1]];
              s = false;
              break;
            }
          }
          if (!s) {
            break;
          }
        }
        if (!s) {
          break;
        }
      }
      check_slots();
    }

    function check_slots() {
      let check = 1;
      for (let y = 0; y <= p.grid[1]; y++) {
        for (let x = 0; x <= p.grid[0]; x++) {
          if (m[y][x] == 0 || check == m[y][x]) {
            check++;
          } else {
            break;
          }
        }
      }
      if (check == o) {
        setTimeout(() => {
          alert('win');
        }, ((p.time) ? p.time * 1000 : 0));
      } // <-- alert('win') script that runs at the end of the game
    }

    function fifteen_resize() {
      const rect = f.parentNode.getBoundingClientRect();
      if ((p.size[0] / p.size[1]) < (rect.width / rect.height)) {
        f.style.transform = 'scale(' + (rect.height / p.size[1]) + ')';
      } else {
        f.style.transform = 'scale(' + (rect.width / p.size[0]) + ')';
      }
    }

    if (p.keyBoard) {
      document.addEventListener("keydown", function (e) {
        e = e.keyCode;
        if (e == 37) {
          move_slot(m[freeslot[0]][freeslot[1] + 1]);
        } else if (e == 39) {
          move_slot(m[freeslot[0]][freeslot[1] - 1]);
        } else if (e == 38) {
          move_slot(m[freeslot[0] + 1][freeslot[1]]);
        } else if (e == 40) {
          move_slot(m[freeslot[0] - 1][freeslot[1]]);
        }
      });
    }

    let gamepad, gamepadPress;
    if (p.gamePad) {
      window.addEventListener('gamepadconnected', function (e) {
        const update = () => {
          for (gamepad of navigator.getGamepads()) {
            if (!gamepad) continue;
            const statenow = gamepad.buttons.some(btn => btn.pressed);
            if (gamepadPress !== statenow) {
              gamepadPress = statenow;
              if (gamepad.buttons[12].pressed && m[freeslot[0] + 1]) {
                move_slot(m[freeslot[0] + 1][freeslot[1]]);
              } else if (gamepad.buttons[14].pressed && m[freeslot[0]]) {
                move_slot(m[freeslot[0]][freeslot[1] + 1]);
              } else if (gamepad.buttons[15].pressed && m[freeslot[0]]) {
                move_slot(m[freeslot[0]][freeslot[1] - 1]);
              } else if (gamepad.buttons[13].pressed && m[freeslot[0] - 1]) {
                move_slot(m[freeslot[0] - 1][freeslot[1]]);
              }
            }
          }
          requestAnimationFrame(update);
        };
        update();
      });
    }

    return (
      <div className="fifteenGame">
        <div style={{ textAlign: "right", marginRight: "-400px", fontSize: "30px" }}>
          <a href="/index.html"><i style={{ color: "black" }} className="fas fa-home home-icon"></i></a>
        </div>
        <div id='fifteen'></div>
        <div style={{ position: "fixed", top: 0, left: 0, boxShadow: "0px 2px 24px rgba(110,95,165,0.25)", borderRadius: "0 0 16px 0", backgroundColor: "#fff", width: "196px" }}>
          <div style={{ display: "none", position: "fixed" }}>
            <img id="art" src="" />
            <a id="dwonload"></a>
            <input id="img_file" type="file" accept="image/png,image/gif,image/jpeg,image/webp" />
          </div>
          <div style={{ overflow: "auto", width: "180px", maxHeight: "100vh", height: "100%", padding: "8px" }}>
            <table style={{ borderCollapse: "collapse" }} border="1">
              <tbody>
                <tr>
                  <td style={{ height: "48px" }} colSpan="2">
                    <div className="button" onClick={() => { img_file.click(); }}>Load img file</div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "68px", height: "34px", paddingRight: "8px" }} align="right">Difficulty</td>
                  <td><input onChange={(e) => { setup.puzzle_fifteen.diff = e.target.value; fifteen_update(); }} value="300" className="input_text" type="text" /></td>
                </tr>
                <tr>
                  <td style={{ height: "34px", paddingRight: "8px" }} align="right">Width</td>
                  <td><input id="width" onChange={(e) => { setup.puzzle_fifteen.size[0] = parseInt(e.target.value); fifteen_update(); }} value="1024" className="input_text" type="text" /></td>
                </tr>
                <tr>
                  <td style={{ height: "34px", paddingRight: "8px" }} align="right">Height</td>
                  <td><input id="height" onChange={(e) => { setup.puzzle_fifteen.size[1] = parseInt(e.target.value); fifteen_update(); }} value="1281" className="input_text" type="text" /></td>
                </tr>
                <tr>
                  <td style={{ height: "34px", paddingRight: "8px" }} align="right">Image fill</td>
                  <td align="center">
                    <label className="switch">
                      <input type="checkbox" onChange={(e) => { setup.puzzle_fifteen.art.ratio = e.target.checked; fifteen_update(); }} />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td style={{ height: "34px", paddingRight: "8px" }} align="right">Grid width</td>
                  <td><input id="grid_width" onChange={(e) => { setup.puzzle_fifteen.grid[0] = parseInt(e.target.value); fifteen_update(); }} value="3" className="input_text" type="text" /></td>
                </tr>
                <tr>
                  <td style={{ height: "34px", paddingRight: "8px" }} align="right">Grid height</td>
                  <td><input id="grid_height" onChange={(e) => { setup.puzzle_fifteen.grid[1] = parseInt(e.target.value); fifteen_update(); }} value="4" className="input_text" type="text" /></td>
                </tr>
                <tr>
                  <td style={{ height: "34px", paddingRight: "8px" }} align="right">Move time</td>
                  <td><input onChange={(e) => { setup.puzzle_fifteen.time = e.target.value; fifteen_update(); }} value="0.4" className="input_text" type="text" /></td>
                </tr>
                <tr>
                  <td style={{ height: "34px", paddingRight: "8px" }} align="right">Numbers</td>
                  <td align="center">
                    <label className="switch">
                      <input type="checkbox" onChange={(e) => { setup.puzzle_fifteen.number = e.target.checked; fifteen_update(); }} />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td style={{ height: "34px", paddingRight: "8px" }} align="right">Puzzle fill</td>
                  <td align="center">
                    <label className="switch">
                      <input type="checkbox" onChange={(e) => { setup.puzzle_fifteen.fill = e.target.checked; if (!e.target.checked) { window.removeEventListener('resize', fifteen_resize, true); f.style.transform = 'scale(1)'; }; fifteen_update(); }} checked />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td style={{ height: "34px", paddingRight: "8px" }} align="right">Style blocks</td>
                  <td><input id="slot_style" onChange={(e) => { setup.puzzle_fifteen.style = e.target.value; fifteen_update(); }} value="background-color:#c4cebb;display:grid;justify-items:center;align-items:center;font-family:Arial;color:#fff;border-radius:12px;font-size:32px;" className="input_text" type="text" /></td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <div className="button" onClick={fifteen_build}>Create the game</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Fifteen;
