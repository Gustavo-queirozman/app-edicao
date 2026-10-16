const mockStorage = new Map<string, string>();
jest.mock('expo-secure-store', () => ({
  WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'device',
  getItemAsync: jest.fn((key: string) => Promise.resolve(mockStorage.get(key) ?? null)),
  setItemAsync: jest.fn((key: string, value: string) => { mockStorage.set(key, value); return Promise.resolve(); }),
  deleteItemAsync: jest.fn((key: string) => { mockStorage.delete(key); return Promise.resolve(); }),
}));
jest.mock('../src/lib/http', () => ({ request: jest.fn() }));

import { request } from '../src/lib/http';
import { clearSession, freshToken, loadSession, saveSession, Session } from '../src/lib/session';

const session: Session = { accessToken: 'a', refreshToken: 'r', expiresAt: Date.now() + 60_000, user: { id: 'u', email: 'u@example.com' } };
describe('secure session', () => {
  beforeEach(() => { mockStorage.clear(); jest.clearAllMocks(); });
  it('persists credentials only through SecureStore', async () => { await saveSession(session); await expect(loadSession()).resolves.toEqual(session); });
  it('removes credentials on logout', async () => { await saveSession(session); await clearSession(); await expect(loadSession()).resolves.toBeNull(); });
  it('refreshes an expired token and persists the replacement', async () => { const replacement = { ...session, accessToken: 'new', expiresAt: Date.now() + 60_000 }; (request as jest.Mock).mockResolvedValue(replacement); await expect(freshToken({ ...session, expiresAt: 0 })).resolves.toEqual(replacement); expect(request).toHaveBeenCalledWith('/auth/refresh', expect.objectContaining({ method: 'POST' })); });
});
