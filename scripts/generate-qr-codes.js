/**
 * Script to generate QR codes for VietCharm products
 * Run: node scripts/generate-qr-codes.js
 * 
 * Make sure to install qrcode first: npm install qrcode
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Configure your domain here
const DOMAIN = 'https://vietcharm-omni9.vercel.app'; // Your actual domain

// Product codes matching the new products in products.ts
const products = [
  // Miền Bắc
  { id: 'bac-man', code: 'BAC_MAN_01', name: 'Mứt Mận Mộc Châu', region: 'Miền Bắc' },
  { id: 'bac-mo', code: 'BAC_MO_01', name: 'Mứt Mơ Ba Vì', region: 'Miền Bắc' },
  // Miền Trung
  { id: 'trung-sen', code: 'TRUNG_SEN_01', name: 'Mứt Hạt Sen Huế', region: 'Miền Trung' },
  { id: 'trung-dau', code: 'TRUNG_DAU_01', name: 'Mứt Dâu Tây Đà Lạt', region: 'Miền Trung' },
  // Miền Nam
  { id: 'nam-dua', code: 'NAM_DUA_01', name: 'Mứt Dừa Bến Tre', region: 'Miền Nam' },
  { id: 'nam-mangcau', code: 'NAM_MANGCAU_01', name: 'Mứt Mãng Cầu Tiền Giang', region: 'Miền Nam' },
];

// Special QR code to unlock all products
const specialCodes = [
  { id: 'vietcharm-all', code: 'VIETCHARM_ALL', name: '🌟 Mở Khóa Toàn Bộ', region: 'Đặc Biệt' },
];

const outputDir = path.join(__dirname, '..', 'public', 'qr-codes');

async function generateQRCodes() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🍯 VietCharm QR Code Generator');
  console.log('================================\n');
  console.log('🖼️  Generating QR codes for products...\n');

  // Generate QR for each product
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

  console.log('\n🌟 Generating special QR codes...\n');

  // Generate special QR codes
  for (const special of specialCodes) {
    const url = `${DOMAIN}/unlock?code=${special.code}`;
    const filename = `qr-${special.id}.png`;
    const filepath = path.join(outputDir, filename);

    try {
      await QRCode.toFile(filepath, url, {
        width: 300,  // Same size as other QR codes
        margin: 2,
        color: {
          dark: '#000000',  // Black color (same as other QR codes)
          light: '#FFFFFF', // White background (same as other QR codes)
        },
      });

      console.log(`✨ ${special.name}`);
      console.log(`   URL: ${url}`);
      console.log(`   File: /qr-codes/${filename}\n`);
    } catch (err) {
      console.error(`❌ Error generating QR for ${special.name}:`, err);
    }
  }

  console.log('================================');
  console.log('✨ Done! All QR codes saved to /public/qr-codes/');
  console.log('\n📋 Product QR codes:');
  products.forEach(p => console.log(`   - qr-${p.id}.png`));
  console.log('\n🌟 Special QR codes:');
  specialCodes.forEach(s => console.log(`   - qr-${s.id}.png (${s.name})`));
}

generateQRCodes();
