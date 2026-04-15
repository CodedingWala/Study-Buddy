import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSSO } from '@clerk/expo'
import * as Linking from "expo-linking"

const SocialHooks = () => {
    const [isLoading, setisLoading] = useState<String | null>(null)
    const { startSSOFlow } = useSSO()
    const UseAuthFunc = async (strategy: "oauth_google" | "oauth_apple" | "oauth_github") => {
        if (isLoading) return
        setisLoading(strategy)
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy,
                redirectUrl: Linking.createURL('/(tabs)/', { scheme: 'studybuddy' })
            })
            if (!createdSessionId || !setActive) {
                const provider = strategy === "oauth_apple" ? "Apple" : strategy === "oauth_google" ? "Google" : "Github"
                Alert.alert("Authentication Failed", `${provider} Authentication failed`)
                return
            }
            await setActive({ session: createdSessionId })
        } catch (error) {
            console.log("Error : ", error)
            Alert.alert("Error", `${error} `)
        } finally {
            setisLoading(null)
        }
    }

    return { isLoading, UseAuthFunc }
}

export default SocialHooks