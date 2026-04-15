import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { View } from 'react-native'
export default function AuthRoutesLayout() {
  const { isSignedIn,isLoaded } = useAuth()
  if(!isLoaded){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6C5CE7" />
      </View>
    )
  }

  if (isSignedIn) {
    return <Redirect href={'/(tabs)'} />
  }

  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' options={{title:"Login Page"}} />
    </Stack>
  )
}