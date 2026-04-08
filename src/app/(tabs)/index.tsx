import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from '@clerk/expo'
import * as sentry from "@sentry/react-native"

const Home = () => {
  const { signOut } = useAuth()
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => signOut()}
        className="m-32"
      >
        <Ionicons name='log-out' size={40} color={"#5D4FE8"} />
      </Pressable>

      <Pressable
        onPress={() =>
          Alert.alert("Send Message", "Are You Sure you want to share the message to developer about an issue", [
            {
              text: "Send",
              onPress: () => {
                sentry.captureException(new Error("error from user"))
              },
              style: "destructive"
            },
            {
              text: "Cancle",
              onPress: () => {
                console.log("Cancle button clicked")
              },
              style: "cancel"
            }
          ])}
        className="m-32"
      >
        <Ionicons name="help-circle" size={40} color={"#5D4FE8"} />
      </Pressable>
    </SafeAreaView>
  )
}

export default Home