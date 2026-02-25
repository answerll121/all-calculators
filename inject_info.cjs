const fs = require('fs');
const path = require('path');

function findFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (let file of list) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, files);
        } else if (filePath.endsWith('.jsx')) {
            files.push(filePath);
        }
    }
    return files;
}

const calculatorsDir = path.join(__dirname, 'src', 'components', 'calculators');
const files = findFiles(calculatorsDir);

let injectedCount = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Skip if already imported
    if (content.includes('CalculatorInfo')) {
        return;
    }

    // Find the relative path to src/components/CalculatorInfo
    const componentsDir = path.join(__dirname, 'src', 'components');
    let relativePath = path.relative(path.dirname(filePath), componentsDir).replace(/\\/g, '/');
    if (relativePath === '') relativePath = '.';
    const importStatement = `import CalculatorInfo from '${relativePath}/CalculatorInfo';\n`;

    // Add import after 'import React' or 'import { useTranslation }'
    const reactImportRegex = /^import\s+.*?['"]react['"].*?;?\s*$/m;
    const translationImportRegex = /^import\s+.*?['"]react-i18next['"].*?;?\s*$/m;

    let match = content.match(translationImportRegex) || content.match(reactImportRegex);
    if (match) {
        const insertPos = match.index + match[0].length;
        content = content.slice(0, insertPos) + '\n' + importStatement + content.slice(insertPos);
    } else {
        content = importStatement + content;
    }

    // Determine the calculator ID from filename
    const baseName = path.basename(filePath, '.jsx');
    let calcId = baseName.replace(/Calculator$/, '');
    calcId = calcId.charAt(0).toLowerCase() + calcId.slice(1);

    // Some special mappings based on names (e.g. Retirement401k -> 401k)
    if (calcId === 'retirement401k') calcId = '401k';
    if (calcId === 'keralaLotto') calcId = 'kerala';
    if (calcId === 'bMI') calcId = 'bmi';
    if (calcId === 'bMR') calcId = 'bmr';
    if (calcId === 'wHR') calcId = 'whr';
    if (calcId === 'tdee') calcId = 'tdee'; // already tdee but ok
    if (calcId === 'gPA') calcId = 'gpa';
    if (calcId === 'vAT') calcId = 'vat';

    // Inject before the last closing div/tag of the main return
    // Match the last </xxx> that precedes ); and eventually export default
    const injectRegex = /([\s\S]*?)(\n\s*<\/[a-zA-Z0-9_.-]+>\s*\n\s*\)\s*;\s*\n\s*(?:};\s*\n\s*)?export default)/;
    const injectMatch = content.match(injectRegex);

    if (injectMatch) {
        const remaining = content.substring(injectMatch.index + injectMatch[0].length);
        content = injectMatch[1] + `\n            <CalculatorInfo calculatorId="${calcId}" />` + injectMatch[2] + remaining;
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Injected into ${baseName} (id: ${calcId})`);
        injectedCount++;
    } else {
        console.warn(`Could not find injection point for ${baseName}`);
    }
});

console.log(`Successfully injected into ${injectedCount} calculators.`);
