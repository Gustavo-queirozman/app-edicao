import * as SecureStore from 'expo-secure-store';
import { request } from './http';

const KEY = 'lume.session.v1';
export type Session = { accessToken: string; refreshToken: string; expiresAt: number; user: { id: string; email: string; name?: string } };

export async function loadSession() { const raw = await SecureStore.getItemAsync(KEY); return raw ? JSON.parse(raw) as Session : null; }
export async function saveSession(session: Session) { await SecureStore.setItemAsync(KEY, JSON.stringify(session), { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }); }
export async function clearSession() { await SecureStore.deleteItemAsync(KEY); }

export async function authenticate(email: string, password: string, mode: 'login' | 'signup') {
  const session = await request<Session>(mode === 'login' ? '/auth/login' : '/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
  await saveSession(session); return session;
}

export async function freshToken(session: Session): Promise<Session> {
  if (session.expiresAt > Date.now() + 30_000) return session;
  const next = await request<Session>('/auth/refresh', { method: 'POST', headers: { Authorization: `Bearer ${session.refreshToken}` } });
  await saveSession(next); return next;
}
