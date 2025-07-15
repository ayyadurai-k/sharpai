module.exports = {
  apps: [
    {
      name: "Sharp_ResumeBuild_AI-Backend",
      script: "./index.js",
      instances: 1,
      exec_mode: "fork",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true, 
      out_file: "./logs/pm2/out.log", 
      error_file: "./logs/pm2/error.log",
      watch: true,
      ignore_watch: [
        "logs/*",
        "public/upload/*",
        "public/*",
        "node_modules",
        ".git",
        "tmp",
      ],
      autorestart: true,
      max_memory_restart: "1G", 
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
