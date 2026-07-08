import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import FadeInScreen from '../components/FadeInScreen';
import { colors, fontSizes, spacing, radius } from '../theme/theme';
import { loadProfile, defaultProfile } from '../data/profileStore';
import { defaultCurrency, loadCurrency, convertFromKes } from '../data/currencyStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const quickActions = [
  { label: 'Claim Bonus', icon: <Feather name="user-plus" size={22} color={colors.airtelRed} />, badge: 'New' },
  { label: 'Airtel 4G/5G\nWiFi', icon: <MaterialCommunityIcons name="router-wireless" size={22} color={colors.airtelRed} /> },
  { label: 'Pay Bill', icon: <Feather name="file-text" size={22} color={colors.airtelRed} /> },
  { label: 'Buy Bundles', icon: <MaterialCommunityIcons name="card-multiple-outline" size={22} color={colors.airtelRed} /> },
  { label: 'Buy Goods', icon: <Feather name="shopping-cart" size={22} color={colors.airtelRed} /> },
  { label: 'Withdraw\ncash', icon: <MaterialCommunityIcons name="cellphone-arrow-down" size={22} color={colors.airtelRed} /> },
  { label: 'Send Money\nAny Network\nor Pochi', icon: <MaterialCommunityIcons name="camera-outline" size={22} color={colors.airtelRed} /> },
  { label: 'Buy Airtime', icon: <Feather name="smartphone" size={22} color={colors.airtelRed} /> },
];

const promoBanners = [
  { id: '1', bg: colors.black, logo: 'airtel', text: 'PRICE SAME\nGB MOOOB!' },
  { id: '2', bg: '#7B1E22', logo: 'airtel', text: 'STREAM MORE\nNA MORE DATA' },
  { id: '3', bg: '#1A1A1A', logo: 'airtel', text: 'DROP YOUR\nREFERRAL LINK' },
];

