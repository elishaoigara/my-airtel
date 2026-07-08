import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal,
  TextInput, Alert, KeyboardAvoidingView, Platform, FlatList,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, radius } from '../theme/theme';
import {
  loadTransactions, saveTransactions, deleteTransaction, resetTransactions,
} from '../data/transactionStore';
import { loadProfile, saveProfile, resetProfile, defaultProfile } from '../data/profileStore';
import { CURRENCIES, defaultCurrency, loadCurrency, saveCurrency } from '../data/currencyStore';

const emptyForm = {
  type: '', direction: 'sent', amount: '', currency: 'KES',
  closingBalance: '', transactionId: '', date: '', time: '',
  status: 'SUCCESSFUL', recipient: '', sender: '',
};

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [profile, setProfile] = useState(defaultProfile);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [profileForm, setProfileForm] = useState(defaultProfile);

  const [currency, setCurrency] = useState(defaultCurrency);

  const [transactions, setTransactions] = useState([]);
  const [txModalVisible, setTxModalVisible] = useState(false);
  const [txListVisible, setTxListVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useFocusEffect(
    useCallback(() => {
      loadProfile().then((p) => { setProfile(p); setProfileForm(p); });
      loadTransactions().then(setTransactions);
      loadCurrency().then(setCurrency);
    }, [])
  );

  async function handleSelectCurrency(item) {
    setCurrency(item);
    await saveCurrency(item.code);
  }

  async function handleSaveProfile() {
    await saveProfile(profileForm);
    setProfile(profileForm);
    setProfileModalVisible(false);
  }

  async function handleResetProfile() {
    const reset = await resetProfile();
    setProfile(reset);
    setProfileForm(reset);
  }

  function openAddTx() {
    setEditingId(null);
    setForm(emptyForm);
    setTxModalVisible(true);
  }

  function openEditTx(tx) {
    setEditingId(tx.id);
    setForm({ ...emptyForm, ...tx, amount: String(tx.amount), closingBalance: String(tx.closingBalance) });
    setTxModalVisible(true);
  }

  async function handleSaveTx() {
    if (!form.type || !form.amount || !form.transactionId) {
      Alert.alert('Missing fields', 'Type, amount and transaction ID are required.');
      return;
    }
    const payload = { ...form, amount: parseFloat(form.amount) || 0, closingBalance: parseFloat(form.closingBalance) || 0 };
    let updated;
    if (editingId) {
      updated = transactions.map((t) => (t.id === editingId ? { ...t, ...payload } : t));
    } else {
      updated = [{ ...payload, id: `t${Date.now()}` }, ...transactions];
    }
    await saveTransactions(updated);
    setTransactions(updated);
    setTxModalVisible(false);
  }

  function handleDeleteTx(id) {
    Alert.alert('Delete transaction', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          const updated = await deleteTransaction(id);
          setTransactions(updated);
        },
      },
    ]);
  }

  function handleResetTx() {
    Alert.alert('Reset transactions', 'This replaces all transactions with the example set.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        onPress: async () => {
          const reset = await resetTransactions();
          setTransactions(reset);
        },
      },
    ]);
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.noteBanner}>
          Demo controls only — nothing here appears on the live app screens. Changes you make below show up automatically on Home, More, and Transaction History.
        </Text>

        {/* Profile section */}
        <Text style={styles.sectionTitle}>Profile / Account Details</Text>
        <View style={styles.card}>
          <Text style={styles.fieldRow}><Text style={styles.fieldRowLabel}>Display Name: </Text>{profile.shortName}</Text>
          <Text style={styles.fieldRow}><Text style={styles.fieldRowLabel}>Phone Number: </Text>{profile.phone}</Text>
          <Text style={styles.fieldRow}><Text style={styles.fieldRowLabel}>Account Type: </Text>{profile.accountType}</Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => { setProfileForm(profile); setProfileModalVisible(true); }}
          >
            <Feather name="edit-2" size={14} color={colors.airtelRed} />
            <Text style={styles.editBtnText}>Edit Profile Details</Text>
          </TouchableOpacity>
        </View>

        {/* Currency section */}
        <Text style={styles.sectionTitle}>Currency</Text>
        <View style={styles.card}>
          <Text style={styles.cardSub}>Applies to Airtime Balance and Airtel Money on Home. Tap to switch — takes effect immediately.</Text>
          <View style={styles.chipRow}>
            {CURRENCIES.map((c) => (
              <TouchableOpacity
                key={c.code}
                style={[styles.chip, currency.code === c.code && styles.chipActive]}
                onPress={() => handleSelectCurrency(c)}
              >
                <Text style={[styles.chipText, currency.code === c.code && styles.chipTextActive]}>{c.code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Transactions section */}
        <Text style={styles.sectionTitle}>Transaction Examples</Text>
        <View style={styles.card}>
          <Text style={styles.cardSub}>{transactions.length} transaction{transactions.length !== 1 ? 's' : ''} currently set up for the demo.</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={openAddTx}>
              <Ionicons name="add" size={16} color={colors.airtelRed} />
              <Text style={styles.actionBtnText}>Add New</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => setTxListVisible(!txListVisible)}>
              <Ionicons name={txListVisible ? 'chevron-up' : 'list'} size={16} color={colors.airtelRed} />
              <Text style={styles.actionBtnText}>{txListVisible ? 'Hide List' : 'Manage Existing'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.resetLink} onPress={handleResetTx}>
            <Text style={styles.resetLinkText}>Reset to example transactions</Text>
          </TouchableOpacity>

          {txListVisible && (
            <View style={styles.txList}>
              {transactions.map((t) => (
                <View key={t.id} style={styles.txRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.txRowTitle}>{t.type} · {t.currency} {Number(t.amount).toLocaleString()}</Text>
                    <Text style={styles.txRowSub}>{t.date} · {t.status}</Text>
                  </View>
                  <TouchableOpacity onPress={() => openEditTx(t)} style={styles.txRowBtn}>
                    <Feather name="edit-2" size={14} color={colors.linkBlue} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteTx(t.id)} style={styles.txRowBtn}>
                    <Feather name="trash-2" size={14} color={colors.airtelRed} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Profile edit modal */}
      <Modal visible={profileModalVisible} animationType="slide" transparent onRequestClose={() => setProfileModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FormField label="Full Name (shown on Home)" value={profileForm.name} onChangeText={(v) => setProfileForm({ ...profileForm, name: v })} />
              <FormField label="Short Name (shown in More menu)" value={profileForm.shortName} onChangeText={(v) => setProfileForm({ ...profileForm, shortName: v })} />
              <FormField label="Phone Number" value={profileForm.phone} onChangeText={(v) => setProfileForm({ ...profileForm, phone: v })} keyboardType="phone-pad" />
              <FormField label="Account Type" value={profileForm.accountType} onChangeText={(v) => setProfileForm({ ...profileForm, accountType: v })} />
              <FormField label="Airtime Balance" value={profileForm.airtimeBalance} onChangeText={(v) => setProfileForm({ ...profileForm, airtimeBalance: v })} keyboardType="numeric" />
              <FormField label="Voice Balance (mins)" value={profileForm.voiceBalance} onChangeText={(v) => setProfileForm({ ...profileForm, voiceBalance: v })} keyboardType="numeric" />
              <FormField label="Data Balance (MB)" value={profileForm.dataBalance} onChangeText={(v) => setProfileForm({ ...profileForm, dataBalance: v })} keyboardType="numeric" />
              <FormField label="Airtel Money Balance" value={profileForm.airtelMoneyBalance} onChangeText={(v) => setProfileForm({ ...profileForm, airtelMoneyBalance: v })} />

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={handleResetProfile}>
                <Text style={styles.deleteBtnText}>Reset to Default Profile</Text>
              </TouchableOpacity>
              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Transaction add/edit modal */}
      <Modal visible={txModalVisible} animationType="slide" transparent onRequestClose={() => setTxModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingId ? 'Edit Transaction' : 'Add Transaction'}</Text>
              <TouchableOpacity onPress={() => setTxModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FormField label="Type (e.g. TOPUP, Send Money)" value={form.type} onChangeText={(v) => setForm({ ...form, type: v })} />

              <Text style={styles.fieldLabel}>Direction</Text>
              <View style={styles.chipRow}>
                {['sent', 'received'].map((d) => (
                  <TouchableOpacity key={d} style={[styles.chip, form.direction === d && styles.chipActive]} onPress={() => setForm({ ...form, direction: d })}>
                    <Text style={[styles.chipText, form.direction === d && styles.chipTextActive]}>{d === 'sent' ? 'Sent' : 'Received'}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <FormField label="Amount" value={form.amount} onChangeText={(v) => setForm({ ...form, amount: v })} keyboardType="numeric" />
              <FormField label="Currency" value={form.currency} onChangeText={(v) => setForm({ ...form, currency: v })} />
              <FormField label="Closing Balance" value={form.closingBalance} onChangeText={(v) => setForm({ ...form, closingBalance: v })} keyboardType="numeric" />
              <FormField label="Transaction ID" value={form.transactionId} onChangeText={(v) => setForm({ ...form, transactionId: v })} />
              <FormField label="Date (e.g. 17 Jun 2026)" value={form.date} onChangeText={(v) => setForm({ ...form, date: v })} />
              <FormField label="Time (e.g. 6:43 PM)" value={form.time} onChangeText={(v) => setForm({ ...form, time: v })} />
              <FormField
                label={form.direction === 'sent' ? 'Recipient (optional)' : 'Sender (optional)'}
                value={form.direction === 'sent' ? form.recipient : form.sender}
                onChangeText={(v) => setForm({ ...form, [form.direction === 'sent' ? 'recipient' : 'sender']: v })}
              />

              <Text style={styles.fieldLabel}>Status</Text>
              <View style={styles.chipRow}>
                {['SUCCESSFUL', 'FAILED', 'PENDING'].map((s) => (
                  <TouchableOpacity key={s} style={[styles.chip, form.status === s && styles.chipActive]} onPress={() => setForm({ ...form, status: s })}>
                    <Text style={[styles.chipText, form.status === s && styles.chipTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveTx}>
                <Text style={styles.saveBtnText}>{editingId ? 'Save Changes' : 'Add Transaction'}</Text>
              </TouchableOpacity>
              {editingId ? (
                <TouchableOpacity style={styles.deleteBtn} onPress={() => { setTxModalVisible(false); handleDeleteTx(editingId); }}>
                  <Text style={styles.deleteBtnText}>Delete Transaction</Text>
                </TouchableOpacity>
              ) : null}
              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function FormField({ label, ...props }) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={styles.fieldInput} placeholderTextColor={colors.textMuted} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgGray },
  header: {
    backgroundColor: colors.airtelRed,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingBottom: spacing.lg,
  },
  headerTitle: { color: colors.white, fontSize: fontSizes.lg, fontWeight: '700' },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  noteBanner: {
    fontSize: fontSizes.xs, color: colors.textSecondary, backgroundColor: '#FFF3CD',
    padding: spacing.md, borderRadius: radius.sm, marginBottom: spacing.lg, lineHeight: 16,
  },
  sectionTitle: { fontSize: fontSizes.base, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.sm },
  card: { backgroundColor: colors.cardWhite, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.lg },
  fieldRow: { fontSize: fontSizes.sm, color: colors.textPrimary, marginBottom: 6 },
  fieldRowLabel: { color: colors.textSecondary },
  cardSub: { fontSize: fontSizes.sm, color: colors.textSecondary, marginBottom: spacing.md },
  editBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, gap: 6 },
  editBtnText: { color: colors.airtelRed, fontWeight: '600', fontSize: fontSizes.sm },
  btnRow: { flexDirection: 'row', gap: spacing.sm },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FDEDEE', borderRadius: radius.sm,
    paddingVertical: 10, paddingHorizontal: spacing.md,
  },
  actionBtnText: { color: colors.airtelRed, fontWeight: '600', fontSize: fontSizes.sm },
  resetLink: { marginTop: spacing.md },
  resetLinkText: { color: colors.linkBlue, fontSize: fontSizes.xs },
  txList: { marginTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: spacing.sm },
  txRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.divider,
  },
  txRowTitle: { fontSize: fontSizes.sm, color: colors.textPrimary, fontWeight: '600' },
  txRowSub: { fontSize: fontSizes.xs, color: colors.textSecondary, marginTop: 2 },
  txRowBtn: { padding: spacing.sm },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalCard: {
    backgroundColor: colors.cardWhite, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg,
    padding: spacing.lg, maxHeight: '88%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  modalTitle: { fontSize: fontSizes.lg, fontWeight: '700', color: colors.textPrimary },
  fieldLabel: { fontSize: fontSizes.xs, color: colors.textSecondary, marginBottom: 4, fontWeight: '600' },
  fieldInput: {
    borderWidth: 1, borderColor: colors.divider, borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: 10, fontSize: fontSizes.sm, color: colors.textPrimary,
  },
  chipRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md, flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderColor: colors.divider, borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: spacing.md },
  chipActive: { backgroundColor: colors.airtelRed, borderColor: colors.airtelRed },
  chipText: { fontSize: fontSizes.xs, color: colors.textPrimary },
  chipTextActive: { color: colors.white, fontWeight: '700' },
  saveBtn: { backgroundColor: colors.airtelRed, borderRadius: radius.sm, paddingVertical: 14, alignItems: 'center', marginTop: spacing.sm },
  saveBtnText: { color: colors.white, fontWeight: '700', fontSize: fontSizes.base },
  deleteBtn: { alignItems: 'center', paddingVertical: spacing.md },
  deleteBtnText: { color: colors.airtelRed, fontWeight: '600', fontSize: fontSizes.sm },
});