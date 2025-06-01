import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.typogame.app',
  appName: 'Chinese Typo Game',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
