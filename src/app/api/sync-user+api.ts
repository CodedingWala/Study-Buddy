import {StreamChat} from "stream-chat"
import * as sentry from "@sentry/react-native"
const API_KEY=process.env.EXPO_PUBLIC_STREAME_API_KEY as String
const SECRET_KEY= process.env.STREAME_API_SECRETE as String

export async function POST(request:Request){
    const client= StreamChat.getInstance(API_KEY as any,SECRET_KEY as any)
    const body=await request.json()
    const {userId,name ,image}=body
    if(!userId){
        Response.json({message:"UserId are required"},{status:404})
    }
    try {
        client.upsertUser({
            id:userId,
            name:name,
            image:image
        })
        Response.json({success:true},{status:200})
    } catch (error) {
        console.log("Error in saving the userInfo in stream ",error)
        sentry.captureException(error,{
            extra:{name,image,userId}
        })
        Response.json({message:"not able to sign in ",error})
    }
}