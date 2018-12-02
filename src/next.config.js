const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withLess = require("@zeit/next-less");
const withTypescript = require("@zeit/next-typescript");
const withPlugins = require("next-compose-plugins");

if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = withPlugins(
  [
    withTypescript,
    withLess,
    [
      withBundleAnalyzer,
      {
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(
          process.env.BUNDLE_ANALYZE,
        ),
      },
    ],
  ],
  {
    distDir: "../.next",
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
  },
);
