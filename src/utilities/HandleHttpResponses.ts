export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  return response.json();
}

export function handleDeleteResponse(response: Response): Promise<void> {
  if (!response.ok) {
    return Promise.reject();
  }
  return Promise.resolve();
}
