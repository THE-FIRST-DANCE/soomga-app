module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@/*": "./src/*",
            "@components/*": "./src/components/*",
            "@main/*": "./src/components/main/*",
            "@recommend/*": "./src/components/main/recommend/*",
            "@schedule/*": "./src/components/main/Schedule/*",
            "@profile/*": "./src/components/profile/*",
            "@navigation/*": "./src/navigation/*",
          },
        },
      ],
    ],
  };
};
