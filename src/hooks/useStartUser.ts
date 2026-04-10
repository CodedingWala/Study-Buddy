import { View, Text } from 'react-native'
import React from 'react'
import { Channel, StreamChat } from "stream-chat"
import { useRouter } from 'expo-router'
type startUserType = {
  client: StreamChat,
  userId: string,
  setChannel: (channel: Channel) => void,
  setCreating: (value: string | null) => void
}

const useStartUser = ({ client, userId, setChannel, setCreating }: startUserType) => {
  const router = useRouter()
  const handlerStartChat = async (targetId: string) => {
    try {
      setCreating(targetId)
      const channel = client.channel("messaging", { members: [userId, targetId] })
      channel.watch()
      setChannel(channel)
      // router.push(`/channel/${channel.cid}`)
    } catch (error) {
      console.log("Error in useStartUser: ", error)
    } finally {
      setCreating(null)
    }
  }
  return {handlerStartChat}

}

export default useStartUser