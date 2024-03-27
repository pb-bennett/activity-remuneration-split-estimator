import resolve from "rollup-plugin-node-resolve";

export default {
  input: "frontend/src/index.js",
  output: [
    {
      file: "server/public/bundle.js",
      format: "es",
    },
  ],
  plugins: [
    resolve(), // Add the resolve plugin
  ],
  watch: {
    include: "frontend/src/**",
  },
};
