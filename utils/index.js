'use server'
import { connectToDatabase } from "@/mongoDB";
import User from "@/Schema"


export async function getUserByEmail(email) {
  try {
    // Connect to the database
    await connectToDatabase();
    // Find the user by email
    const user = await User.findOne({ email: email }).lean()
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

export async function getAllUsers() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Check if the user already exists by email or username
    const existingUsers = await User.find();

    if (existingUsers) {
      return { status: "success", users:existingUsers};
    }
  } catch (err) {
    console.error("Error in uploading data:", err);
    // Return failure with error details
    return { status: "failure", error: err.message || "Failed to create user" };
  }
}

export async function insertNewUser(newUser) {
  try {
    await connectToDatabase();
    
    const existingUser = await User.findOne({
      $or: [{ email: newUser.email }, { username: newUser.username }],
    });

    if (existingUser) {
      return { status: "failure", message: "Username or email is already taken" };
    }

    const response = await User.create({
      username: newUser.username,
      email: newUser.email,
      bio: newUser.bio,
    });

    return { status: "success", data: response };
  } catch (err) {
    console.error("Error in uploading data:", err);
    // Log the detailed validation error if it's a mongoose validation error
    if (err.name === "ValidationError") {
      return { status: "failure", error: `Validation failed: ${err.message}` };
    }
    return { status: "failure", error: err.message || "Failed to create user" };
  }
}
