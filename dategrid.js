/*
let grid = document.createElement("svg")
grid.style.width = 1404
grid.style.height = 1872
*/

const DEBUG = false;

const DIM = {
  width_px: 1404,
  height_px: 1872,
  menu_px: 120,
};

let canvas = document.createElement("canvas");
canvas.width = DIM.width_px;
canvas.height = DIM.height_px;

// document.body.appendChild(canvas);

ctx = canvas.getContext("2d");

// Set up the background
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, DIM.width_px, DIM.height_px);

// Set up Menu Bar locations for debugging
if (DEBUG) {
  ctx.fillStyle = "#ddd";
  ctx.fillRect(0, 0, DIM.menu_px, DIM.height_px);
  ctx.fillRect(0, 0, DIM.width_px, DIM.menu_px);
}

// Draw the grid
const ROWS = 48;

ctx.beginPath();
ctx.strokeStyle = "#ccc";
ctx.lineWidth = 1;

let effective_width_px = DIM.width_px - DIM.menu_px;
let effective_height_px = DIM.height_px - DIM.menu_px;

let grid_size_px = Math.floor(effective_height_px / ROWS);
let max_cols = Math.floor(effective_width_px / grid_size_px);
let width_px = max_cols * grid_size_px;
let height_px = ROWS * grid_size_px;

let text_space_px = effective_width_px - width_px - 1;

for (let y_px = DIM.menu_px; y_px <= DIM.height_px; y_px += grid_size_px) {
  ctx.moveTo(DIM.menu_px + text_space_px, y_px);
  ctx.lineTo(DIM.menu_px + width_px + text_space_px, y_px);
}

for (let x_px = DIM.menu_px + text_space_px; x_px <= DIM.width_px; x_px += grid_size_px) {
  ctx.moveTo(x_px, DIM.menu_px);
  ctx.lineTo(x_px, DIM.menu_px + height_px);
}

ctx.stroke();

// Add the labels
const FONT_SIZE = 14;
ctx.font = FONT_SIZE + "px sans-serif";
ctx.fillStyle = "#777";

for (let hour = 0; hour < 24; hour++) {
  let start_px = DIM.menu_px + FONT_SIZE / 2 - 1;
  ctx.fillText(hour < 10 ? "0" + hour : hour, DIM.menu_px + 2, start_px + hour * grid_size_px * 2);
}

var data = canvas.toDataURL("image/png");
var img = document.createElement("img");
img.src = data;
document.body.appendChild(img);
