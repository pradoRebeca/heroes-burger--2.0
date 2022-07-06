export type objectError = {
  error: string;
  status?: number;
  log?: any
};

export function buildErrorObject(message: string, log?: any): objectError {
  console.log(log)
  return {
    error: message,
    status: 400,
  };
}

export function existErrorObject(object: object): Boolean{
  const includesKeyError = Object.keys(object).includes("error");
  return includesKeyError;
}
