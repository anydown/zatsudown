<template>
  <div class="whole">
    <textarea class="input" v-model="input"></textarea>
    <textarea v-model="md"></textarea>
    <div class="output" v-html="output"></div>
  </div>
</template>
<script>
import MarkdownIt from "markdown-it";
import { compile } from "./compiler";

const md = new MarkdownIt();

const initial = `次に空行が来ると見出しになる

句読点で終わると段落になる。
改行も展開されるよ。

連続する行は
リストに
なるよ
　行頭全角スペースは入れ子になる

そんな感じです`;

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
  overflow-y: scroll;
}
</style>
