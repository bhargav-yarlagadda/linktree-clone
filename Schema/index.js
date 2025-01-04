import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure username is unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    profilePicture: {
      type: String, // URL of the profile picture (optional)
      default: null,
    },
    backgroundImage: {
      type: String, // URL of the background image (optional)
      default: null,
    },
    bio: {
      type: String, // User bio (optional)
      default: "",
    },
    theme: {
      backgroundColor: {
        type: String, 
        default: "#ffffff", // Default background color
      },
      textColor: {
        type: String, 
        default: "#000000", // Default text color
      },
    },
    links: [
      {
        title: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        order: {
          type: Number,
          default: 0, // To specify the order of links (optional)
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
export default mongoose.models.User || mongoose.model("User", userSchema);
