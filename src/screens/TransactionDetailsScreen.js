import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, radius } from '../theme/theme';

export default function TransactionDetailsScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { transaction } = route.params;

  const isFailed = transaction.status === 'FAILED';
  const verb = transaction.direction === 'sent' ? 'Debit' : 'Credit';

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.doneText}>DONE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.statusCard}>
          <View style={styles.statusTopRow}>
            <View style={{ width: 24 }} />
            <View style={[styles.checkCircle, isFailed && styles.checkCircleFailed]}>
              <Ionicons name={isFailed ? 'close' : 'checkmark'} size={26} color={colors.white} />
            </View>
            <Ionicons name="share-social-outline" size={20} color={colors.textSecondary} />
          </View>
          <Text style={styles.statusTitle}>
            {isFailed ? 'Transaction Failed' : 'Transaction Successful'}
          </Text>
          <Text style={styles.statusSub}>
            {verb} of <Text style={styles.statusAmount}>{transaction.currency} {Number(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text> is {transaction.status}
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.valueAmount}>
              {transaction.currency} {Number(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>{transaction.transactionId}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Transaction Date</Text>
            <Text style={styles.value}>{transaction.date} {transaction.time}</Text>
          </View>
          {transaction.recipient ? (
            <React.Fragment>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Recipient</Text>
                <Text style={styles.value}>{transaction.recipient}</Text>
              </View>
            </React.Fragment>
          ) : null}
          {transaction.sender ? (
            <React.Fragment>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Sender</Text>
                <Text style={styles.value}>{transaction.sender}</Text>
              </View>
            </React.Fragment>
          ) : null}
        </View>
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
  doneText: { color: colors.white, fontSize: fontSizes.sm, fontWeight: '700' },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  statusCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statusTopRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', marginBottom: spacing.sm,
  },
  checkCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.successGreen, alignItems: 'center', justifyContent: 'center',
  },
  checkCircleFailed: { backgroundColor: colors.airtelRed },
  statusTitle: { fontSize: fontSizes.base, fontWeight: '700', color: colors.textPrimary, marginTop: spacing.sm },
  statusSub: { fontSize: fontSizes.sm, color: colors.textSecondary, marginTop: 4, textAlign: 'center' },
  statusAmount: { color: colors.airtelRed, fontWeight: '700' },
  detailsCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm },
  label: { fontSize: fontSizes.sm, color: colors.textSecondary },
  value: { fontSize: fontSizes.sm, color: colors.textPrimary, fontWeight: '600' },
  valueAmount: { fontSize: fontSizes.sm, color: colors.airtelRed, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.divider },
});
