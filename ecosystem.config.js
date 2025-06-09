module.exports = {
  apps: [
    {
      name: 'saf-original',
      script: './.output/server/index.mjs',
      instances: 1,
      exec_mode: 'fork',
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
      kill_timeout: 5000,
      // Restart settings
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      // Process management
      wait_ready: true,
      listen_timeout: 8000,
      // Performance monitoring
      pmx: false,
      // Merge logs
      merge_logs: true
    }
  ]
};