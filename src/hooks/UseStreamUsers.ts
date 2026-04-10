import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { StreamChat, UserResponse } from "stream-chat";

const useStreamUsers = (client: StreamChat, userId: string ) => {
    const [isLoading, setisLoading] = useState(false)
    const [users, setuser] = useState<UserResponse[]>([])
    useEffect(() => {
        setisLoading(true)
        const fetchUser = async () => {
            try {
                const response = await client.queryUsers(
                    { id: { $nin: [userId] }, role: { $nin: ["admin"] } } as any,
                    { last_active: -1 },
                    { limit: 50 },
                );
                setuser(response.users)
            } catch (error) {
                console.log("Error: ", error)
            } finally {
                setisLoading(false)
            }
        }
        if (userId) fetchUser()
    }, [userId, client])

    return { users, isLoading }
}

export default useStreamUsers