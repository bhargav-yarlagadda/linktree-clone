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


export async function updateUserByEmail(email, updatedData) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email: email }).lean();

    // Check if the user exists
    if (!user) {
      return { status: "failure", message: "User not found" };
    }

    // Update the user with the new data
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: updatedData },
      { new: true } // Return the updated document
    );

    // Return success with updated user data
    return { status: "success", data: updatedUser };
  } catch (err) {
    console.error("Error updating user:", err);
    return { status: "failure", error: err.message || "An error occurred while updating the user" };
  }
}

export async function updateLinks(email, links) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Validate input
    if (!email || !Array.isArray(links)) {
      throw new Error("Invalid email or links data");
    }

    // Prepare the update object
    const updatedData = { links };

    // Update only the links field
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: updatedData }, // Updates only the `links` field
      { new: true } // Returns the updated document
    );

    // Check if the user was updated
    if (!updatedUser) {
      throw new Error("User not found or could not be updated");
    }

    // Return the updated user
    return { status: "success", data: updatedUser };
  } catch (error) {
    console.error("Error updating links:", error);
    return { status: "failure", message: error.message || "An error occurred" };
  }
}


export async function deleteLink(email, url) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // Filter out the link with the given URL
    const updatedLinks = user.links.filter(link => link.url !== url);

    // Update the user's links field
    const updatedUser = await User.findByIdAndUpdate(user._id, { links: updatedLinks }, { new: true });

    // Check if the update was successful
    if (updatedUser) {
      return { success: true, message: 'Link deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete link' };
    }
  } catch (error) {
    console.error('Error deleting link:', error);
    return { success: false, message: error.message };
  }
}

  
  
  