import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.280836e6a5ab4c7ba29fd1096285bf3c',
  appName: 'sai-sportspark-ai',
  webDir: 'dist',
  server: {
    url: 'https://280836e6-a5ab-4c7b-a29f-d1096285bf3c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;