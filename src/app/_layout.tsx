import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import "../../global.css"
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://eaa9af32997836fe4b7dac2ec6811366@o4511172701716480.ingest.us.sentry.io/4511179291033600',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
export default function RootLayout() {
  return (
  <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
     <GestureHandlerRootView className="flex-1">
     
    <Stack screenOptions={{headerShown:false}}>
       <Stack.Screen name="(auth)" options={{title:"Auth"}} />
       <Stack.Screen name="(tabs)" options={{title:"Tabs"}} />
    </Stack>
      </GestureHandlerRootView>
  </ClerkProvider>
  )
}
