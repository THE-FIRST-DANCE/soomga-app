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
            /* assets 디렉토리 */
            "@assets/*": "./src/assets/*",
            /* components 전체 디렉토리 */
            "@components/*": "./src/components/*",
            /* main 디렉토리 */
            "@main/*": "./src/components/main/*",
            "@recommendMain/*": "./src/components/main/recommend/*",
            "@guideMain/*": "./src/components/main/recommend/Guide/*",
            "@placeMain/*": "./src/components/main/recommend/Place/*",
            "@regionMain/*": "./src/components/main/recommend/Region/*",
            "@scheduleMain/*": "./src/components/main/Schedule/*",
            /* profile 디렉토리 */
            "@profile/*": "./src/components/profile/*",
            "@login/*": "./src/components/profile/LogIn/*",
            "@signIn/*": "./src/components/profile/SignIn/*",
            /* data 디렉토리 */
            "@data/*": "./src/data/*",
            /* navigation 디렉토리 */
            "@navigation/*": "./src/navigation/*",
            /* stacks 디렉토리 */
            "@stacks/*": "./src/stacks",
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
