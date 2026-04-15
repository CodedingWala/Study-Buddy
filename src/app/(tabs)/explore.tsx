import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TextInput } from 'react-native'
import { useChatContext } from 'stream-chat-expo'
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from '@/lib/theme'
import useStreamUsers from '@/hooks/UseStreamUsers'
import { useUser } from '@clerk/expo'
import ListEmptyComponent from '@/components/ListEmptyComponent'
import useStartUser from '@/hooks/useStartUser'
import { useAppContext } from '../context/AppContext'
import ExploreUserCard from '@/components/ExploreUserCard '
import {UserResponse}from "stream-chat"

const Explore = () => {
  const {user}=useUser()
  const {client}=useChatContext()
  const {setChannel}=useAppContext()
  const [search, setsearch] = useState("")
  const [creating, setCreating] = useState<string | null>(null)
  const userId = user?.id ?? "";
  const {users,isLoading}=useStreamUsers(client ,userId)


  const filteredUser = !search.trim()? users : users?.filter((u)=>(
    u.name?.toLowerCase().includes(search.toLocaleLowerCase()) || 
    u.id.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    
  ))

  const {handlerStartChat}=useStartUser({client, userId, setChannel,setCreating })

  const renderUser=({item}:{item:UserResponse})=>{
    return(
       <ExploreUserCard
      item={item} 
      creating={creating} 
      onstartChat={handlerStartChat} 
    />
    )
  }
  return (
    <SafeAreaView className='bg-background flex-1'>
      <View className='ml-4 gap-2'>
        <Text className="text-3xl font-semibold text-white">Explore</Text>
        <Text className='text-md text-foreground-muted'>find people and start chatting</Text>
      </View>
      <View className='m-4 border border-border rounded-lg flex flex-row items-center bg-surface px-4 py-[1px]'>
        <View className='flex-1 flex-row items-center gap-2'>
          <Ionicons name='search' size={20} color={COLORS.textMuted} />
          <TextInput
            value={search}
            onChangeText={setsearch}
            placeholder='search people'
            placeholderTextColor={"#A7A9BE"}
            className=' text-foreground text-[15px] w-full h-full'
            autoCapitalize="none"
            autoCorrect={false}
            
          />
        </View>
        {search.trim() && 
          <Pressable 
          onPress={()=>setsearch("")}
          className='items-center'>
            <Ionicons name="close-circle" size={20} color={"white"} />
          </Pressable>
        }
      </View>
      <View className=''> 
          <FlatList
          data={filteredUser}
          keyExtractor={(item)=>item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<ListEmptyComponent />}
          renderItem={renderUser}
          />
      </View>
    </SafeAreaView>
  )
}

export default Explore