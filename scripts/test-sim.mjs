import fs from 'fs';
import sharp from 'sharp';

async function test() {
  const svgs = ['temp_book.svg', 'temp_badge.svg', 'temp_lucide.svg'];
  for (const svgFile of svgs) {
    const name = svgFile.replace('.svg', '');
    const svgBuf = fs.readFileSync(svgFile);

    // Render transparent 32x32 and 64x64
    await sharp(svgBuf).resize(32, 32).png().toFile(`${name}_32.png`);
    await sharp(svgBuf).resize(64, 64).png().toFile(`${name}_64.png`);

    // Render on dark tab simulation (like user's tab: #202124)
    await sharp({
      create: {
        width: 120,
        height: 40,
        channels: 4,
        background: { r: 32, g: 33, b: 36, alpha: 1 } // Chrome dark tab
      }
    })
    .composite([{ input: await sharp(svgBuf).resize(20, 20).png().toBuffer(), left: 12, top: 10 }])
    .png()
    .toFile(`${name}_darktab_sim.png`);

    // Render on light tab simulation (#DFE1E5)
    await sharp({
      create: {
        width: 120,
        height: 40,
        channels: 4,
        background: { r: 223, g: 225, b: 229, alpha: 1 } // Chrome light tab
      }
    })
    .composite([{ input: await sharp(svgBuf).resize(20, 20).png().toBuffer(), left: 12, top: 10 }])
    .png()
    .toFile(`${name}_lighttab_sim.png`);
  }
  console.log('Test simulations generated');
}
test();
