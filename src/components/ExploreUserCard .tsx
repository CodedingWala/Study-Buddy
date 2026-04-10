import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import {UserResponse} from "stream-chat"
import { Image } from 'expo-image'
import {Ionicons} from "@expo/vector-icons"
import { COLORS } from '@/lib/theme'

type ExploreUseCardProps={
    item:UserResponse,
    creating:string | null,
    onstartChat:(value:string)=>void
}

const ExploreUserCard  = ({item,creating,onstartChat}:ExploreUseCardProps) => {
  return (
    <Pressable
    className='flex flex-row items-center bg-surface/10 border border-border rounded-xl my-2 px-2 py-2'
      disabled={creating !== null}
    onPress={()=>onstartChat(item.id)}
    >
    <Image source={item.image} style={{width:60,height:60 ,borderRadius:30}} className='relative'/>
    {item.online && (
      <View className='absolute bg-accent-secondary h-3 w-3 rounded-full bottom-[15px] right-[285px]'/>
    )}
    <View className='flex-1 items-start ml-5'>
      <Text className='text-white text-xl font-semibold'>{item.name || item.id}</Text>
      <Text className='text-foreground-muted text-md'>{item.online? "online" : "offline"}</Text>
    </View>
    {item.id===creating? <View>
      <ActivityIndicator size={"small"}/>
    </View> :
    <View className={`w-9 h-9 border  rounded-full bg-primary/20 items-center justify-center`}>
      <Ionicons name="chatbubble" size={18} color={COLORS.primary} />
    </View>}
    </Pressable>
  )
}

export default ExploreUserCard 