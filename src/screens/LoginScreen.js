import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSizes, radius, spacing } from '../theme/theme';
import { saveAuth } from '../data/authStore';

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default function LoginScreen({ onLoggedIn }) {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const canContinue = phone.length >= 9;

  const formattedPhone = useMemo(() => phone.replace(/\D/g, '').slice(0, 9), [phone]);

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
    onLoggedIn(formattedPhone);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
          <Text style={styles.logo}><Text style={styles.logoMark}>◉</Text> airtel</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Airtel Kenya</Text>
          <Text style={styles.label}>Registered Number or Account ID</Text>
          <View style={styles.phoneRow}>
            <MaterialCommunityIcons name="cellphone" size={20} color={colors.textSecondary} />
            <Text style={styles.prefix}>+254 -</Text>
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
            <Text style={styles.infoText}>Registered number (Airtel or other operator) or your Home Broadband account number</Text>
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
          <TouchableOpacity style={[styles.loginButton, canContinue && styles.loginButtonActive]} onPress={login}>
            <Text style={styles.loginText}>PROCEED TO LOGIN</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FC' },
  screen: { flex: 1 },
  header: { height: 82, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white },
  headerSpacer: { flex: 1 },
  logo: { flex: 1, marginLeft: spacing.lg, color: colors.airtelRed, fontSize: 30, fontWeight: '800' },
  logoMark: { fontSize: 26 },
  content: { flex: 1, paddingHorizontal: spacing.xl, paddingTop: 58 },
  title: { fontSize: 28, fontWeight: '800', color: colors.black, marginBottom: 34 },
  label: { color: colors.textSecondary, fontSize: 22, fontWeight: '700', marginBottom: spacing.md },
  phoneRow: { height: 52, borderBottomWidth: 2, borderBottomColor: '#18A9D8', flexDirection: 'row', alignItems: 'center' },
  prefix: { color: colors.textSecondary, fontSize: 23, marginLeft: spacing.sm },
  input: { flex: 1, fontSize: 22, marginLeft: spacing.sm, color: colors.textPrimary },
  infoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F9FF', padding: spacing.md, marginTop: spacing.md },
  infoText: { flex: 1, color: colors.textSecondary, fontSize: 16, lineHeight: 23, marginLeft: spacing.md },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 46 },
  key: { width: '30%', height: 86, alignItems: 'center', justifyContent: 'center' },
  keyText: { color: '#707277', fontSize: 50, fontWeight: '300' },
  error: { color: colors.airtelRed, textAlign: 'center', marginTop: spacing.sm },
  loginButton: { height: 58, backgroundColor: '#A8B2BC', borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', marginTop: 'auto' },
  loginButtonActive: { backgroundColor: colors.airtelRed },
  loginText: { color: colors.white, fontSize: 17, fontWeight: '700' },
});
