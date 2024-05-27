import { defineConfig } from "unocss";

export default defineConfig({
  rules: [["b-shadow-1", { "box-shadow": "0px 4px 10px 0px #e7eaf0" }]],
  shortcuts: [["card", "p-20px my-10px border-rd-6px b-shadow-1"]],
});
