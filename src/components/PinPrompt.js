import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSizes, radius, spacing } from '../theme/theme';
import { DEMO_PIN } from '../data/authStore';

export default function PinPrompt({ visible, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const close = () => {
    setPin('');
    setError('');
    onClose();
  };

  const pressDigit = (digit) => {
    setError('');
    if (pin.length < 4) setPin(`${pin}${digit}`);
  };

  const submit = () => {
    if (pin === DEMO_PIN) {
      setPin('');
      setError('');
      onSuccess();
      return;
    }
    setPin('');
    setError('Incorrect PIN. Try the school demo PIN 1234.');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <TouchableOpacity style={styles.close} onPress={close} accessibilityLabel="Close PIN prompt">
            <Ionicons name="close" size={25} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.lock}><MaterialCommunityIcons name="lock-outline" size={48} color="#354A61" /></View>
          <Text style={styles.title}>Enter Airtel Money PIN</Text>
          <View style={styles.dots}>
            {[0, 1, 2, 3].map((index) => <View key={index} style={[styles.dot, index < pin.length && styles.dotFilled]} />)}
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.keypad}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <TouchableOpacity key={digit} style={styles.key} onPress={() => pressDigit(digit)}><Text style={styles.keyText}>{digit}</Text></TouchableOpacity>
            ))}
            <View style={styles.key} />
            <TouchableOpacity style={styles.key} onPress={() => pressDigit('0')}><Text style={styles.keyText}>0</Text></TouchableOpacity>
            <TouchableOpacity style={styles.key} onPress={() => setPin(pin.slice(0, -1))}><MaterialCommunityIcons name="backspace-outline" size={26} color={colors.textSecondary} /></TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.continue, pin.length === 4 && styles.continueActive]} onPress={submit} disabled={pin.length !== 4}>
            <Text style={styles.continueText}>CONTINUE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setError('For this school demo, use PIN 1234.')}><Text style={styles.forgot}>Forgot PIN?</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.55)' },
  sheet: { minHeight: '67%', backgroundColor: colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.lg },
  close: { alignSelf: 'flex-end', padding: spacing.sm },
  lock: { alignSelf: 'center', width: 76, height: 76, borderRadius: 38, backgroundColor: '#E8EDF3', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  title: { textAlign: 'center', color: '#354A61', fontSize: 20, fontWeight: '800', marginBottom: spacing.lg },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginBottom: spacing.sm },
  dot: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#E0E2E5' },
  dotFilled: { backgroundColor: colors.airtelRed },
  error: { color: colors.airtelRed, textAlign: 'center', fontSize: fontSizes.xs, marginBottom: spacing.sm },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: spacing.sm },
  key: { width: '30%', height: 55, alignItems: 'center', justifyContent: 'center' },
  keyText: { color: '#62656A', fontSize: 30 },
  continue: { backgroundColor: '#B0BAC4', borderRadius: radius.sm, height: 52, justifyContent: 'center', alignItems: 'center', marginTop: spacing.sm },
  continueActive: { backgroundColor: colors.airtelRed },
  continueText: { color: colors.white, fontWeight: '800' },
  forgot: { color: '#5C3BA9', textAlign: 'center', fontSize: 16, marginTop: spacing.md },
});
