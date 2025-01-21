module.exports = {
  apps: [
    {
      name: "tapagro_website",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
