import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';

const { width, height } = Dimensions.get('window');

// Reusable dotted grid block, matching the corner patterns in the reference design
function DotGrid({ rows = 5, cols = 9, style }) {
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(<View key={`${r}-${c}`} style={styles.dot} />);
    }
  }
  return (
    <View style={[styles.dotGrid, { width: cols * 16 }, style]}>
      {dots}
    </View>
  );
}

export default function SplashScreenView({ onFinish }) {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onFinish && onFinish();
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.screen}>
      {/* Corner dot patterns */}
      <DotGrid rows={5} cols={9} style={styles.dotsTopLeft} />
      <DotGrid rows={4} cols={3} style={styles.dotsTopRight} />
      <DotGrid rows={4} cols={6} style={styles.dotsBottomLeft} />
      <DotGrid rows={5} cols={9} style={styles.dotsBottomRight} />

      <Animated.View style={[styles.centerWrap, { opacity: fade }]}>
        <View style={styles.logoRow}>
          <View style={styles.logoMark} />
          <Text style={styles.logoText}>airtel</Text>
        </View>
        <Text style={styles.tagline}>
          A REASON TO <Text style={styles.taglineBold}>IMAGINE</Text>
        </Text>
        <View style={styles.spinner} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.airtelRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotGrid: { flexDirection: 'row', flexWrap: 'wrap', position: 'absolute' },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
    margin: 6,
  },
  dotsTopLeft: { top: 50, left: 20 },
  dotsTopRight: { top: height * 0.25, right: -10 },
  dotsBottomLeft: { bottom: height * 0.22, left: 0 },
  dotsBottomRight: { bottom: 60, right: 10 },
  centerWrap: { alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
    transform: [{ scaleX: 1.3 }, { rotate: '-30deg' }],
  },
  logoText: { color: colors.white, fontSize: 52, fontWeight: '800' },
  tagline: { color: colors.white, fontSize: fontSizes.md, marginTop: spacing.md, letterSpacing: 1 },
  taglineBold: { fontWeight: '800' },
  spinner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.white,
    borderTopColor: 'transparent',
    marginTop: spacing.xl,
  },
});
