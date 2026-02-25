const fs = require('fs');

let content = fs.readFileSync('src/components/calculators/finance/CompoundInterestCalculator.jsx', 'utf-8');

const importStatement = `import CalculatorInfo from '../../CalculatorInfo';\n`;

const importRegex = /^import\s+.*?;?/gm;
let match;
let lastImportIndex = 0;
while ((match = importRegex.exec(content)) !== null) {
    lastImportIndex = match.index + match[0].length;
}

if (lastImportIndex > 0) {
    content = content.slice(0, lastImportIndex) + '\n' + importStatement + content.slice(lastImportIndex);
}

fs.writeFileSync('test_inject.jsx', content, 'utf-8');
console.log('done');
