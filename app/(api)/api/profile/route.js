import { NextResponse } from 'next/server'; // Import NextResponse
import { updateLinks, updateUserByEmail } from '@/utils';

export async function POST(req) {
  try {   
    const { email, username, bio, profilePicture, backgroundImage, links } = await req.json(); // Include links in the request body

    // Validate input
    if (!email || !username) {
      return NextResponse.json({ message: "Email and username are required" }, { status: 400 });
    }

    // Prepare the data to be updated
    const updatedData = {
      username,
      bio: bio || "",
      profilePicture: profilePicture || "",
      backgroundImage: backgroundImage || "",
      links: links || [], // Add links field
    };

    // Call your update function from utils
    const updateResponse = await updateUserByEmail(email, updatedData);

    if (updateResponse.status === "failure") {
      return NextResponse.json({ message: updateResponse.message || "Failed to update user" }, { status: 400 });
    }

    // If the update was successful
    return NextResponse.json({
      message: "Profile updated successfully",
      user: updateResponse.data,
    });

  } catch (err) {
    console.error("Error in API:", err);
    return NextResponse.json({ message: "An error occurred while updating the profile" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { email, links } = await req.json(); // Expect `email` and `links` in the request body

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    if (!links || !Array.isArray(links)) {
      return NextResponse.json(
        { message: "Links must be a valid array" },
        { status: 400 }
      );
    }

    // Call your updateLinks function
    const updateResponse = await updateLinks(email, links);

    if (updateResponse.status === "failure") {
      return NextResponse.json(
        { message: updateResponse.message || "Failed to update links" },
        { status: 400 }
      );
    }

    // If the update was successful
    return NextResponse.json({
      message: "Links updated successfully",
      user: updateResponse.data,
    });
  } catch (err) {
    console.error("Error in PATCH API:", err);
    return NextResponse.json(
      { message: "An error occurred while updating links" },
      { status: 500 }
    );
  }
}
