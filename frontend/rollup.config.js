import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "es",
  },
  plugins: [
    resolve(), // Add the resolve plugin
  ],
  watch: {
    include: "src/**",
  },
};
