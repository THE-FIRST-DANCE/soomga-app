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
            /* src 전체 디렉토리 */
            "@/*": "./src/*",
            /* components 전체 디렉토리 */
            "@components/*": "./src/components/*",
            /* main 디렉토리 */
            "@main/*": "./src/components/main/*",
            "@recommendMain/*": "./src/components/main/recommend/*",
            "@scheduleMain/*": "./src/components/main/Schedule/*",
            "@guideMain/*": "./src/components/main/guide/*",
            /* profile 디렉토리 */
            "@profile/*": "./src/components/profile/*",
            /* navigation 디렉토리 */
            "@navigation/*": "./src/navigation/*",
          },
        },
      ],
    ],
  };
};
