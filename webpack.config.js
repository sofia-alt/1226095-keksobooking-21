const path = require("path");

module.exports = {
  entry: [
    "./js/debounce.js",
    "./js/backend.js",
    "./js/filter.js",
    "./js/pin.js",
    "./js/utils.js",
    "./js/form.js",
    "./js/photos.js",
    "./js/map.js",
    "./js/move.js",
    "./js/card.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
