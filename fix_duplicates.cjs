const fs = require('fs');
let c = fs.readFileSync('src/i18n.js', 'utf8');
c = c.replace(/("label_diff_seconds":\s*"[^"]+",)(\s*"label_diff_seconds":\s*"[^"]+",)+/g, '$1');
fs.writeFileSync('src/i18n.js', c);
console.log('Fixed duplicates in i18n.js');
