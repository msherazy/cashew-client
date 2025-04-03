import { type router } from '@/providers';
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    userData?: {
      email: string;
      phoneNumber: string;
    };
  }
}
