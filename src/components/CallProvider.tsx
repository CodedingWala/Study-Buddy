import { useUser } from "@clerk/expo";
import { Call } from "@stream-io/video-react-native-sdk"
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    StreamVideo,
    StreamVideoClient,
    StreamCall,
    useCalls,
    RingingCallContent,
} from "@stream-io/video-react-native-sdk";

// let StreamVideo: any = null;
// let StreamVideoClient: any = null
// let StreamCall: any = null;
// let useCalls: any = null;
// let RingingCallContent: any = null;


// try {
//     const sdk = require("@stream-io/video-react-native-sdk")
//     StreamVideo = sdk.StreamVideo;
//     StreamVideoClient = sdk.StreamVideoClient;
//     StreamCall = sdk.StreamCall;
//     useCalls = sdk.useCalls;
//     RingingCallContent = sdk.RingingCallContent;

// } catch (error) {
//     console.log("Error in loading the stream-io/video-react-native-sdk", error)
// }

const sdkAvaliable = !!StreamVideo && !!StreamVideoClient
const apiKey= process.env.EXPO_PUBLIC_STREAME_API_KEY!

const RingingCalls = () => {
    if (!useCalls) return null;
    const calls=useCalls()
    const incommmingCalls = calls.filter((c: Call) => (c.ringing))
    const ringingCall = incommmingCalls[0]
    if (!ringingCall) return

    return (
        <StreamCall call={ringingCall} >
            <SafeAreaView style={StyleSheet.absoluteFill} >
                <RingingCallContent />
            </SafeAreaView>
        </StreamCall>
    )
}
const CallProvider = ({ children }: { children: React.ReactNode }) => {
    const [videoClient, setVideoClient] = useState<any>(null)
    const { user ,isLoaded} = useUser()
    useEffect(() => {
        if(!user || !isLoaded || !sdkAvaliable) return
        const tokenProvider = async () => {
            const response = await fetch("/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?.id })
            })
            const data = await response.json()
            const token = data.token
            return token
        }

        const client = StreamVideoClient.getOrCreateInstance({
            apiKey:apiKey,
            user: {
                id: user?.id,
                name: user?.fullName || user?.firstName || "UnKnown",
                image: user?.imageUrl,
            },
            tokenProvider
        })
        setVideoClient(client)


        return () => {
            client.disconnectUser()
            setVideoClient(null)
        }
    }, [user,isLoaded,apiKey])

    if(!user || !isLoaded || !sdkAvaliable || !apiKey){
        return <>{children}</>
    }
    if(!videoClient){
        return(
            <View className="flex-1">
                <ActivityIndicator size={"small"} />
            </View>
        )
    }

    return <StreamVideo client={videoClient} >
        {children}
        <RingingCalls/>
    </StreamVideo>

}

export default CallProvider