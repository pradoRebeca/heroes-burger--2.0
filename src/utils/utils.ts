export type objectError = {
  error?: boolean;
  message: string;
  log?: any;
};

export type objectResponse = {
  error?: boolean;
  response: Array<object> | object | string;
};

export function buildErrorObject(message: string, log?: any): objectError {
  console.log(log);

  return {
    error: true,
    message: message,
  };
}

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
