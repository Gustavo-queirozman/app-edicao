const mockCache = new Map<string, string>();
jest.mock('@react-native-async-storage/async-storage', () => ({ getItem: jest.fn((key: string) => Promise.resolve(mockCache.get(key) ?? null)), setItem: jest.fn((key: string, value: string) => { mockCache.set(key, value); return Promise.resolve(); }) }));
jest.mock('../src/lib/http', () => ({ request: jest.fn() }));
import { request } from '../src/lib/http';
import { demoCategories, demoEffects, getCategories, getEffects } from '../src/lib/catalog';
import { commandCategories, commandEffects } from '../src/lib/commandCatalog';
import { effectPromptCommand } from '../src/lib/generations';

describe('catalog cache and discovery', () => {
  beforeEach(() => { mockCache.clear(); jest.clearAllMocks(); });
  it('uses remote categories and stores a cache', async () => { (request as jest.Mock).mockResolvedValue([{ id: 'portrait', name: 'Retratos', coverUrl: 'https://cdn/c.jpg' }]); await expect(getCategories()).resolves.toHaveLength(1); });
  it('filters effects by name and tag', async () => { (request as jest.Mock).mockResolvedValue({ items: [{ id: '1', name: 'Editorial', description: '', categoryId: 'portrait', tags: ['rosto'], costCredits: 1, inputCount: 1, quality: [], exampleUrls: [] }] }); await expect(getEffects({ q: 'rosto' })).resolves.toMatchObject({ items: [{ id: '1' }] }); });
  it('falls back to cached catalog while offline', async () => { mockCache.set('catalog.categories.v1', JSON.stringify({ savedAt: Date.now(), value: [{ id: 'c', name: 'Cache', coverUrl: '' }] })); (request as jest.Mock).mockRejectedValue(new Error('offline')); await expect(getCategories()).resolves.toMatchObject([{ name: 'Cache' }]); });
  it('includes all supplied commands in ten distinct categories', () => {
    expect(commandCategories).toHaveLength(10);
    expect(commandEffects).toHaveLength(100);
    expect(new Set(commandEffects.map(effect => effect.id)).size).toBe(100);
    expect(commandEffects.every(effect => effect.tags.includes(`/${effect.id}`) && commandCategories.some(category => category.id === effect.categoryId))).toBe(true);
    expect(demoCategories).toHaveLength(10);
    expect(demoEffects).toHaveLength(100);
    expect(new Set(demoEffects.map(effect => effect.id)).size).toBe(demoEffects.length);
  });

  it('does not include the generic categories removed from Explore', () => {
    const removed = ['retratos', 'beleza', 'moda', 'viagem', 'paisagens', 'natureza', 'pets', 'familia', 'casamento', 'gastronomia', 'arquitetura', 'interiores', 'produtos', 'esportes', 'noite', 'vintage', 'arte', 'rede sociais'];
    const categoryNames = demoCategories.map(category => category.name.toLocaleLowerCase('pt-BR'));
    expect(removed.some(name => categoryNames.includes(name))).toBe(false);
  });

  it('prepares the hidden command for the generation request', () => {
    const paparazzi = commandEffects.find(effect => effect.id === 'paparazzi');
    expect(paparazzi).toBeDefined();
    expect(effectPromptCommand(paparazzi!)).toBe('/paparazzi');
    expect(effectPromptCommand({ id: 'cinematic' })).toBe('/cinematic');
  });
});
