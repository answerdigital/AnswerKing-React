const defaultHeaders: HeadersInit = { 'Content-Type': 'application/json', };

const BASE_URL = '/api';

const get = (url: string, headers?: HeadersInit): Promise<Response> => {
  return fetch(BASE_URL + url, {
    method: 'GET',
    headers: { ...defaultHeaders, ...(headers ?? {}) },
  });
};

const remove = (url: string, headers?: HeadersInit): Promise<Response> => {
  return fetch(BASE_URL + url, {
    method: 'DELETE',
    headers: { ...defaultHeaders, ...(headers ?? {}) },
  });
};

const post = <T>(url: string, body: T, headers?: HeadersInit): Promise<Response> => {
  return fetch(BASE_URL + url, {
    method: 'POST',
    headers: { ...defaultHeaders, ...(headers ?? {}) },
    body: JSON.stringify(body),
  });
};

const put = <T>(url: string, body: T, headers?: HeadersInit): Promise<Response> => {
  return fetch(BASE_URL + url, {
    method: 'PUT',
    headers: { ...defaultHeaders, ...(headers ?? {}) },
    body: JSON.stringify(body),
  });
};

export const httpClient = {
  get,
  remove,
  post,
  put,
};
