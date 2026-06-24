import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontSizes, spacing, gradients } from '../theme/theme';
import { loadProfile, defaultProfile } from '../data/profileStore';

const menuItems = [
  { label: 'Airtel Prepaid Services', icon: <Ionicons name="aperture-outline" size={20} color={colors.blueIcon} />, expandable: true },
  { label: 'Airtel Money Services', icon: <MaterialCommunityIcons name="wallet-outline" size={20} color={colors.blueIcon} />, expandable: true },
  { label: 'Notification Inbox', icon: <Ionicons name="mail-outline" size={20} color={colors.blueIcon} /> },
  { label: 'Settings', icon: <Ionicons name="settings-outline" size={20} color={colors.blueIcon} />, route: 'Settings' },
  { label: 'Check Network Coverage', icon: <Ionicons name="radio-outline" size={20} color={colors.blueIcon} /> },
  { label: 'Airtel Shops', icon: <MaterialCommunityIcons name="storefront-outline" size={20} color={colors.blueIcon} /> },
  { label: 'Upgrade to Esim', icon: <Feather name="cpu" size={20} color={colors.blueIcon} /> },
  { label: 'Help & Support', icon: <Ionicons name="call-outline" size={20} color={colors.blueIcon} /> },
  { label: 'Refer & Earn', icon: <Ionicons name="megaphone-outline" size={20} color={colors.blueIcon} /> },
  { label: 'Terms & Conditions', icon: <Feather name="file-text" size={20} color={colors.blueIcon} /> },
  { label: 'SIM Registration Update', icon: <MaterialCommunityIcons name="sim-outline" size={20} color={colors.blueIcon} /> },
  { label: 'About Us', icon: <Ionicons name="information-circle-outline" size={20} color={colors.blueIcon} /> },
  { label: 'Rate Us', icon: <Ionicons name="star-outline" size={20} color={colors.blueIcon} /> },
  { label: 'HBB device onboarding', icon: <MaterialCommunityIcons name="router-wireless" size={20} color={colors.blueIcon} /> },
];

export default function MoreScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState(defaultProfile);

  useFocusEffect(
    useCallback(() => {
      loadProfile().then(setProfile);
    }, [])
  );

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={gradients.profileHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.profileHeader, { paddingTop: insets.top + spacing.xl }]}
        >
          <Text style={styles.version}>V 1.4.18</Text>
          <View style={styles.avatar}>
            <Ionicons name="person" size={36} color={colors.white} />
          </View>
          <Text style={styles.name}>{profile.shortName}</Text>
          <Text style={styles.sub}>{profile.phone} - {profile.accountType}</Text>
          <View style={styles.chevron}>
            <Ionicons name="chevron-forward" size={18} color={colors.white} />
            <Ionicons name="chevron-forward" size={18} color={colors.white} style={{ marginLeft: -10 }} />
          </View>
        </LinearGradient>

        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuRow}
              onPress={() => item.route && navigation.navigate(item.route)}
            >
              <View style={styles.menuIconWrap}>{item.icon}</View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.expandable ? <Ionicons name="chevron-down" size={18} color={colors.textMuted} /> : null}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgGray },
  profileHeader: { alignItems: 'center', paddingVertical: spacing.xxl, paddingTop: spacing.xl },
  version: { position: 'absolute', top: spacing.md, right: spacing.lg, color: colors.white, fontSize: fontSizes.xs },
  avatar: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: '#4CAF7D', alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  name: { color: colors.white, fontSize: fontSizes.lg, fontWeight: '700', letterSpacing: 1 },
  sub: { color: colors.white, fontSize: fontSizes.sm, opacity: 0.9, marginTop: 2 },
  chevron: { position: 'absolute', right: spacing.lg, top: '50%', flexDirection: 'row' },
  menu: { backgroundColor: colors.cardWhite },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuIconWrap: { width: 30 },
  menuLabel: { flex: 1, fontSize: fontSizes.base, color: colors.textPrimary },
});
