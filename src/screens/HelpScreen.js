import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import { colors, fontSizes, spacing, radius } from '../theme/theme';

const social = [
  { name: 'instagram', lib: FontAwesome, color: '#E1306C' },
  { name: 'facebook', lib: FontAwesome, color: '#1877F2' },
  { name: 'twitter', lib: FontAwesome, color: '#000000' },
  { name: 'linkedin', lib: FontAwesome, color: '#0A66C2' },
  { name: 'youtube-play', lib: FontAwesome, color: '#FF0000' },
];

export default function HelpScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Text style={styles.headerTitle}>Help</Text>
        <Text style={styles.headerSub}>Get help 24X7</Text>
        <View style={[styles.headerIcons, { top: insets.top + spacing.lg }]}>
          <Ionicons name="scan-outline" size={22} color={colors.white} style={{ marginRight: spacing.lg }} />
          <Ionicons name="notifications-outline" size={22} color={colors.white} />
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.chatCard}>
          <View style={styles.chatLeft}>
            <View style={styles.chatLogoCircle}>
              <MaterialCommunityIcons name="water" size={20} color={colors.airtelRed} />
            </View>
            <View style={{ marginLeft: spacing.md, flexShrink: 1 }}>
              <Text style={styles.chatTitle}>Still facing a{'\n'}problem?</Text>
              <Text style={styles.chatSub}>Talk to us in your{'\n'}preferred language</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.chatBtn}>
            <Text style={styles.chatBtnText}>Chat Now</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.listCard}>
          <View style={[styles.iconBox, { borderColor: '#7B2D8E' }]}>
            <Text style={[styles.iconBoxText, { color: '#7B2D8E' }]}>?</Text>
          </View>
          <Text style={styles.listLabel}>FAQ</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listCard}>
          <View style={[styles.iconBox, { borderColor: '#7B2D8E' }]}>
            <Ionicons name="bulb-outline" size={16} color="#7B2D8E" />
          </View>
          <Text style={styles.listLabel}>Helpful Tips</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Contact Us</Text>

        <View style={styles.listCard}>
          <Ionicons name="phone-portrait-outline" size={20} color="#7B2D8E" style={{ marginRight: spacing.md }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.contactLabel}>Phone :</Text>
            <Text style={styles.contactValue}>+254733100100</Text>
          </View>
          <View style={styles.callBtn}>
            <Ionicons name="call" size={16} color={colors.white} />
          </View>
        </View>

        <View style={styles.listCard}>
          <Ionicons name="phone-portrait-outline" size={20} color="#7B2D8E" style={{ marginRight: spacing.md }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.contactLabel}>Email :</Text>
            <Text style={styles.contactValue}>customerservice@ke.airtel.com</Text>
          </View>
          <Ionicons name="mail-outline" size={20} color="#7B2D8E" />
        </View>

        <Text style={styles.sectionTitle}>Find us on</Text>
        <View style={styles.socialCard}>
          {social.map((s) => (
            <View key={s.name} style={[styles.socialIcon, { backgroundColor: s.color }]}>
              <s.lib name={s.name} size={18} color={colors.white} />
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgGray },
  header: {
    backgroundColor: colors.airtelRed,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerTitle: { color: colors.white, fontSize: fontSizes.xxl, fontWeight: '700' },
  headerSub: { color: colors.white, fontSize: fontSizes.sm, marginTop: 2, opacity: 0.9 },
  headerIcons: { position: 'absolute', right: spacing.lg, flexDirection: 'row' },
  body: { flex: 1, paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  chatCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: radius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  chatLeft: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  chatLogoCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FDEDEE', alignItems: 'center', justifyContent: 'center',
  },
  chatTitle: { fontWeight: '700', fontSize: fontSizes.base, color: colors.textPrimary },
  chatSub: { color: colors.textSecondary, fontSize: fontSizes.xs, marginTop: 2 },
  chatBtn: { backgroundColor: colors.black, borderRadius: radius.sm, paddingVertical: 10, paddingHorizontal: spacing.md },
  chatBtnText: { color: colors.white, fontWeight: '700', fontSize: fontSizes.sm },
  listCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: radius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 32, height: 32, borderRadius: 6, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  iconBoxText: { fontWeight: '700', fontSize: fontSizes.base },
  listLabel: { flex: 1, fontSize: fontSizes.base, color: colors.textPrimary },
  sectionTitle: { fontSize: fontSizes.base, color: colors.textSecondary, marginBottom: spacing.sm, marginTop: spacing.xs },
  contactLabel: { color: colors.textSecondary, fontSize: fontSizes.sm },
  contactValue: { color: colors.textPrimary, fontSize: fontSizes.base, marginTop: 2 },
  callBtn: { backgroundColor: '#1F8CE6', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  socialCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: radius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialIcon: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
});
