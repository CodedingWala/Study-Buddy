import { StreamChat } from "stream-chat";
import * as sentry from "@sentry/react-native";

const API_KEY = process.env.EXPO_PUBLIC_STREAME_API_KEY as string;  // ✅ lowercase string
const SECRET_KEY = process.env.STREAME_API_SECRETE as string;       // ✅ lowercase string

export async function POST(request: Request) {
    const client = StreamChat.getInstance(API_KEY as any, SECRET_KEY as any);
    const body = await request.json();
    const { userId, name, image } = body;
    
    if (!userId) {
        // ✅ Added return here
        return Response.json(
            { message: "UserId is required" }, 
            { status: 400 }  // 400 is better than 404 for missing data
        );
    }
    
    try {
        // ✅ Added await here - upsertUser is async
        await client.upsertUser({
            id: userId,
            name: name,
            image: image
        });
        
        return Response.json({ success: true }, { status: 200 });
        
    } catch (error) {
        console.log("Error in saving the userInfo in stream ", error);
        sentry.captureException(error, {
            extra: { name, image, userId }
        });
        
        return Response.json(
            { 
                message: "Not able to sign in", 
                error: error instanceof Error ? error.message : "Unknown error" 
            },
            { status: 500 }
        );
    }
}