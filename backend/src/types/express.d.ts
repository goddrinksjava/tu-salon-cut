declare namespace Express {
  export interface Request {
    user: { id: number; email: string; isAdmin: boolean } | undefined;
  }
}
