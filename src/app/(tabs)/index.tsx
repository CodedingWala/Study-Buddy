import { View, Text, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons"
import { useAuth, useUser } from '@clerk/expo'
import * as sentry from "@sentry/react-native"
import { ChannelList} from 'stream-chat-expo'
import type { Channel } from "stream-chat";
import { TextInput } from 'react-native-gesture-handler'
import { COLORS } from '@/lib/theme'
import { getGreeting } from '@/lib/Utils'
import { useRouter } from 'expo-router'
import { useAppContext } from '../context/AppContext'

const Home = () => {
  const [Search, setSearch] = useState("")
  const { user } = useUser()
  const router=useRouter()
  const {setChannel}=useAppContext()
  const filters = { members: { $in: [user?.id!] }, type: "messaging" };


   const channelRenderFilterFn = (channels: Channel[]) => {
    if (!Search.trim()) return channels;

    const q = Search.toLowerCase();

    return channels.filter((channel) => {
      const name = (channel.data?.name as string | undefined)?.toLowerCase() ?? "";
      const cid = channel.cid.toLowerCase();
      return name.includes(q) || cid.includes(q);
    });
  };

  return (
    <SafeAreaView className='flex-1 bg-background pt-5'>
      <View className="px-5 pt-3 pb-2">
        <Text className="text-sm text-foreground-muted mb-0.5">
          {getGreeting()}, {user?.firstName}
        </Text>
      </View>

      {/* SEARCH BAR */}
      <View className="flex-row items-center bg-surface mx-5 mb-3 px-3.5 py-3 rounded-[14px] gap-2.5 border border-border">
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          className="flex-1 text-[15px] text-foreground"
          placeholder="Search study rooms..."
          placeholderTextColor={COLORS.textMuted}
          value={Search}
          onChangeText={setSearch}
        />
      </View>
      <View className="flex-row items-center px-5 my-1.5 gap-2">
        <Ionicons name="chatbubbles" size={16} color={COLORS.primaryLight} />
        <Text className="text-[15px] font-semibold text-primary-light">Your Study Sessions</Text>
      </View>
      <ChannelList
        filters={filters}
        onSelect={(channel)=>{
          setChannel(channel)
          router.push(`/channel/${channel?.id}`)
        }}
        options={{ state: true, watch: true }}
        channelRenderFilterFn={channelRenderFilterFn}
        additionalFlatListProps={{
          contentContainerStyle: { flexGrow: 1 },
        }}
      />
    </SafeAreaView>
  )
}

export default Home