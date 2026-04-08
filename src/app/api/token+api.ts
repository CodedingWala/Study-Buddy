import { StreamChat } from "stream-chat";

const API_KEY = process.env.EXPO_PUBLIC_STREAME_API_KEY as string;  // ✅ lowercase string
const SECRET_KEY = process.env.STREAME_API_SECRETE as string;       // ✅ lowercase string

export async function POST(request: Request) {
    try {
        const client = StreamChat.getInstance(API_KEY as any, SECRET_KEY as any);
        const body = await request.json();
        const userId = body?.userId;
        
        // ✅ Validate userId
        if (!userId) {
            return Response.json(
                { error: "UserId is required" },
                { status: 400 }
            );
        }
        
        // ✅ Generate token
        const token = client.createToken(userId);
        
        // ✅ Return token response
        return Response.json(
            { token, userId },
            { status: 200 }
        );
        
    } catch (error) {
        console.error("Error generating token:", error);
        
        // ✅ Return error response
        return Response.json(
            { 
                error: "Failed to generate token",
                message: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}