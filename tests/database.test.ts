const mockRunAsync = jest.fn(); const mockGetAllAsync = jest.fn(); const mockGetFirstAsync = jest.fn();
jest.mock('expo-sqlite', () => ({ openDatabaseAsync: jest.fn(async () => ({ execAsync: jest.fn(), runAsync: mockRunAsync, getAllAsync: mockGetAllAsync, getFirstAsync: mockGetFirstAsync })) }));
import { deleteCreation, favoriteIds, listCreations, saveCreation, toggleFavorite } from '../src/lib/database';

describe('local SQLite history', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  it('writes only local creation metadata and paths', async () => { await saveCreation({ id: 'g1', effectId: 'effect', effectName: 'Effect', status: 'completed', createdAt: 1, resultUri: 'file:///private.jpg' }); expect(mockRunAsync).toHaveBeenCalledWith(expect.stringContaining('INSERT OR REPLACE'), 'g1', 'effect', 'Effect', null, 'file:///private.jpg', 'completed', 1, null); });
  it('lists and deletes local history', async () => { mockGetAllAsync.mockResolvedValue([{ id: 'g1' }]); await expect(listCreations()).resolves.toEqual([{ id: 'g1' }]); await deleteCreation('g1'); expect(mockRunAsync).toHaveBeenCalledWith('DELETE FROM creations WHERE id = ?', 'g1'); });
  it('toggles favorites without a network call', async () => { mockGetFirstAsync.mockResolvedValue(null); await expect(toggleFavorite('effect')).resolves.toBe(true); mockGetAllAsync.mockResolvedValue([{ effect_id: 'effect' }]); await expect(favoriteIds()).resolves.toEqual(['effect']); });
});
