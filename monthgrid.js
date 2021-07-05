const DEBUG = false;

const DIM = {
  width_px: 1404,
  height_px: 1872,
  menu_px: 120,
};

let canvas = document.createElement("canvas");
canvas.width = DIM.width_px;
canvas.height = DIM.height_px;

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
const ROWS = 32;

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

for (let day = 1; day <= 31; day++) {
  let start_px = DIM.menu_px + FONT_SIZE / 2 - 1 + grid_size_px / 2;
  ctx.fillText(day < 10 ? "0" + day : day, DIM.menu_px + 2, start_px + (day - 1) * grid_size_px);
}

var data = canvas.toDataURL("image/png");
var img = document.createElement("img");
img.src = data;
document.body.appendChild(img);
