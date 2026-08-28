import React, { useMemo, useState } from 'react';
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/theme';
import { saveAuth } from '../data/authStore';
import { REGIONS } from '../data/regionStore';

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function AirtelBrand() {
  return (
    <View style={styles.brand}>
      <View style={styles.brandMark}>
        <View style={styles.brandMarkCutout} />
      </View>
      <Text style={styles.brandText}>airtel</Text>
    </View>
  );
}

export default function LoginScreen({ onLoggedIn }) {
  const region = REGIONS.KE;
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const formattedPhone = useMemo(() => phone.replace(/\D/g, '').slice(0, 9), [phone]);
  const canContinue = formattedPhone.length === 9;

  const addDigit = (digit) => {
    setMessage('');
    if (formattedPhone.length < 9) setPhone(`${formattedPhone}${digit}`);
  };

  const removeDigit = () => {
    setMessage('');
    setPhone(formattedPhone.slice(0, -1));
  };

  const handleBack = () => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.history.length > 1) window.history.back();
      return;
    }
    if (Platform.OS === 'android') BackHandler.exitApp();
  };

  const login = async () => {
    if (!canContinue) {
      setMessage('Enter a valid 9-digit mobile number.');
      return;
    }

    await saveAuth(formattedPhone);
    onLoggedIn?.({ phone: formattedPhone, region });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" backgroundColor={colors.white} />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={30} color={colors.black} />
          </TouchableOpacity>
          <AirtelBrand />
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Welcome to Airtel Kenya</Text>
          <Text style={styles.label}>Registered Number or Account ID</Text>

          <View style={styles.phoneRow}>
            <MaterialCommunityIcons name="cellphone" size={21} color={colors.textSecondary} />
            <Text style={styles.prefix}>{region.dialCode}</Text>
            <Text style={styles.prefixDash}>-</Text>
            <TextInput
              value={formattedPhone}
              onChangeText={(value) => setPhone(value.replace(/\D/g, '').slice(0, 9))}
              placeholder="Enter here"
              placeholderTextColor="#C6C9CF"
              autoFocus
              keyboardType="number-pad"
              showSoftInputOnFocus={false}
              selectionColor="#6E7379"
              style={styles.input}
              accessibilityLabel="Registered mobile number"
            />
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={29} color="#159BD7" />
            <Text style={styles.infoText}>
              Registered number (Airtel or other operator) or your{`\n`}Home Broadband account number
            </Text>
          </View>

          <View style={styles.keypad}>
            {keys.map((key, index) => (
              <TouchableOpacity
                key={key}
                style={styles.key}
                onPress={() => addDigit(key)}
                accessibilityRole="button"
                accessibilityLabel={`Enter ${key}`}
              >
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.key} />
            <TouchableOpacity
              style={styles.key}
              onPress={removeDigit}
              accessibilityRole="button"
              accessibilityLabel="Delete last digit"
            >
              <MaterialCommunityIcons name="backspace" size={27} color="#707277" />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomArea}>
            {!!message && <Text style={styles.error}>{message}</Text>}
            <TouchableOpacity
              style={[styles.loginButton, canContinue && styles.loginButtonActive]}
              onPress={login}
              accessibilityRole="button"
              accessibilityLabel="Proceed to login"
            >
              <Text style={styles.loginText}>PROCEED TO LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F6FB',
  },
  screen: {
    flex: 1,
  },
  header: {
    height: 60,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  backButton: {
    width: 42,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  brandMark: {
    width: 28,
    height: 20,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: colors.airtelRed,
    transform: [{ rotate: '-29deg' }],
  },
  brandMarkCutout: {
    position: 'absolute',
    width: 15,
    height: 5,
    left: 5,
    top: 7,
    borderRadius: 8,
    backgroundColor: colors.white,
    transform: [{ rotate: '-9deg' }],
  },
  brandText: {
    color: colors.airtelRed,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: -1.2,
  },
  body: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#F5F6FB',
  },
  title: {
    color: '#08090B',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    marginBottom: 28,
  },
  label: {
    color: '#686B70',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    marginBottom: 19,
  },
  phoneRow: {
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#25A8D4',
  },
  prefix: {
    color: '#55585E',
    fontSize: 18,
    lineHeight: 24,
    marginLeft: 8,
  },
  prefixDash: {
    color: '#55585E',
    fontSize: 18,
    lineHeight: 24,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 43,
    paddingVertical: 0,
    paddingHorizontal: 8,
    color: '#303238',
    fontSize: 18,
    lineHeight: 24,
  },
  infoBox: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 14,
  },
  infoText: {
    flex: 1,
    color: '#6A6D73',
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 14,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
  },
  key: {
    width: '33.3333%',
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    color: '#707277',
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '300',
  },
  bottomArea: {
    marginTop: 'auto',
    paddingBottom: 16,
  },
  error: {
    color: colors.airtelRed,
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 8,
  },
  loginButton: {
    height: 42,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAB5BF',
  },
  loginButtonActive: {
    backgroundColor: colors.airtelRed,
  },
  loginText: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
});
