import React, { createContext, useContext, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { colors } from '../theme/theme';

const LoadingContext = createContext({ triggerLoading: () => {} });

export function useLoading() {
  return useContext(LoadingContext);
}

// Shows a brief translucent overlay + spinner so switching tabs/pages feels like
// it's actually fetching something, instead of an instant, static swap.
export function LoadingProvider({ children, duration = 450 }) {
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimer = useRef(null);

  const triggerLoading = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisible(true);
    opacity.setValue(1);
    hideTimer.current = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, duration);
  }, [duration, opacity]);

  return (
    <LoadingContext.Provider value={{ triggerLoading }}>
      {children}
      {visible ? (
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.overlay, { opacity }]}>
          <ActivityIndicator size="large" color={colors.airtelRed} />
        </Animated.View>
      ) : null}
    </LoadingContext.Provider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(244,244,244,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});