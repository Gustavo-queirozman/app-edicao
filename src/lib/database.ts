import * as SQLite from 'expo-sqlite';

export type LocalCreation = { id: string; effectId: string; effectName: string; sourceUri?: string; resultUri?: string; status: string; createdAt: number; exportedAt?: number };
let db: SQLite.SQLiteDatabase | null = null;

async function database() {
  if (!db) { db = await SQLite.openDatabaseAsync('lume.db'); await db.execAsync(`PRAGMA journal_mode = WAL; CREATE TABLE IF NOT EXISTS creations (id TEXT PRIMARY KEY, effect_id TEXT NOT NULL, effect_name TEXT NOT NULL, source_uri TEXT, result_uri TEXT, status TEXT NOT NULL, created_at INTEGER NOT NULL, exported_at INTEGER); CREATE TABLE IF NOT EXISTS favorites (effect_id TEXT PRIMARY KEY, created_at INTEGER NOT NULL);`); }
  return db;
}
export async function saveCreation(value: LocalCreation) { const d = await database(); await d.runAsync('INSERT OR REPLACE INTO creations (id,effect_id,effect_name,source_uri,result_uri,status,created_at,exported_at) VALUES (?,?,?,?,?,?,?,?)', value.id, value.effectId, value.effectName, value.sourceUri ?? null, value.resultUri ?? null, value.status, value.createdAt, value.exportedAt ?? null); }
export async function listCreations() { const d = await database(); return d.getAllAsync<LocalCreation>('SELECT id, effect_id as effectId, effect_name as effectName, source_uri as sourceUri, result_uri as resultUri, status, created_at as createdAt, exported_at as exportedAt FROM creations ORDER BY created_at DESC'); }
export async function deleteCreation(id: string) { const d = await database(); await d.runAsync('DELETE FROM creations WHERE id = ?', id); }
export async function favoriteIds() { const d = await database(); const rows = await d.getAllAsync<{ effect_id: string }>('SELECT effect_id FROM favorites'); return rows.map(row => row.effect_id); }
export async function toggleFavorite(effectId: string) { const d = await database(); const found = await d.getFirstAsync('SELECT effect_id FROM favorites WHERE effect_id = ?', effectId); if (found) await d.runAsync('DELETE FROM favorites WHERE effect_id = ?', effectId); else await d.runAsync('INSERT INTO favorites (effect_id,created_at) VALUES (?,?)', effectId, Date.now()); return !found; }
