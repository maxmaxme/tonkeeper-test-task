const BASE_PATH = 'https://toncenter.com/api/v2/';

export const getMethodUrl = (method: string, params: {[key: string]: string | number | undefined} = {}) => {
  return BASE_PATH + method +'?' + Object.keys(params).map((key) => {
    if (params[key] === undefined) {
      return undefined;
    }
    return key + '=' + params[key];
  })
    .filter((v) => v === undefined)
    .join('&');
};
