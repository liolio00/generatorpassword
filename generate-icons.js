const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Couleurs Netflix
const NETFLIX_RED = '#E50914';
const NETFLIX_BLACK = '#141414';

function drawLock(ctx, size) {
    // Dimensions du cadenas
    const padding = size * 0.15;
    const width = size - (padding * 2);
    const height = width * 1.2;
    const x = padding;
    const y = padding;

    // Dessiner l'arc du cadenas
    const arcWidth = width * 0.6;
    const arcHeight = height * 0.4;
    ctx.beginPath();
    ctx.moveTo(x + width * 0.2, y + arcHeight);
    ctx.bezierCurveTo(
        x + width * 0.2, y,
        x + width * 0.8, y,
        x + width * 0.8, y + arcHeight
    );
    ctx.lineWidth = width * 0.2;
    ctx.strokeStyle = NETFLIX_RED;
    ctx.stroke();

    // Corps du cadenas
    ctx.fillStyle = NETFLIX_RED;
    const bodyX = x + width * 0.1;
    const bodyY = y + arcHeight * 0.8;
    const bodyWidth = width * 0.8;
    const bodyHeight = height * 0.6;
    const radius = width * 0.1;

    // Rectangle arrondi pour le corps
    ctx.beginPath();
    ctx.moveTo(bodyX + radius, bodyY);
    ctx.lineTo(bodyX + bodyWidth - radius, bodyY);
    ctx.quadraticCurveTo(bodyX + bodyWidth, bodyY, bodyX + bodyWidth, bodyY + radius);
    ctx.lineTo(bodyX + bodyWidth, bodyY + bodyHeight - radius);
    ctx.quadraticCurveTo(bodyX + bodyWidth, bodyY + bodyHeight, bodyX + bodyWidth - radius, bodyY + bodyHeight);
    ctx.lineTo(bodyX + radius, bodyY + bodyHeight);
    ctx.quadraticCurveTo(bodyX, bodyY + bodyHeight, bodyX, bodyY + bodyHeight - radius);
    ctx.lineTo(bodyX, bodyY + radius);
    ctx.quadraticCurveTo(bodyX, bodyY, bodyX + radius, bodyY);
    ctx.fill();

    // Trou de serrure
    const keyHoleY = bodyY + bodyHeight * 0.4;
    ctx.fillStyle = NETFLIX_BLACK;

    // Cercle du trou
    ctx.beginPath();
    ctx.arc(x + width / 2, keyHoleY, width * 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Fente du trou
    const slotWidth = width * 0.05;
    const slotHeight = height * 0.15;
    ctx.fillRect(
        x + width / 2 - slotWidth / 2,
        keyHoleY,
        slotWidth,
        slotHeight
    );
}

function generateIcon(size, filename) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Fond noir
    ctx.fillStyle = NETFLIX_BLACK;
    ctx.fillRect(0, 0, size, size);

    // Dessiner le cadenas
    drawLock(ctx, size);

    // Sauvegarder l'image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filename, buffer);
}

// Créer le dossier icons s'il n'existe pas
if (!fs.existsSync('icons')) {
    fs.mkdirSync('icons');
}

// Générer les icônes PWA
generateIcon(192, path.join(__dirname, 'icons', 'icon-192x192.png'));
generateIcon(512, path.join(__dirname, 'icons', 'icon-512x512.png'));

// Générer le favicon
generateIcon(32, path.join(__dirname, 'favicon.ico'));

console.log('Icônes et favicon générés avec succès !'); 