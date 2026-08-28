import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import SplashScreenView from './src/screens/SplashScreenView';
import LoginScreen from './src/screens/LoginScreen';
import { loadAuth } from './src/data/authStore';
import { loadRegion } from './src/data/regionStore';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [auth, setAuth] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    Promise.all([loadAuth(), loadRegion()]).then(([savedAuth, savedRegion]) => {
      setAuth(savedAuth);
      setRegion(savedRegion);
    });
  }, []);

  if (showSplash || auth === null || region === null) {
    return (
      <SafeAreaProvider>
        <SplashScreenView onFinish={() => setShowSplash(false)} />
      </SafeAreaProvider>
    );
  }

  if (!auth.isLoggedIn) {
    return (
      <SafeAreaProvider>
        <LoginScreen
          initialRegion={region}
          onRegionChanged={setRegion}
          onLoggedIn={({ phone }) => setAuth({ isLoggedIn: true, phone })}
        />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
