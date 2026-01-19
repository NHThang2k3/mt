/**
 * Script to generate QR codes for products
 * Run: npx ts-node scripts/generate-qr-codes.js
 * Or: node scripts/generate-qr-codes.js
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Configure your domain here
const DOMAIN = 'https://mt-six-pink.vercel.app/'; // TODO: Replace with your actual domain

// Product codes matching products.ts
const products = [
  { id: 'bac-sen', code: 'BAC_SEN_01', name: 'Mứt Sen Tây Hồ', region: 'Miền Bắc' },
  { id: 'bac-quat', code: 'BAC_QUAT_01', name: 'Mứt Quất Hưng Yên', region: 'Miền Bắc' },
  { id: 'trung-gung', code: 'TRUNG_GUNG_01', name: 'Mứt Gừng Huế', region: 'Miền Trung' },
  { id: 'trung-me', code: 'TRUNG_ME_01', name: 'Mứt Me Đà Nẵng', region: 'Miền Trung' },
  { id: 'nam-dua', code: 'NAM_DUA_01', name: 'Mứt Dừa Bến Tre', region: 'Miền Nam' },
  { id: 'nam-tac', code: 'NAM_TAC_01', name: 'Mứt Tắc Cần Thơ', region: 'Miền Nam' },
];

const outputDir = path.join(__dirname, '..', 'public', 'qr-codes');

async function generateQRCodes() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🖼️  Generating QR codes...\n');

  for (const product of products) {
    const url = `${DOMAIN}/unlock?code=${product.code}`;
    const filename = `qr-${product.id}.png`;
    const filepath = path.join(outputDir, filename);

    try {
      await QRCode.toFile(filepath, url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      console.log(`✅ ${product.name} (${product.region})`);
      console.log(`   URL: ${url}`);
      console.log(`   File: /qr-codes/${filename}\n`);
    } catch (err) {
      console.error(`❌ Error generating QR for ${product.name}:`, err);
    }
  }

  console.log('✨ Done! QR codes saved to /public/qr-codes/');
}

generateQRCodes();
