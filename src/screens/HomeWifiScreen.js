import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import { colors, fontSizes, spacing, radius } from '../theme/theme';
import { defaultCurrency, loadCurrency, convertFromKes } from '../data/currencyStore';

const quickActions = [
  { label: 'Buy Bundles', icon: <MaterialCommunityIcons name="card-multiple-outline" size={24} color={colors.airtelRed} /> },
  { label: 'Buy new\ndevice', icon: <MaterialCommunityIcons name="router-wireless" size={24} color={colors.airtelRed} /> },
  { label: 'Activate\nDevice', icon: <Ionicons name="scan-outline" size={24} color={colors.airtelRed} /> },
  { label: 'Add Account', icon: <Feather name="user-plus" size={24} color={colors.airtelRed} /> },
  { label: 'Visit Airtel\nShops', icon: <MaterialCommunityIcons name="storefront-outline" size={24} color={colors.airtelRed} /> },
];

export default function HomeWifiScreen() {
  const [currency, setCurrency] = useState(defaultCurrency);

  useFocusEffect(
    useCallback(() => {
      loadCurrency().then(setCurrency);
    }, [])
  );

  return (
    <View style={styles.screen}>
      <AppHeader showLogo subtitle="Home Wi-Fi" />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Explore Airtel 5G Experience</Text>
          <Text style={styles.heroSub}>Fast | Reliable | Affordable</Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>Buy Home WiFi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.grid}>
            {quickActions.map((item) => (
              <TouchableOpacity key={item.label} style={styles.gridItem}>
                <View style={styles.gridIconWrap}>{item.icon}</View>
                <Text style={styles.gridLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.promo}>
          <Text style={styles.promoTitle}>UNLIMITED DATA</Text>
          <Text style={styles.promoSub}>FOR LIMITLESS STREAMING</Text>
          <View style={styles.promoRow}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>15MBPS{'\n'}{currency.code} {convertFromKes(1999, currency)}</Text>
            </View>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>30MBPS{'\n'}{currency.code} {convertFromKes(2999, currency)}</Text>
            </View>
          </View>
          <Text style={styles.promoFoot}>DIAL: 0733 100 500 FOR HOME DELIVERY</Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgGray },
  body: { flex: 1, paddingHorizontal: spacing.lg },
  hero: {
    backgroundColor: colors.black,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  heroTitle: { color: colors.white, fontWeight: '700', fontSize: fontSizes.lg },
  heroSub: { color: colors.white, fontSize: fontSizes.sm, marginTop: 4, opacity: 0.85 },
  heroBtn: {
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
    alignSelf: 'flex-start',
    marginTop: spacing.lg,
  },
  heroBtnText: { color: colors.black, fontWeight: '700', fontSize: fontSizes.sm },
  card: {
    backgroundColor: colors.cardWhite,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  sectionTitle: { fontWeight: '700', fontSize: fontSizes.base, color: colors.textPrimary, marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '33%', alignItems: 'center', marginBottom: spacing.lg },
  gridIconWrap: { marginBottom: spacing.xs },
  gridLabel: { fontSize: fontSizes.xs, color: colors.textPrimary, textAlign: 'center' },
  promo: {
    backgroundColor: colors.black,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  promoTitle: { color: colors.white, fontWeight: '900', fontSize: fontSizes.lg },
  promoSub: { color: colors.white, fontSize: fontSizes.xs, marginTop: 2, opacity: 0.8 },
  promoRow: { flexDirection: 'row', marginTop: spacing.md, gap: spacing.sm },
  promoTag: {
    borderColor: colors.airtelRed,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
  },
  promoTagText: { color: colors.white, fontSize: fontSizes.xs, textAlign: 'center' },
  promoFoot: { color: colors.white, fontSize: fontSizes.xs, marginTop: spacing.md, opacity: 0.8 },
});