import { NextResponse } from "next/server";
import { getUserByUsername } from "@/utils";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      {
        status: false,
        message: "Username parameter is required.",
      },
      { status: 400 } // Bad Request
    );
  }

  try {
    const response = await getUserByUsername(username);

    if (!response.status) {
      return NextResponse.json(
        {
          status: false,
          message: response.message || "User does not exist.",
        },
        { status: 404 } // Not Found
      );
    }

    return NextResponse.json(
      {
        status: true,
        user: response.data, // Return user data
      },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        status: false,
        message: "An error occurred while fetching the user.",
      },
      { status: 500 } // Internal Server Error
    );
  }
}
