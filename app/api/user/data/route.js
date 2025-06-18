import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    
    try {
        const { userId } = getAuth(request);

        await connectDB();
        const user = await User.findById(userId)

        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }
        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 });
    }
}