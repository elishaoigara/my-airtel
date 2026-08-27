import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import SplashScreenView from './src/screens/SplashScreenView';
import LoginScreen from './src/screens/LoginScreen';
import { loadAuth } from './src/data/authStore';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    loadAuth().then(setAuth);
  }, []);

  if (showSplash || auth === null) {
    return (
      <SafeAreaProvider>
        <SplashScreenView onFinish={() => setShowSplash(false)} />
      </SafeAreaProvider>
    );
  }

  if (!auth.isLoggedIn) {
    return (
      <SafeAreaProvider>
        <LoginScreen onLoggedIn={(phone) => setAuth({ isLoggedIn: true, phone })} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
