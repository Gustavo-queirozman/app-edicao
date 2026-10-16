import { config } from './config';

export class ApiError extends Error {
  constructor(message: string, public readonly status?: number) { super(message); }
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${config.apiUrl}${path}`, {
      ...options,
      headers: { Accept: 'application/json', ...options.headers },
    });
    if (!response.ok) throw new ApiError('Não foi possível concluir esta ação.', response.status);
    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Verifique sua conexão e tente novamente.');
  }
}
