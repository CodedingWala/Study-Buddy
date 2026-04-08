import {StreamChat} from "stream-chat"

const API_KEY=process.env.EXPO_PUBLIC_STREAME_API_KEY as String
const SECRET_KEY= process.env.STREAME_API_SECRETE as String

export async  function POST(request: Request) {
    const client=StreamChat.getInstance(API_KEY as any, SECRET_KEY as any)
    const body=await request.json()
    const userId=body?.userId;
    if(!userId){
        Response.json({error:"UserId are required"},{status:400});
    }
    const token=client.createToken(userId);
    Response.json({token},{status:200})
  return Response.json({ hello: 'world' });
}