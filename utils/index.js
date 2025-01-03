'use server'
import connectToDatabase from "@/mongoDB";
import User from "@/Schema"
export async function getUserByEmail(email) {


  try {
    // Connect to the database
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return { error: "User not found" };
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "An error occurred while fetching the user" };
  }
}


