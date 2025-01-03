import { getUserByEmail,insertNewUser,getAllUsers } from "@/utils";
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (email) {
        // If email is provided, fetch and return the user by email
        const user = await getUserByEmail(email);
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
            });
        }
        return new Response(JSON.stringify(user), {
            status: 200,
        });
    } else {
        // If no email is provided, return all users
        try {
            const users = await getAllUsers(); // Fetch all users from your database
            return new Response(JSON.stringify(users), {
                status: 200,
            });
        } catch (error) {
            console.error("Error fetching all users:", error);
            return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
                status: 500,
            });
        }
    }
}


export async function POST(request) {
  try {
    const { username, email, bio } = await request.json();

    // Call insertNewUser to create a new user
    console.log("request data is :", { username, email, bio })
    const result = await insertNewUser({ username, email, bio });
    if (result.status === "failure") {
      return new Response(
        JSON.stringify({ message: result.message || "Failed to create user" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user: result.data,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create user" }),
      { status: 500 }
    );
  }
}
