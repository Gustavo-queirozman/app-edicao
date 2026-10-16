import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button } from './src/components/ui';
import { Credits, Photos, Profile } from './src/screens';
import { Explore, Home } from './src/discovery';
import { Effect } from './src/lib/catalog';
import { colors, spacing } from './src/theme';
import { AuthScreen } from './src/components/auth';
import { Composer } from './src/components/composer';
import { clearSession, loadSession, Session } from './src/lib/session';
import { config } from './src/lib/config';

type Tab = 'Início' | 'Explorar' | 'Minhas fotos' | 'Créditos' | 'Perfil';
const tabs: { name: Tab; icon: keyof typeof Ionicons.glyphMap }[] = [
  { name: 'Início', icon: 'home-outline' }, { name: 'Explorar', icon: 'compass-outline' }, { name: 'Minhas fotos', icon: 'images-outline' }, { name: 'Créditos', icon: 'wallet-outline' }, { name: 'Perfil', icon: 'person-outline' },
];
const developmentSession: Session = { accessToken: 'demo', refreshToken: 'demo', expiresAt: Number.MAX_SAFE_INTEGER, user: { id: 'demo', email: 'demo@lume.app', name: 'Demonstração' } };

export default function App() {
  const [ready, setReady] = useState(false); const [tab, setTab] = useState<Tab>('Início'); const [session, setSession] = useState<Session | null>(null); const [creating, setCreating] = useState(false); const [categoryId, setCategoryId] = useState<string | null>(null); const [effect, setEffect] = useState<Effect | null>(null);
  useEffect(() => { loadSession().then(storedSession => { setSession(storedSession ?? (config.environment === 'development' ? developmentSession : null)); setReady(true); }); }, []);
  const openExplore = () => { setCategoryId(null); setEffect(null); setTab('Explorar'); };
  const openCategory = (id: string) => { setCategoryId(id); setEffect(null); setTab('Explorar'); };
  const openEffect = (selected: Effect) => { setCategoryId(selected.categoryId); setEffect(selected); setTab('Explorar'); };
  const beginEdit = (selected: Effect) => { setEffect(selected); setCreating(true); };
  const logout = async () => { await clearSession(); setSession(null); };
  if (!ready) return null;
  if (!session) return <SafeAreaProvider><AuthScreen onSession={setSession} /></SafeAreaProvider>;
  if (creating && effect) return <SafeAreaProvider><SafeAreaView style={styles.app} edges={['top']}><StatusBar barStyle="dark-content" /><Composer session={session} effect={effect} onDone={() => { setCreating(false); setTab('Minhas fotos'); }} /></SafeAreaView></SafeAreaProvider>;
  const screen = tab === 'Início' ? <Home openExplore={openExplore} openCategory={openCategory} openEffect={openEffect} /> : tab === 'Explorar' ? <Explore categoryId={categoryId} initialEffect={effect} onSelectEffect={beginEdit} /> : tab === 'Minhas fotos' ? <Photos beginEdit={openExplore} /> : tab === 'Créditos' ? <Credits /> : <Profile email={session.user.email} onLogout={logout} />;
  return <SafeAreaProvider><SafeAreaView style={styles.app} edges={['top']}><StatusBar barStyle="dark-content" /><View style={styles.content}>{screen}</View><View style={styles.tabbar}>{tabs.map(item => <Pressable key={item.name} accessibilityRole="tab" accessibilityState={{ selected: tab === item.name }} onPress={() => setTab(item.name)} style={styles.tab}><Ionicons name={tab === item.name ? item.icon.replace('-outline', '') as keyof typeof Ionicons.glyphMap : item.icon} size={22} color={tab === item.name ? colors.primary : colors.muted} /><Text numberOfLines={1} style={[styles.tabText, tab === item.name && styles.tabTextActive]}>{item.name}</Text></Pressable>)}</View></SafeAreaView></SafeAreaProvider>;
}

const styles = StyleSheet.create({ app: { flex: 1, backgroundColor: colors.canvas }, content: { flex: 1 }, tabbar: { backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.line, flexDirection: 'row', paddingTop: 12, paddingBottom: 20, paddingHorizontal: 5, shadowColor: '#2B1C16', shadowOpacity: .07, shadowRadius: 14, shadowOffset: { width: 0, height: -4 }, elevation: 8 }, tab: { flex: 1, alignItems: 'center', gap: 5, minHeight: 41 }, tabText: { fontSize: 10, color: colors.muted, fontWeight: '600' }, tabTextActive: { color: colors.primary, fontWeight: '900' } });
