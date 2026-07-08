import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function AppHeader({ title, subtitle, showLogo, onScanPress, onBellPress }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.airtelRed} />
      <View style={styles.left}>
        {showLogo ? (
          <View style={styles.logoRow}>
            <MaterialCommunityIcons name="water" size={22} color={colors.white} style={styles.logoMark} />
            <Text style={styles.logoText}>airtel</Text>
            {subtitle ? <Text style={styles.logoSubtitle}>{subtitle}</Text> : null}
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        )}
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={onScanPress} style={styles.iconBtn}>
          <Ionicons name="scan-outline" size={22} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onBellPress} style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.airtelRed,
    paddingHorizontal: spacing.lg,
    // Extra bottom padding creates a buffer zone of plain red that the
    // Home screen's card is allowed to overlap into (negative marginTop),
    // so the overlap never eats into the logo/icons row above it.
    paddingBottom: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flexShrink: 1 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoMark: { marginRight: 4, transform: [{ rotate: '200deg' }] },
  logoText: { color: colors.white, fontSize: fontSizes.xl, fontWeight: '700' },
  logoSubtitle: { color: colors.white, fontSize: fontSizes.md, fontWeight: '400', marginLeft: spacing.xs },
  title: { color: colors.white, fontSize: fontSizes.xl, fontWeight: '700' },
  subtitle: { color: colors.white, fontSize: fontSizes.sm, marginTop: 2, opacity: 0.9 },
  right: { flexDirection: 'row' },
  iconBtn: { marginLeft: spacing.lg },
});