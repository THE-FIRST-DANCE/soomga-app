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
            /* api 디렉토리 */
            "@api/*": "./src/api/*",
            /* assets 디렉토리 */
            "@assets/*": "./src/assets/*",
            /* components 전체 디렉토리 */
            "@components/*": "./src/components/*",
            /* components/main 디렉토리 */
            "@main/*": "./src/components/main/*",
            "@recommendMain/*": "./src/components/main/recommend/*",
            "@guideMain/*": "./src/components/main/recommend/Guide/*",
            "@placeMain/*": "./src/components/main/recommend/Place/*",
            "@regionMain/*": "./src/components/main/recommend/Region/*",
            "@scheduleMain/*": "./src/components/main/Schedule/*",
            /* data 디렉토리 */
            "@data/*": "./src/data/*",
            /* hooks 디렉토리 */
            "@hooks/*": "./src/hooks/*",
            /* interface 디렉토리 */
            "@interface/*": "./src/interface/*",
            /* modules 디렉토리 */
            "@modules/*": "./src/modules/*",
            /* navigation 디렉토리 */
            "@navigation/*": "./src/navigation/*",
            /* Screens 디렉토리 */
            "@screens/*": "./src/screens/*",
            /* stacks 디렉토리 */
            "@stacks/*": "./src/stacks/*",
            /* state 디렉토리 */
            "@state/*": "./src/state/*",
            /* profile 디렉토리 */
            "@profile/*": "./src/components/profile/*",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
