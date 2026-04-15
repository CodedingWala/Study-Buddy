import { View, Text, TouchableOpacity, Pressable, ActivityIndicator, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useAppContext } from '@/app/context/AppContext'
import { Channel, MessageInput, MessageList, Thread, useChatContext } from 'stream-chat-expo'
import { useNavigation, useRouter } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { COLORS } from '@/lib/theme'
import { Ionicons } from "@expo/vector-icons"
import { Image } from 'expo-image'
import { EmptyState } from '@/components/EmptyState'
import { SafeAreaView } from 'react-native-safe-area-context'



const index = () => {
  const { channel, setThread, thread } = useAppContext()
  const { client } = useChatContext()
  const router = useRouter()
  const navigation = useNavigation()
  const headerHeight = useHeaderHeight()

  let partnerImageIurl = ""
  let partnerName = ""

  if (client && channel && channel.state?.members) {
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
          router.push({
            pathname:"/call/[callId]",
            params:{callId:channel?.id}
          });
         }}>
           <Ionicons name="videocam-outline" size={30} color={COLORS.primary} />
         </Pressable>
       )
 
     })
   }, [navigation])


  if (!channel) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  }
  return (
    <SafeAreaView className="flex-1 bg-border">
      <Channel
        channel={channel}
        keyboardVerticalOffset={headerHeight}
        thread={thread}
        threadList
        EmptyStateIndicator={() => (
          <EmptyState
            icon="book-outline"
            title="No messages yet"
            subtitle="Start a study conversation!"
          />
        )}
      >
        <View className="flex-1 justify-start">
          <Thread onThreadDismount={() => setThread(null)} />
        </View>
      </Channel>
    </SafeAreaView>
  )
}

export default index