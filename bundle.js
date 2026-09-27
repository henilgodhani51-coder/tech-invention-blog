const fs = require('fs');
const path = require('path');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

function getSvgB64(filename) {
  const content = fs.readFileSync(path.join('assets/images', filename), 'utf8');
  return 'data:image/svg+xml;base64,' + Buffer.from(content).toString('base64');
}

const svgAi = getSvgB64('ai-neural.svg');
const svgQuantum = getSvgB64('quantum.svg');
const svgRobotics = getSvgB64('robotics.svg');
const svgFusion = getSvgB64('fusion.svg');
const svgBiotech = getSvgB64('biotech.svg');
const svgBattery = getSvgB64('battery.svg');
const svgDefault = getSvgB64('tech-default.svg');

// Update data.js content with base64 data URIs
let dataJs = fs.readFileSync('assets/js/data.js', 'utf8');
dataJs = dataJs.replace('"assets/images/ai-neural.svg"', JSON.stringify(svgAi));
dataJs = dataJs.replace('"assets/images/quantum.svg"', JSON.stringify(svgQuantum));
dataJs = dataJs.replace('"assets/images/robotics.svg"', JSON.stringify(svgRobotics));
dataJs = dataJs.replace('"assets/images/fusion.svg"', JSON.stringify(svgFusion));
dataJs = dataJs.replace('"assets/images/biotech.svg"', JSON.stringify(svgBiotech));
dataJs = dataJs.replace('"assets/images/battery.svg"', JSON.stringify(svgBattery));

const appJs = fs.readFileSync('assets/js/app.js', 'utf8');
const articleJs = fs.readFileSync('assets/js/article.js', 'utf8');
const writeJs = fs.readFileSync('assets/js/write.js', 'utf8');

// 1. Process index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(
  '<link rel="stylesheet" href="assets/css/style.css">',
  '<style>\n' + css + '\n</style>'
);
indexHtml = indexHtml.replace(
  '<script src="assets/js/data.js"></script>\n  <script src="assets/js/app.js"></script>',
  '<script>\n' + dataJs + '\n\n' + appJs + '\n</script>'
);
fs.writeFileSync('index.html', indexHtml, 'utf8');

// 2. Process article.html
let articleHtml = fs.readFileSync('article.html', 'utf8');
articleHtml = articleHtml.replace(
  '<link rel="stylesheet" href="assets/css/style.css">',
  '<style>\n' + css + '\n</style>'
);
articleHtml = articleHtml.replace(
  '<script src="assets/js/data.js"></script>\n  <script src="assets/js/article.js"></script>',
  '<script>\n' + dataJs + '\n\n' + articleJs + '\n</script>'
);
fs.writeFileSync('article.html', articleHtml, 'utf8');

// 3. Process write.html
let writeHtml = fs.readFileSync('write.html', 'utf8');
writeHtml = writeHtml.replace(
  '<link rel="stylesheet" href="assets/css/style.css">',
  '<style>\n' + css + '\n</style>'
);
writeHtml = writeHtml.replace(
  '<script src="assets/js/data.js"></script>\n  <script src="assets/js/write.js"></script>',
  '<script>\n' + dataJs + '\n\n' + writeJs + '\n</script>'
);
fs.writeFileSync('write.html', writeHtml, 'utf8');

// 4. Process about.html
let aboutHtml = fs.readFileSync('about.html', 'utf8');
aboutHtml = aboutHtml.replace(
  '<link rel="stylesheet" href="assets/css/style.css">',
  '<style>\n' + css + '\n</style>'
);
aboutHtml = aboutHtml.replace(
  '<script src="assets/js/data.js"></script>',
  '<script>\n' + dataJs + '\n</script>'
);
fs.writeFileSync('about.html', aboutHtml, 'utf8');

console.log('Successfully bundled self-contained HTML files!');
