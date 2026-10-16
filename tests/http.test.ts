import { request } from '../src/lib/http';

describe('HTTP client', () => {
  beforeEach(() => { global.fetch = jest.fn(); });

  it('returns parsed JSON for successful responses', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => ({ id: 'ok' }) });
    await expect(request<{ id: string }>('/health')).resolves.toEqual({ id: 'ok' });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/health'), expect.objectContaining({ headers: { Accept: 'application/json' } }));
  });

  it('normalizes HTTP failures without exposing backend content', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 429 });
    await expect(request('/private')).rejects.toEqual(expect.objectContaining({ status: 429, message: 'Não foi possível concluir esta ação.' }));
  });

  it('normalizes network failures', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('socket failed'));
    await expect(request('/private')).rejects.toEqual(expect.objectContaining({ message: 'Verifique sua conexão e tente novamente.' }));
  });
});
