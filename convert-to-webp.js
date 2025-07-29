import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Directories to scan for images
const directories = [
  './public',
  './src/assets'
];

// File extensions to convert
const extensions = ['.png', '.jpg', '.jpeg'];

async function convertToWebP() {
  for (const dir of directories) {
    try {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const ext = path.extname(file).toLowerCase();
        
        // Skip if not an image we want to convert
        if (!extensions.includes(ext)) continue;
        
        // Skip if already a WebP file
        if (ext === '.webp') continue;
        
        // Create output path
        const outputPath = path.join(
          dir, 
          `${path.basename(file, ext)}.webp`
        );
        
        // Skip if WebP version already exists
        if (fs.existsSync(outputPath)) {
          console.log(`Skipping ${filePath} - WebP version already exists`);
          continue;
        }
        
        console.log(`Converting ${filePath} to WebP...`);
        
        try {
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(outputPath);
            
          console.log(`Successfully converted ${filePath} to ${outputPath}`);
        } catch (err) {
          console.error(`Error converting ${filePath}:`, err);
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
    }
  }
}

convertToWebP().then(() => {
  console.log('Conversion complete!');
}).catch(err => {
  console.error('Conversion failed:', err);
});