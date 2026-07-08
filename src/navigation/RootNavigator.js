import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { colors, fontSizes } from '../theme/theme';
import { LoadingProvider, useLoading } from '../context/LoadingContext';

import HomeScreen from '../screens/HomeScreen';
import AirtelMoneyScreen from '../screens/AirtelMoneyScreen';
import HomeWifiScreen from '../screens/HomeWifiScreen';
import HelpScreen from '../screens/HelpScreen';
import MoreScreen from '../screens/MoreScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import TransactionDetailsScreen from '../screens/TransactionDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Airtel Money tab wraps a stack so we can push into Transaction History / Details
function AirtelMoneyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AirtelMoneyHome" component={AirtelMoneyScreen} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailsScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}

// More tab wraps a stack so we can push into Settings
function MoreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoreHome" component={MoreScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function Tabs() {
  const { triggerLoading } = useLoading();

  return (
    <Tab.Navigator
      screenListeners={{
        // Fires on every tab press (including re-tapping the active tab),
        // giving each switch a brief "fetching" feel instead of an instant swap.
        tabPress: () => triggerLoading(),
      }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: { fontSize: fontSizes.xs, marginBottom: 4 },
        tabBarStyle: { height: 60, paddingTop: 6, paddingBottom: 6 },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <Ionicons name="home" size={22} color={color} />;
            case 'Airtel Money':
              return <MaterialCommunityIcons name="wallet" size={22} color={color} />;
            case 'Home-WiFi':
              return <Ionicons name="wifi" size={22} color={color} />;
            case 'Help':
              return <Ionicons name="help-circle" size={22} color={color} />;
            case 'More':
              return <FontAwesome5 name="bars" size={18} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Airtel Money" component={AirtelMoneyStack} />
      <Tab.Screen name="Home-WiFi" component={HomeWifiScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
      <Tab.Screen name="More" component={MoreStack} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <LoadingProvider duration={450}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </LoadingProvider>
  );
}