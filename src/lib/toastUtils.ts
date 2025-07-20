import { toast } from 'sonner';

// A generic error handling function to show toast notifications
export function showError(message: string) {
  toast.error(message || 'Something went wrong. Please try again.');
}
