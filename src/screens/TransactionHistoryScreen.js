import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useFocusEffect, useSafeAreaInsets } from '@react-navigation/native';
import { useSafeAreaInsets as useInsets } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, radius } from '../theme/theme';
import { loadTransactions } from '../data/transactionStore';

const FILTERS = [
  { key: 'all', label: 'All Transactions', icon: 'receipt-outline' },
  { key: 'sent', label: 'Money Sent', icon: 'arrow-redo-outline' },
  { key: 'received', label: 'Money Received', icon: 'arrow-undo-outline' },
];

export default function TransactionHistoryScreen({ navigation }) {
  const insets = useInsets();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadTransactions().then(setTransactions);
    }, [])
  );

  const filtered = transactions.filter((t) => {
    if (filter === 'sent' && t.direction !== 'sent') return false;
    if (filter === 'received' && t.direction !== 'received') return false;
    if (search && !`${t.transactionId} ${t.amount}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.fromLabel}>FROM</Text>
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterTile, filter === f.key && styles.filterTileActive]}
              onPress={() => setFilter(f.key)}
            >
              <Ionicons
                name={f.icon}
                size={22}
                color={filter === f.key ? colors.airtelRed : colors.textSecondary}
              />
              <Text style={[styles.filterTileText, filter === f.key && styles.filterTileTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search transaction ID or amount"
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <Ionicons name="search" size={18} color={colors.textMuted} />
        </View>

        <View style={styles.listMetaRow}>
          <Text style={styles.listMeta}>Displaying Transaction For 7 Days</Text>
          <View style={styles.filterIconBtn}>
            <Ionicons name="filter" size={16} color={colors.airtelRed} />
          </View>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons name="ban-outline" size={32} color={colors.textMuted} />
              <Text style={styles.emptyText}>No more data to show.</Text>
            </View>
          }
          ListFooterComponent={
            filtered.length > 0 ? (
              <View style={styles.emptyWrap}>
                <Ionicons name="ban-outline" size={28} color={colors.textMuted} />
                <Text style={styles.emptyText}>No more data to show.</Text>
                <TouchableOpacity style={styles.downloadBtn}>
                  <Text style={styles.downloadBtnText}>Download Statement</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
          renderItem={({ item, index }) => {
            const showDateHeader = index === 0 || filtered[index - 1].date !== item.date;
            return (
              <View>
                {showDateHeader ? <Text style={styles.dateHeader}>{item.date}</Text> : null}
                <TouchableOpacity
                  style={styles.txCard}
                  onPress={() => navigation.navigate('TransactionDetails', { transaction: item })}
                  activeOpacity={0.7}
                >
                  <View style={styles.txTopRow}>
                    <Text style={styles.txType}>
                      {item.direction === 'sent' ? 'Sent to ' : 'Received from '}
                      {item.recipient || item.sender || item.type}
                    </Text>
                    <Text style={styles.txAmount}>
                      {item.currency} {Number(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Text>
                  </View>
                  <Text style={styles.txMeta}>Closing Balance : {item.currency} {Number(item.closingBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                  <Text style={styles.txMeta}>Transaction ID : {item.transactionId}</Text>
                  <Text style={styles.txMeta}>{item.time}</Text>
                  <View style={styles.txDivider} />
                  <Text style={[
                    styles.txStatus,
                    item.status === 'FAILED' ? styles.statusFailed : styles.statusSuccess,
                  ]}>
                    {item.status}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgGray },
  header: {
    backgroundColor: colors.airtelRed,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerTitle: { color: colors.white, fontSize: fontSizes.lg, fontWeight: '700' },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  fromLabel: { fontSize: fontSizes.xs, color: colors.textMuted, fontWeight: '700', marginBottom: spacing.sm },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
  filterTile: {
    flex: 1, alignItems: 'center', paddingVertical: spacing.md, marginHorizontal: 4,
    borderRadius: radius.md, borderWidth: 1, borderColor: 'transparent',
  },
  filterTileActive: { borderColor: colors.airtelRed, backgroundColor: colors.cardWhite },
  filterTileText: { fontSize: 11, color: colors.textSecondary, marginTop: 6, textAlign: 'center' },
  filterTileTextActive: { color: colors.airtelRed, fontWeight: '600' },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.cardWhite, borderRadius: radius.sm,
    paddingHorizontal: spacing.md, marginBottom: spacing.md,
  },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: fontSizes.sm, color: colors.textPrimary },
  listMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  listMeta: { fontSize: fontSizes.sm, color: colors.textPrimary, fontWeight: '700' },
  filterIconBtn: {
    width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: colors.airtelRed,
    alignItems: 'center', justifyContent: 'center',
  },
  dateHeader: { fontSize: fontSizes.sm, color: colors.textSecondary, marginBottom: spacing.sm, marginTop: spacing.xs },
  txCard: {
    backgroundColor: colors.cardWhite, borderRadius: radius.md,
    padding: spacing.lg, marginBottom: spacing.lg,
  },
  txTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  txType: { fontSize: fontSizes.sm, color: colors.textPrimary, fontWeight: '600', flexShrink: 1, marginRight: spacing.sm },
  txAmount: { fontSize: fontSizes.base, fontWeight: '700', color: colors.airtelRed },
  txMeta: { fontSize: fontSizes.xs, color: colors.textSecondary, marginTop: 4 },
  txDivider: { height: 1, backgroundColor: colors.divider, marginVertical: spacing.sm },
  txStatus: { fontSize: fontSizes.xs, fontWeight: '700' },
  statusSuccess: { color: colors.successGreen },
  statusFailed: { color: colors.airtelRed },
  emptyWrap: { alignItems: 'center', marginTop: 30, paddingVertical: 30 },
  emptyText: { color: colors.textMuted, marginTop: spacing.sm, fontSize: fontSizes.sm },
  downloadBtn: {
    backgroundColor: '#1C2B4A', borderRadius: radius.pill,
    paddingVertical: 14, paddingHorizontal: spacing.xl, marginTop: spacing.lg,
  },
  downloadBtnText: { color: colors.white, fontWeight: '700', fontSize: fontSizes.sm },
});
