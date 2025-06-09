module.exports = {
  apps: [
    {
      name: 'saf-original',
      script: './.output/server/index.mjs',
      instances: 1, // Untuk docker, gunakan 1 instance per container
      exec_mode: 'fork', // Fork mode untuk single instance
      env: {
        NODE_ENV: 'production',
        NITRO_PORT: 3001,
        NITRO_HOST: '0.0.0.0'
      },
      // Logging
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      // Auto restart
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // Graceful shutdown
      kill_timeout: 5000
    }
  ]
};