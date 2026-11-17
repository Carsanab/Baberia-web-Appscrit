const fs = require('fs');
const path = require('path');

// Carga manual del archivo .env si existe en local
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val.length) process.env[key.trim()] = val.join('=').trim();
  });
}

const scriptUrl = process.env.APPS_SCRIPT_URL;
if (!scriptUrl) {
  console.error('❌ Error: Falta la variable de entorno APPS_SCRIPT_URL');
  process.exit(1);
}

const html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8')
  .replace('__APPS_SCRIPT_URL__', scriptUrl);

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

fs.writeFileSync(path.join(distDir, 'index.html'), html);
console.log('✅ Build completado en dist/index.html');