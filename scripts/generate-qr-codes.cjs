const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

const BASE_URL = "https://dasveganequartett.de/cards";
const START_ID = 1;
const END_ID = 54;

const OUTPUT_DIR = path.join(__dirname, "..", "qr-codes");
const LOGO_PATH = path.join(__dirname, "logo.png");

const QR_PX = 3000;
const MARGIN = 4;

const LOGO_MODULES = 9; // ungerade Zahl: 7, 9 oder 11
const LOGO_PADDING_MODULES = 1;

const CORNER_RADIUS_RATIO = 0.18;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function roundedRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function isFinderPattern(row, col, moduleCount) {
  const inTopLeft = row < 7 && col < 7;
  const inTopRight = row < 7 && col >= moduleCount - 7;
  const inBottomLeft = row >= moduleCount - 7 && col < 7;

  return inTopLeft || inTopRight || inBottomLeft;
}

function getLogoClearArea(moduleCount) {
  const clearModules = LOGO_MODULES + LOGO_PADDING_MODULES * 2;
  const start = Math.floor((moduleCount - clearModules) / 2);
  const end = start + clearModules - 1;

  return { start, end, clearModules };
}

function isInLogoClearArea(row, col, clearArea) {
  return (
    row >= clearArea.start &&
    row <= clearArea.end &&
    col >= clearArea.start &&
    col <= clearArea.end
  );
}

function buildMatrix(qr, moduleCount, clearArea) {
  const matrix = [];

  for (let row = 0; row < moduleCount; row++) {
    matrix[row] = [];

    for (let col = 0; col < moduleCount; col++) {
      const isDark = qr.modules.get(row, col);
      const hiddenByLogo = isInLogoClearArea(row, col, clearArea);

      matrix[row][col] = isDark && !hiddenByLogo;
    }
  }

  return matrix;
}

function drawFinderPatterns(ctx, matrix, moduleCount, moduleSize, offset) {
  ctx.fillStyle = "#000000";

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (!matrix[row][col]) continue;
      if (!isFinderPattern(row, col, moduleCount)) continue;

      const x = offset + col * moduleSize;
      const y = offset + row * moduleSize;

      ctx.fillRect(
        Math.round(x),
        Math.round(y),
        Math.ceil(moduleSize),
        Math.ceil(moduleSize)
      );
    }
  }
}

function drawConnectedModules(ctx, matrix, moduleCount, moduleSize, offset) {
  ctx.fillStyle = "#000000";
  ctx.beginPath();

  const radius = moduleSize * CORNER_RADIUS_RATIO;

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (!matrix[row][col]) continue;
      if (isFinderPattern(row, col, moduleCount)) continue;

      const top = row > 0 && matrix[row - 1][col];
      const right = col < moduleCount - 1 && matrix[row][col + 1];
      const bottom = row < moduleCount - 1 && matrix[row + 1][col];
      const left = col > 0 && matrix[row][col - 1];

      const x = offset + col * moduleSize;
      const y = offset + row * moduleSize;
      const s = moduleSize;

      const roundTopLeft = !top && !left;
      const roundTopRight = !top && !right;
      const roundBottomRight = !bottom && !right;
      const roundBottomLeft = !bottom && !left;

      ctx.moveTo(x + (roundTopLeft ? radius : 0), y);

      ctx.lineTo(x + s - (roundTopRight ? radius : 0), y);
      if (roundTopRight) {
        ctx.quadraticCurveTo(x + s, y, x + s, y + radius);
      }

      ctx.lineTo(x + s, y + s - (roundBottomRight ? radius : 0));
      if (roundBottomRight) {
        ctx.quadraticCurveTo(x + s, y + s, x + s - radius, y + s);
      }

      ctx.lineTo(x + (roundBottomLeft ? radius : 0), y + s);
      if (roundBottomLeft) {
        ctx.quadraticCurveTo(x, y + s, x, y + s - radius);
      }

      ctx.lineTo(x, y + (roundTopLeft ? radius : 0));
      if (roundTopLeft) {
        ctx.quadraticCurveTo(x, y, x + radius, y);
      }

      ctx.closePath();
    }
  }

  ctx.fill();
}

async function drawLogo(ctx, moduleCount, moduleSize, offset, clearArea) {
  if (!fs.existsSync(LOGO_PATH)) return;

  const logo = await loadImage(LOGO_PATH);

  const clearX = offset + clearArea.start * moduleSize;
  const clearY = offset + clearArea.start * moduleSize;
  const clearSize = clearArea.clearModules * moduleSize;

  ctx.fillStyle = "#ffffff";
  roundedRect(
    ctx,
    clearX,
    clearY,
    clearSize,
    clearSize,
    moduleSize * 0.8
  );
  ctx.fill();

  const logoModules = LOGO_MODULES;
  const logoSize = logoModules * moduleSize;
  const logoX = offset + (clearArea.start + LOGO_PADDING_MODULES) * moduleSize;
  const logoY = offset + (clearArea.start + LOGO_PADDING_MODULES) * moduleSize;

  ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
}

async function createStyledQR(id) {
  const url = `${BASE_URL}/${id}`;
  const qr = QRCode.create(url, { errorCorrectionLevel: "H" });

  const moduleCount = qr.modules.size;
  const totalModules = moduleCount + MARGIN * 2;
  const moduleSize = QR_PX / totalModules;
  const offset = MARGIN * moduleSize;

  const clearArea = getLogoClearArea(moduleCount);
  const matrix = buildMatrix(qr, moduleCount, clearArea);

  const canvas = createCanvas(QR_PX, QR_PX);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, QR_PX, QR_PX);

  drawFinderPatterns(ctx, matrix, moduleCount, moduleSize, offset);
  drawConnectedModules(ctx, matrix, moduleCount, moduleSize, offset);

  await drawLogo(ctx, moduleCount, moduleSize, offset, clearArea);

  const fileName = `qr_${String(id).padStart(2, "0")}.png`;
  const pngPath = path.join(OUTPUT_DIR, fileName);

  fs.writeFileSync(pngPath, canvas.toBuffer("image/png"));

  console.log(`Erstellt: ${fileName} → ${url}`);
}

async function main() {
  for (let id = START_ID; id <= END_ID; id++) {
    await createStyledQR(id);
  }

  console.log("Fertig! Alle QR-Codes liegen im Ordner qr-codes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});