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

function compile(input) {
  const lines = input.split("\n");
  const result = [];

  let withinList = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    //末尾句読点は問答無用で段落化
    if (line.match("。$")) {
      result.push(`\n${line}\n`);
      continue;
    }

    if (line.trim().length === 0) {
      result.push("");
      withinList = false;
      continue;
    }

    let nextLine = null;
    if (i + 1 < lines.length) {
      nextLine = lines[i + 1];
    }

    //次の行が空行でなければリスト開始
    if (nextLine && nextLine.length > 0) {
      withinList = true;
    }

    if (withinList) {
      result.push(`- ${line}`);

      if (nextLine && nextLine.trim() === "") {
        withinList = false;
      }
      continue;
    }

    if (line.trim().length > 0) {
      result.push(`# ${line}`);
    }
  }
  return result.join("\n");
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
html, body{
  height: 100%;
}
body{
  margin: 0;
}
.whole{
  height: 100%;
  display: flex;
}
textarea{
  flex: 1;
  padding: 1em;
  font-size: 20px;
}

textarea.input{
  background: #333;
  color: white;
}
.output{
  flex: 1;
  padding: 1em;
}
</style>
