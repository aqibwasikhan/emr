export type AuditLog = {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
  date: string; // ISO string format
  role: {
    id: number;
    name: string;
    variant: 'pink' | 'green' | 'blue' | 'orange' | 'purple'; // Badge variant
  };
  activity: 'Created' | 'Viewed' | 'Edited' | 'Deleted' | 'Logged In'; // or string if dynamic
  description: string;
  facility: string;
  platform: 'EMR Web App' | 'EMR iPad App' | string;
  module: string;
};
