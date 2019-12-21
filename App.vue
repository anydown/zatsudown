<template>
  <div class="whole">
    <textarea class="input" v-model="input"></textarea>
    <textarea v-model="md"></textarea>
    <div class="output" v-html="output"></div>
  </div>
</template>
<script>
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const initial = `次に空行が来ると見出しになる

句読点で終わると段落になる。
改行も展開されるよ。

連続する行は
リストに
なるよ

そんな感じです`;

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

@media screen and (max-width: 800px) {
  .whole {
    flex-direction: column;
  }
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
