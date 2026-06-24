import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import { colors, fontSizes, spacing, radius } from '../theme/theme';

const transferActions = [
  { label: 'Buy Goods', icon: <Feather name="shopping-cart" size={22} color={colors.airtelRed} /> },
  { label: 'Withdraw\ncash', icon: <MaterialCommunityIcons name="cellphone-arrow-down" size={22} color={colors.airtelRed} /> },
  { label: 'Send Money\nAny Network\nor Pochi', icon: <MaterialCommunityIcons name="camera-outline" size={22} color={colors.airtelRed} /> },
  { label: 'More\nServices', icon: <Ionicons name="chevron-down-circle-outline" size={22} color={colors.airtelRed} /> },
];

const billActions = [
  { label: 'Buy Airtime', icon: <Feather name="smartphone" size={22} color={colors.airtelRed} /> },
  { label: 'Pay Bill', icon: <Feather name="file-text" size={22} color={colors.airtelRed} /> },
  { label: 'Buy Bundles', icon: <MaterialCommunityIcons name="card-multiple-outline" size={22} color={colors.airtelRed} /> },
  { label: 'Buy Goods', icon: <Feather name="shopping-cart" size={22} color={colors.airtelRed} /> },
  { label: 'My\nFavourites', icon: <Ionicons name="star-outline" size={22} color={colors.airtelRed} /> },
  { label: 'Scan & Pay', icon: <Ionicons name="scan-outline" size={22} color={colors.airtelRed} /> },
  { label: 'Claim Bonus', icon: <Feather name="user-plus" size={22} color={colors.airtelRed} />, badge: 'New' },
  { label: 'Discover', icon: <Feather name="compass" size={22} color={colors.airtelRed} /> },
];

export default function AirtelMoneyScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <AppHeader showLogo subtitle="money" />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Transfer & Cashout</Text>
        <View style={styles.card}>
          <View style={styles.grid}>
            {transferActions.map((item) => (
              <TouchableOpacity key={item.label} style={styles.gridItem}>
                <View style={styles.gridIconWrap}>{item.icon}</View>
                <Text style={styles.gridLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recharge & Bill Payments</Text>
        <View style={styles.card}>
          <View style={styles.grid}>
            {billActions.map((item) => (
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
        </View>

        <View style={styles.row}>
          <View style={[styles.wideTile, { backgroundColor: colors.purpleCard }]}>
            <Text style={styles.wideTileText}>My Favourites</Text>
            <View style={styles.wideTileCircle}>
              <Ionicons name="star" size={20} color={colors.white} />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.wideTile, { backgroundColor: colors.greenCard }]}
            onPress={() => navigation.navigate('TransactionHistory')}
          >
            <Text style={styles.wideTileText}>Statements</Text>
            <View style={styles.wideTileCircle}>
              <FontAwesome name="line-chart" size={18} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgGray },
  body: { flex: 1, paddingHorizontal: spacing.lg },
  sectionTitle: {
    fontWeight: '700',
    fontSize: fontSizes.base,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.cardWhite,
    borderRadius: radius.md,
    padding: spacing.lg,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '25%', alignItems: 'center', marginBottom: spacing.md },
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
  row: { flexDirection: 'row', marginTop: spacing.lg, gap: spacing.md },
  wideTile: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wideTileText: { color: colors.white, fontWeight: '700', fontSize: fontSizes.base, flexShrink: 1 },
  wideTileCircle: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
