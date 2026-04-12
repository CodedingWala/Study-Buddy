import { View, Text, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useAppContext } from '@/app/context/AppContext'
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'
import { useNavigation, useRouter } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { COLORS } from '@/lib/theme'
import { Ionicons } from "@expo/vector-icons"
import { Image } from 'expo-image'
import { EmptyState } from '@/components/EmptyState'

const index = () => {
  const { channel, setThread } = useAppContext()
  const { client } = useChatContext()
  const router = useRouter()
  const navigation = useNavigation()
  const headerHeight=useHeaderHeight()

  let partnerImageIurl = ""
  let partnerName = ""

  if (client && channel) {
    const members = Object.values(channel?.state.members!)
    const ChatPartner = members.find((m) => {
      return m.user_id != client.userID
    })
    partnerName = ChatPartner?.user?.name!;
    partnerImageIurl = ChatPartner?.user?.image || "";
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: COLORS.background
      },
      headerTintColor: COLORS.text,
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} className="ml-2 flex-row items-cente">
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View className='flex-1 flex-row items-center justify-center gap-3'>
          {partnerImageIurl ?
           <View>
            <Image
            style={{height:40,width:40,borderRadius:20}}
            source={partnerImageIurl} />
          </View> : 
          <View className={`w-12 h-12 border border-border rounded-full flex items-center justify-center bg-[#6C5CE7]`}>
            <Text className='text-xl text-white font-bold'>{partnerName[0]}</Text>
          </View>}
            <View>
            <Text className='text-2xl text-white font-semibold'>{partnerName}</Text>
            </View>
        </View>
        
      ),
      headerRight:()=>(
        <Pressable onPress={()=>{
            // router.push(`/channel/${channel?.cid}/thread/${thread?.cid}`);
        }}>
          <Ionicons name="videocam-outline" size={30} color={COLORS.primary} />
        </Pressable>
      )

    })
  }, [navigation])

if(!channel){
  return <ActivityIndicator size={"small"} />
}

  return (
    <View className='flex-1 bg-border'>
      <Channel
       channel={channel}
        keyboardVerticalOffset={headerHeight}
        EmptyStateIndicator={()=>(
        <EmptyState
            icon="book-outline"
            title="No messages yet"
            subtitle="Start a study conversation!"
          />
        )}

      >
         <MessageList
          onThreadSelect={(thread) => {
            setThread(thread);
            router.push(`/channel/${channel?.cid}/thread/${thread?.cid}`);
          }}
        />

        <View className="pb-10 bg-surface">
          <MessageInput audioRecordingEnabled />
        </View>
      </Channel>
    </View>
  )
}

export default index