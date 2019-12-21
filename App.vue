<template>
  <div class="whole">
    <textarea class="input" v-model="input"></textarea>
    <textarea v-model="md"></textarea>
    <div class="output" v-html="output"></div>
  </div>
</template>
<script>
var MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();

const initial = `次に空行が来ると見出しになる

句読点で終わると段落になる。

連続する行は
リストに
なるよ

そんな感じです

`;

function compileParagraph(block) {
  return block
    .split("\n")
    .map(l => `${l}  `)
    .join("\n");
}
function compileList(block) {
  return block
    .split("\n")
    .map(l => `- ${l}`)
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

function compile(input) {
  const blocks = input.replace(/\n\n+/g, "\n\n").split("\n\n");
  return blocks
    .map(b => b.trim())
    .map(compileBlock)
    .join("\n\n");
}

export default {
  data() {
    return {
      input: initial
    };
  },
  computed: {
    output() {
      return md.render(compile(this.input));
    },
    md() {
      return compile(this.input);
    }
  }
};
</script>

<style lang="stylus">
html, body {
  height: 100%;
}

body {
  margin: 0;
}

.whole {
  height: 100%;
  display: flex;
}

textarea {
  flex: 1;
  padding: 1em;
  font-size: 20px;
}

textarea.input {
  background: #333;
  color: white;
}

.output {
  flex: 1;
  padding: 1em;
}
</style>
