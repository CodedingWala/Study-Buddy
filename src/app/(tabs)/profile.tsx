import { View, Text, Pressable, Alert } from 'react-native'
import React, { use } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useUser } from '@clerk/expo'
import { Image } from 'expo-image'
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from '@/lib/theme'
import * as sentry from "@sentry/react-native"

const Profile = () => {
  const { signOut } = useAuth()
  const { user } = useUser()
  const MENU_ITEMS = [
    { icon: "notifications-outline", label: "Notifications", color: COLORS.primary },
    { icon: "bookmark-outline", label: "Saved Resources", color: COLORS.accent },
    { icon: "time-outline", label: "Study History", color: COLORS.accentSecondary },
    { icon: "settings-outline", label: "Settings", color: COLORS.textMuted },
  ];
  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className='m-2 ml-3 w-full'>
        <Text className='text-2xl text-white font-semibold'>Profile</Text>
      </View>
      <View className='items-center'>
        <View className='relative'>
          <Image style={{ width: 90, height: 90, borderRadius: 50 }} className='' source={user?.imageUrl} />
          <View className="absolute bottom-[10px] right-[2px] h-[18px] w-[18px] rounded-[9px] bg-accent-secondary border-[3px] border-background" />
        </View>
        <Text className="text-2xl font-bold text-foreground">
          {user?.fullName || user?.username || "Student"}
        </Text>

        <Text className="mt-0.5 text-base text-foreground-muted">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
        <View className="mt-3 flex-row items-center gap-1.5 rounded-full bg-[#FDCB6E1E] px-3.5 py-1.5">
          <Ionicons name="flame" size={16} color="#FDCB6E" />
          <Text className="text-sm font-semibold text-[#FDCB6E]">7 day study streak</Text>
        </View>
      </View>

      <View className='flex flex-row mt-5 items-center justify-between gap-5 mx-3'>

        <View className=' flex-1 bg-surface items-center justify-center p-4 border border-border rounded-xl'>
          <Text className='text-2xl text-primary font-bold'>24</Text>
          <Text className='text-foreground-muted text-xs mt-1'>sessions </Text>
        </View>
        <View className=' flex-1 bg-surface items-center justify-center p-4 border border-border rounded-xl'>
          <Text className='text-2xl text-primary font-bold'>12</Text>
          <Text className='text-foreground-muted text-xs mt-1'>partners </Text>
        </View>
        <View className=' flex-1 bg-surface items-center justify-center p-4 border border-border rounded-xl'>
          <Text className='text-2xl text-primary font-bold'>48</Text>
          <Text className='text-foreground-muted text-xs mt-1'>study times </Text>
        </View>

      </View>
      <View className='mt-5 gap-1 px-3'>
        {MENU_ITEMS.map((item, i) => (
          <Pressable 
          onPress={()=>{
            Alert.alert(`Alert`, `You cliked ${item.label}`)
          }}
          key={i} className='flex flex-row mb-1.5 items-center justify-center bg-surface border border-border p-4 rounded-xl '>
            <View className='h-10 w-10 items-center justify-center rounded-xl' style={{ backgroundColor: `${item.color}15` }}>
              <Ionicons name={item.icon as any} size={22} color={item.color} />
            </View>
            <Text className='flex-1 ml-2 text-base font-medium text-foreground'>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSubtle} />
          </Pressable>
        ))}
      </View>

      <Pressable
        className="mt-6 mx-5 flex-row items-center justify-center gap-2 rounded-xl border border-[#FF6B6B33] bg-surface px-4 py-4"
        onPress={async () => {
          try {
            Alert.alert("SignOut", "Are you sure", [
              {
                text: "Cancle",
                onPress: () => {
                  console.log("Cancle button pressed")
                },
                style: "cancel"
              },
              {
                text: "Singout",
                onPress: async () => {
                  await signOut();
                  sentry.logger.info("User signed out successfully", { userId: user?.id });
                },
                style: "destructive"
              }
            ])
          } catch (error) {
            sentry.logger.error("Error signing out", { error, userId: user?.id });
            sentry.captureException(error);
            Alert.alert("Error", "An error occurred while signing out. Please try again.");
          }
        }}
      >
        <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
        <Text className="text-base font-semibold text-danger">Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Profile