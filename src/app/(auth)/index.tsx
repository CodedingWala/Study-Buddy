import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";
import SocialHooks from '@/hooks/SocialHooks';
import { Ionicons } from "@expo/vector-icons"
import { Image } from 'expo-image';
import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';

const index = () => {
    const { isLoading, UseAuthFunc } = SocialHooks()
    const loading = isLoading != null ? true : false
    return (
        <SafeAreaView className="flex-1">
            <View className="absolute inset-0">
                <LinearGradient
                    colors={["#0F0E17", "#1A1A2E", "#2D1B69", "#1A1A2E", "#0F0E17"]}
                    locations={[0, 0.25, 0.5, 0.75, 1]}
                    style={{ width: "100%", height: "100%" }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
            </View>
            <View className='flex-1 justify-between'>
                <View className=' pt-10 pb-2 items-center'>
                    <View className='bg-primary/10 rounded-lg border border-primary/20 w-16 h-16 items-center justify-center'>
                        <Ionicons name='school' size={30} color={"#A29BFE"} />
                    </View>
                    <Text className="text-3xl font-extrabold text-foreground tracking-tight mt-4 font-mono">
                        StudyBuddy
                    </Text>

                    <Text className="text-foreground-muted text-[15px] mt-1.5 tracking-wide">
                        Learn together, grow together
                    </Text>
                </View>

                <View className="items-center px-6 mt-4">
                    <Image
                        source={require("@/assets/images/auth.png")}
                        style={{ width: 320, height: 350 }}
                        contentFit="cover"
                    />
                </View>

                {/* feature chips */}
                <View className="flex-row flex-wrap justify-center gap-3 px-6 mt-5">
                    {[
                        {
                            icon: "videocam" as const,
                            label: "Video Calls",
                            color: "#A29BFE",
                            bg: "bg-primary/12 border-primary/20",
                        },
                        {
                            icon: "chatbubbles" as const,
                            label: "Study Rooms",
                            color: "#FF6B6B",
                            bg: "bg-accent/12 border-accent/20",
                        },
                        {
                            icon: "people" as const,
                            label: "Find Partners",
                            color: "#00B894",
                            bg: "bg-accent-secondary/12 border-accent-secondary/20",
                        },
                    ].map((chip) => (
                        <View
                            key={chip.label}
                            className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${chip.bg}`}
                        >
                            <Ionicons name={chip.icon} size={14} color={chip.color} />
                            <Text className="text-foreground-muted text-xs font-semibold tracking-wide">
                                {chip.label}
                            </Text>
                        </View>
                    ))}
                </View>

                <View className='mb-6 flex-row items-center'>
                    <View className='flex-1 h-px bg-gray-500' />
                    <Text className='flex-1 text-lg text-gray-600 p-0 m-0 text-center font-semibold'>Continue With</Text>
                    <View className='flex-1 h-px bg-gray-500' />
                </View>

                <View className='flex-row items-center justify-evenly mb-5'>
                    <Pressable
                        className='size-20 bg-white items-center justify-center shadow-white rounded-2xl active:scale-95'
                        disabled={loading}
                        accessibilityRole="button"
                        accessibilityLabel="Continue with Google"
                        onPress={() => !loading && UseAuthFunc("oauth_google")}
                    >
                        {isLoading == "oauth_google" ? <ActivityIndicator
                            size={"large"}
                            color={"gray"}
                        /> : <Image style={{ width: 30, height: 30, objectFit: "contain" }} source={require("@/assets/images/google.png")} />}
                    </Pressable>
                    <Pressable
                        className='size-20 bg-surface items-center justify-center  rounded-2xl active:scale-95'
                        disabled={loading}
                        accessibilityRole="button"
                        accessibilityLabel="Continue with Google"
                        onPress={() => !loading && UseAuthFunc("oauth_apple")}
                    >
                        {isLoading == "oauth_apple" ?
                            <ActivityIndicator
                                size={"large"}
                                color={"gray"}
                            /> :
                            <Ionicons name="logo-apple" size={40} color="#FFFFFE" />
                        }
                    </Pressable>
                    <Pressable
                        className='size-20 bg-surface items-center justify-center  rounded-2xl active:scale-95'
                        disabled={loading}
                        accessibilityRole="button"
                        accessibilityLabel="Continue with Google"
                        onPress={() => !loading && UseAuthFunc("oauth_github")}
                    >
                        {isLoading == "oauth_github" ?
                            <ActivityIndicator
                                size={"large"}
                                color={"gray"}
                            /> :
                            <Ionicons name="logo-github" size={40} color="#FFFFFE" />
                        }
                    </Pressable>
                </View>
                <Text className="text-foreground-subtle text-[11px] text-center leading-4">
                    By continuing, you agree to our{" "}
                    <Text className="text-primary-light">Terms of Service</Text> and{" "}
                    <Text className="text-primary-light">Privacy Policy</Text>
                </Text>
            </View>

        </SafeAreaView>
    )
}

export default index