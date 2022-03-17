import {} from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    user: { id: number; email: string; isAdmin: boolean } | undefined;
  }
}
