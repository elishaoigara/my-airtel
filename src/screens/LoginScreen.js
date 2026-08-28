import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/theme';
import { saveAuth } from '../data/authStore';
import { REGIONS, saveRegion } from '../data/regionStore';

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default function LoginScreen({ initialRegion, onLoggedIn, onRegionChanged }) {
  const [region, setRegion] = useState(initialRegion || REGIONS.KE);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const canContinue = phone.length === 9;
  const formattedPhone = useMemo(() => phone.replace(/\D/g, '').slice(0, 9), [phone]);

  const chooseRegion = async (nextRegion) => {
    setRegion(nextRegion);
    setPhone('');
    setMessage('');
    await saveRegion(nextRegion.code);
    onRegionChanged?.(nextRegion);
  };

  const addDigit = (digit) => {
    setMessage('');
    if (formattedPhone.length < 9) setPhone(`${formattedPhone}${digit}`);
  };

  const removeDigit = () => {
    setMessage('');
    setPhone(formattedPhone.slice(0, -1));
  };

  const login = async () => {
    if (!canContinue) {
      setMessage('Enter a valid 9-digit mobile number.');
      return;
    }
    await saveAuth(formattedPhone);
    onLoggedIn({ phone: formattedPhone, region });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
            <Text style={styles.logo}><Text style={styles.logoMark}>◉</Text> airtel</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Welcome to {region.label}</Text>
            <Text style={styles.regionLabel}>Select your country</Text>
            <View style={styles.regionRow}>
              {Object.values(REGIONS).map((item) => (
                <TouchableOpacity
                  key={item.code}
                  style={[styles.regionChip, region.code === item.code && styles.regionChipActive]}
                  onPress={() => chooseRegion(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Use ${item.label}`}
                >
                  <Text style={[styles.regionChipText, region.code === item.code && styles.regionChipTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Registered Number or Account ID</Text>
            <View style={styles.phoneRow}>
              <MaterialCommunityIcons name="cellphone" size={20} color={colors.textSecondary} />
              <Text style={styles.prefix}>{region.dialCode} -</Text>
              <TextInput
                value={formattedPhone}
                onChangeText={(value) => setPhone(value.replace(/\D/g, '').slice(0, 9))}
                placeholder="Enter here"
                placeholderTextColor="#B9BEC6"
                keyboardType="number-pad"
                style={styles.input}
                accessibilityLabel="Registered mobile number"
              />
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={28} color="#159BD7" />
              <Text style={styles.infoText}>Enter a registered {region.label} number or a Home Broadband account number.</Text>
            </View>

            <View style={styles.keypad}>
              {keys.map((key) => (
                <TouchableOpacity key={key} style={styles.key} onPress={() => addDigit(key)}>
                  <Text style={styles.keyText}>{key}</Text>
                </TouchableOpacity>
              ))}
              <View style={styles.key} />
              <TouchableOpacity style={styles.key} onPress={removeDigit} accessibilityLabel="Delete last digit">
                <MaterialCommunityIcons name="backspace" size={28} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {!!message && <Text style={styles.error}>{message}</Text>}
            <TouchableOpacity
              style={[styles.loginButton, canContinue && styles.loginButtonActive]}
              onPress={login}
              accessibilityRole="button"
              accessibilityLabel="Proceed to login"
            >
              <Text style={styles.loginText}>PROCEED TO LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.nextStep}>Next: verify your Airtel Money PIN.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FC' },
  screen: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 24 },
  header: { height: 72, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white },
  headerSpacer: { flex: 1 },
  logo: { flex: 1, marginLeft: spacing.lg, color: colors.airtelRed, fontSize: 30, fontWeight: '800' },
  logoMark: { fontSize: 26 },
  content: { flex: 1, paddingHorizontal: spacing.xl, paddingTop: 34 },
  title: { fontSize: 28, fontWeight: '800', color: colors.black, marginBottom: 22 },
  regionLabel: { color: colors.textSecondary, fontSize: 14, fontWeight: '700', marginBottom: spacing.sm },
  regionRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: 24 },
  regionChip: { flex: 1, borderWidth: 1, borderColor: '#CBD2DA', borderRadius: radius.sm, paddingVertical: 12, alignItems: 'center', backgroundColor: colors.white },
  regionChipActive: { borderColor: colors.airtelRed, backgroundColor: '#FFF1F2' },
  regionChipText: { color: colors.textSecondary, fontSize: 14, fontWeight: '700' },
  regionChipTextActive: { color: colors.airtelRed },
  label: { color: colors.textSecondary, fontSize: 20, fontWeight: '700', marginBottom: spacing.md },
  phoneRow: { height: 52, borderBottomWidth: 2, borderBottomColor: '#18A9D8', flexDirection: 'row', alignItems: 'center' },
  prefix: { color: colors.textSecondary, fontSize: 21, marginLeft: spacing.sm },
  input: { flex: 1, fontSize: 22, marginLeft: spacing.sm, color: colors.textPrimary },
  infoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F9FF', padding: spacing.md, marginTop: spacing.md },
  infoText: { flex: 1, color: colors.textSecondary, fontSize: 15, lineHeight: 21, marginLeft: spacing.md },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 28 },
  key: { width: '30%', height: 64, alignItems: 'center', justifyContent: 'center' },
  keyText: { color: '#707277', fontSize: 42, fontWeight: '300' },
  error: { color: colors.airtelRed, textAlign: 'center', marginTop: spacing.sm },
  loginButton: { height: 58, backgroundColor: '#A8B2BC', borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  loginButtonActive: { backgroundColor: colors.airtelRed },
  loginText: { color: colors.white, fontSize: 17, fontWeight: '700' },
  nextStep: { color: colors.textMuted, textAlign: 'center', fontSize: 12, marginTop: spacing.sm },
});
