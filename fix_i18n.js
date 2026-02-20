const fs = require('fs');
const path = 'src/i18n.js';
console.log(`Reading ${path}...`);
let content = fs.readFileSync(path, 'utf8');

// The file has stair-stepping indentation, and a syntax error in the middle.
// We look for the end of the English block and the start of the Korean block.

const anchor = '"label_closing_cost": "Est. Closing Costs (%)"';
const index = content.indexOf(anchor);

if (index === -1) {
    console.error("Anchor 'label_closing_cost' not found!");
    process.exit(1);
}

console.log("Anchor found at index", index);

// Get context after anchor
const context = content.substring(index + anchor.length, index + anchor.length + 200);
console.log("Context after anchor:", JSON.stringify(context));

// We expect something like: " \n    }\n    },\n    ko: {" (with variable whitespace)
// We want to replace the sequence that closes enTranslation and starts ko, 
// injecting "}; const resources = { en: { translation: enTranslation }, ko: {"

// Regex to match:
// 1. optional closing brace for the item (if not present in anchor line, but anchor includes quotes only)
// 2. closing brace for enTranslation object
// 3. extra closing brace and comma "},"
// 4. "ko: {"
//
// In the file view:
// 224: "label_closing_cost": "..."
// 225: }
// 226:     },
// 227: ko: {

// The regex should match: \s*}\s*},\s*ko:\s*{
const regex = /\s*\}\s*\}\,\s*ko:\s*\{/;
const replacement = '\n};\n\nconst resources = {\n    en: { translation: enTranslation },\n    ko: {';

if (regex.test(context)) {
    console.log("Regex match found!");
    const newContext = context.replace(regex, replacement);
    const finalContent = content.substring(0, index + anchor.length) + newContext + content.substring(index + anchor.length + context.length);
    // Wait, simpler replace on the whole rest string might be safer if context length varies?
    // Using simple replace on the substring from anchor end.

    // Construct new content carefully
    const afterAnchor = content.substring(index + anchor.length);
    const newAfterAnchor = afterAnchor.replace(regex, replacement);

    fs.writeFileSync(path, content.substring(0, index + anchor.length) + newAfterAnchor);
    console.log("File written successfully.");
} else {
    console.error("Regex did not match in context.");
    // Try to match partial?
    // Let's just output what we see to debug if it fails.
    process.exit(1);
}
