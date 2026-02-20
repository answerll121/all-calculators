const fs = require('fs');
const path = 'src/i18n.js';
console.log(`Reading ${path}...`);
let content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');
let newLines = [];
let indent = 0;

for (let line of lines) {
    let trimmed = line.trim();
    if (!trimmed) {
        newLines.push('');
        continue;
    }

    // Check for closing braces at the START of the line to decrease indent
    // matching }, ], ); etc.
    if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
        indent = Math.max(0, indent - 1);
    }

    newLines.push('    '.repeat(indent) + trimmed);

    // Check for opening braces at the END of the line to increase indent
    // matching {, [, (
    if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
        indent++;
    }
}

fs.writeFileSync(path, newLines.join('\n'));
console.log("Normalized indentation.");
