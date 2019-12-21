function compileListItem(line) {
  const m = line.replace(/[\t　]/g, "  ").match(/^( *)(.*)/);
  return `${m[1]}- ${m[2]}`;
}

function compileParagraph(block) {
  return block
    .split("\n")
    .join("  \n")
    .trim();
}
function compileList(block) {
  return block
    .split("\n")
    .map(compileListItem)
    .join("\n");
}
function compileHeading(block) {
  return `# ${block}`;
}

function compileBlock(block) {
  if (block.match("[。.]$")) {
    return compileParagraph(block);
  }
  if (block.indexOf("\n") >= 0) {
    return compileList(block);
  }
  return compileHeading(block);
}

export function compile(input) {
  const blocks = input.replace(/\n\n+/g, "\n\n").split("\n\n");
  return blocks
    .map(b => b.trim())
    .map(compileBlock)
    .join("\n\n");
}
