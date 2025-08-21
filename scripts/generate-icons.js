#!/usr/bin/env node

/**
 * Icon Generation Script for KBS Calculator PWA
 * 
 * This script helps you generate the required PWA icons from your calculator image.
 * 
 * Requirements:
 * - Node.js with sharp package installed
 * - Your calculator image (PNG format recommended)
 * 
 * Usage:
 * 1. Install sharp: npm install sharp
 * 2. Place your calculator image in the public/ folder as 'calculator-icon.png'
 * 3. Run: node scripts/generate-icons.js
 * 4. Icons will be generated in the public/ folder
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconSizes = [
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

async function generateIcons() {
  const inputPath = path.join(__dirname, '../public/calculator-icon.png');
  
  // Check if input image exists
  if (!fs.existsSync(inputPath)) {
    console.log('❌ Input image not found: public/calculator-icon.png');
    console.log('📁 Please place your calculator image in the public/ folder');
    console.log('🖼️  Recommended: PNG format, at least 512x512 pixels');
    return;
  }

  console.log('🎨 Generating PWA icons...');

  try {
    for (const icon of iconSizes) {
      const outputPath = path.join(__dirname, '../public', icon.name);
      
      await sharp(inputPath)
        .resize(icon.size, icon.size, {
          fit: 'contain',
          background: { r: 22, g: 163, b: 74, alpha: 1 } // Green background matching theme
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated: ${icon.name} (${icon.size}x${icon.size})`);
    }

    console.log('\n🎉 All PWA icons generated successfully!');
    console.log('📱 Your app is now ready for PWA installation');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
  }
}

// Check if sharp is available
try {
  generateIcons();
} catch (error) {
  console.log('❌ Sharp package not found');
  console.log('📦 Install it with: npm install sharp');
  console.log('🔧 Or run: npm install sharp');
}
