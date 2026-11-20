import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./pruebas-web',
  timeout:90000,
  expect:{timeout:15000},
  use:{baseURL:process.env['APP_URL'] || 'http://localhost:4200',browserName:'chromium'}
});
