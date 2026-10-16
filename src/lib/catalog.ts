import AsyncStorage from '@react-native-async-storage/async-storage';
import { request } from './http';
import { commandCategories, commandEffects } from './commandCatalog';

export type Category = { id: string; name: string; coverUrl: string; coverAsset?: number; icon?: string; tint?: string; description?: string };
export type Effect = { id: string; name: string; description: string; categoryId: string; tags: string[]; promptCommand?: string; costCredits: number; inputCount: number; quality: string[]; coverUrl?: string; exampleUrls: string[] };
type Cached<T> = { savedAt: number; value: T };

// Dados de demonstração locais; a API substitui este catálogo quando estiver disponível.
export const demoCategories: Category[] = commandCategories;
export const demoEffects: Effect[] = commandEffects;

async function cached<T>(key: string, load: () => Promise<T>, fallback: T): Promise<T> {
  try {
    const response = await load();
    await AsyncStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), value: response } satisfies Cached<T>));
    return response;
  } catch {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Cached<T>).value : fallback;
  }
}

export const getCategories = () => cached('catalog.categories.v1', () => request<Category[]>('/catalog/categories'), demoCategories);
export async function getEffects(params: { q?: string; categoryId?: string; cursor?: string } = {}) {
  const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value).map(([key, value]) => [key, value!]));
  const data = await cached('catalog.effects.v1', () => request<{ items: Effect[]; nextCursor?: string }>(`/catalog/effects?${query}`), { items: demoEffects });
  return { ...data, items: data.items.filter(e => (!params.q || `${e.name} ${e.tags.join(' ')}`.toLowerCase().includes(params.q.toLowerCase())) && (!params.categoryId || e.categoryId === params.categoryId)) };
}
