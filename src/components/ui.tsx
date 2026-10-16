import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

export function Button({ label, onPress, tone = 'primary', disabled = false }: { label: string; onPress?: () => void; tone?: 'primary' | 'ghost'; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} onPress={onPress} style={[styles.button, tone === 'ghost' && styles.ghost, disabled && styles.disabled]}>
    <Text style={[styles.buttonText, tone === 'ghost' && styles.ghostText]}>{label}</Text>
  </Pressable>;
}

export function Card({ children, style }: { children: ReactNode; style?: object }) { return <View style={[styles.card, style]}>{children}</View>; }

export function LoadingState({ label = 'Preparando seu espaço...' }: { label?: string }) {
  return <View style={styles.state}><ActivityIndicator color={colors.primary} size="large" /><Text style={styles.stateText}>{label}</Text></View>;
}

export function EmptyState({ icon = '✦', title, description, action }: { icon?: string; title: string; description: string; action?: ReactNode }) {
  return <View style={styles.state}><Text style={styles.emptyIcon}>{icon}</Text><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.stateText}>{description}</Text>{action}</View>;
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) { return <EmptyState icon="!" title="Algo saiu do foco" description="Não conseguimos carregar esta parte agora." action={<Button label="Tentar novamente" tone="ghost" onPress={onRetry} />} />; }

const styles = StyleSheet.create({
  button: { backgroundColor: colors.primary, minHeight: 52, paddingHorizontal: spacing.lg, alignItems: 'center', justifyContent: 'center', borderRadius: radius.pill },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 16 }, ghost: { backgroundColor: colors.soft }, ghostText: { color: colors.ink }, disabled: { opacity: .5 },
  card: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: radius.md, shadowColor: colors.shadow, shadowOpacity: 1, shadowRadius: 20, shadowOffset: { width: 0, height: 6 }, elevation: 2 },
  state: { flex: 1, minHeight: 280, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  stateText: { color: colors.muted, textAlign: 'center', lineHeight: 21, fontSize: 15 }, emptyIcon: { color: colors.primary, fontSize: 40, fontWeight: '800' }, emptyTitle: { color: colors.ink, fontSize: 21, fontWeight: '800' },
});
