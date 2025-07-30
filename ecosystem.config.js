// ecosystem.config.mjs
export default {
  apps: [
    {
      name: 'saf-original',
      script: './.output/server/index.mjs',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        NITRO_PORT: 3001,
        NITRO_HOST: '0.0.0.0',
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      kill_timeout: 5000,
    },
  ],
};
