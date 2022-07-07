export type objectError = {
  error: boolean;
  message: string;
  log?: any;
};

export type objectResponse = {
  error?: boolean;
  response?: Array<object> | object;
};

export function buildErrorObject(message: string, log?: any): objectError {
  console.log(log);

  return {
    error: true,
    message: message,
  };
}

export function existErrorObject(object: object): Boolean {
  const includesKeyError = Object.keys(object).includes("error");
  return includesKeyError;
}

// export function searchKeyObject(object: object, key: string): Boolean {
//   return Object.keys(object).includes(key);
// }