export default function HomeScreen() {
  const [profile, setProfile] = useState(defaultProfile);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [activeSlide, setActiveSlide] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadProfile().then(setProfile);
      // Currency is switched from Settings now; re-read on every focus so
      // coming back from Settings picks up the latest choice automatically.
      loadCurrency().then(setCurrency);
    }, [])
  );

  const onSlideScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_WIDTH - spacing.lg * 2));
    setActiveSlide(idx);
  };

  return (
    <View style={styles.screen}>
      <AppHeader showLogo />
      <FadeInScreen>
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {/* Account summary card */}
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.sub}>{profile.accountType === 'PREPAID' ? 'Prepaid' : profile.accountType} - {profile.phone}</Text>
              </View>
              <View style={styles.topRightCol}>
                <TouchableOpacity>
                  <Text style={styles.manageLink}>Manage Account</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.balanceRow}>
              <View style={styles.balanceCol}>
                <Text style={styles.balanceValue}>{convertFromKes(profile.airtimeBalance, currency)}</Text>
                <Text style={styles.balanceCurrency}>{currency.code}</Text>
                <Text style={styles.balanceLabel}>Airtime Balance</Text>
              </View>
              <View style={styles.balanceCol}>
                <Text style={styles.balanceValue}>{profile.voiceBalance}</Text>
                <Text style={styles.balanceCurrency}>Mins</Text>
                <Text style={styles.balanceLabel}>Voice Balance</Text>
              </View>
              <View style={styles.balanceCol}>
                <Text style={styles.balanceValue}>{profile.dataBalance}</Text>
                <Text style={styles.balanceCurrency}>MB</Text>
                <Text style={styles.balanceLabel}>Data Balance</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.pillBtn}>
                <MaterialCommunityIcons name="card-multiple-outline" size={16} color={colors.airtelRed} />
                <Text style={styles.pillBtnText}>Buy Bundles</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pillBtn}>
                <Ionicons name="flash" size={16} color={colors.airtelRed} />
                <Text style={styles.pillBtnText}>Buy Airtime</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Airtel Money mini card */}
          <View style={[styles.card, styles.moneyCard]}>
            <View style={styles.moneyLeft}>
              <MaterialCommunityIcons name="wallet" size={20} color={colors.airtelRed} />
              <View style={{ marginLeft: spacing.sm }}>
                <Text style={styles.moneyLabel}>Airtel Money</Text>
                <Text style={styles.moneyValue}>{currency.code} {convertFromKes(profile.airtelMoneyBalance, currency)}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.eyeBtn}>
              <Ionicons name="eye-outline" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Quick actions */}
          <View style={styles.quickHeader}>
            <Text style={styles.quickTitle}>Quick Actions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {quickActions.map((item) => (
              <TouchableOpacity key={item.label} style={styles.gridItem}>
                {item.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                ) : null}
                <View style={styles.gridIconWrap}>{item.icon}</View>
                <Text style={styles.gridLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Swipeable promo carousel */}
          <FlatList
            data={promoBanners}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onSlideScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View style={[styles.promo, { backgroundColor: item.bg, width: SCREEN_WIDTH - spacing.lg * 2 }]}>
                <Text style={styles.promoLogo}>{item.logo}</Text>
                <Text style={styles.promoText}>{item.text}</Text>
              </View>
            )}
          />
          <View style={styles.dotsRow}>
            {promoBanners.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeSlide && styles.dotActive]} />
            ))}
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </FadeInScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgGray },
  body: { flex: 1, paddingHorizontal: spacing.lg },
  card: {
    backgroundColor: colors.cardWhite,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: -spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontWeight: '700', fontSize: fontSizes.base, color: colors.textPrimary },
  sub: { color: colors.textSecondary, fontSize: fontSizes.sm, marginTop: 2 },
  topRightCol: { alignItems: 'flex-end' },
  manageLink: { color: colors.linkBlue, fontSize: fontSizes.sm },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: spacing.md },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  balanceCol: { flex: 1 },
  balanceValue: { fontSize: fontSizes.lg, fontWeight: '700', color: colors.textPrimary },
  balanceCurrency: { color: colors.airtelRed, fontWeight: '700', fontSize: fontSizes.sm },
  balanceLabel: { color: colors.textMuted, fontSize: fontSizes.xs, marginTop: 2 },
  actionRow: { flexDirection: 'row', marginTop: spacing.lg },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDEDEE',
    borderRadius: radius.sm,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
  },
  pillBtnText: { color: colors.airtelRed, fontWeight: '600', fontSize: fontSizes.sm, marginLeft: 6 },
  moneyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  moneyLeft: { flexDirection: 'row', alignItems: 'center' },
  moneyLabel: { color: colors.airtelRed, fontWeight: '700', fontSize: fontSizes.base },
  moneyValue: { color: colors.textPrimary, fontWeight: '700', fontSize: fontSizes.base },
  eyeBtn: { backgroundColor: colors.airtelRed, padding: 8, borderRadius: radius.pill },
  quickHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  quickTitle: { fontWeight: '700', fontSize: fontSizes.base, color: colors.textPrimary },
  viewAll: { color: colors.linkBlue, fontSize: fontSizes.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '25%', alignItems: 'center', marginBottom: spacing.lg },
  gridIconWrap: { marginBottom: spacing.xs },
  gridLabel: { fontSize: fontSizes.xs, color: colors.textPrimary, textAlign: 'center' },
  badge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#D4D426',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.sm,
    zIndex: 1,
  },
  badgeText: { fontSize: 9, color: colors.black, fontWeight: '700' },
  promo: {
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.sm,
  },
  promoLogo: { color: colors.white, fontWeight: '700', fontSize: fontSizes.lg },
  promoText: { color: colors.airtelRed, fontWeight: '900', fontSize: fontSizes.xl, marginTop: spacing.sm },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.sm },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.divider,
    marginHorizontal: 3,
  },
  dotActive: { backgroundColor: colors.airtelRed, width: 16 },
});