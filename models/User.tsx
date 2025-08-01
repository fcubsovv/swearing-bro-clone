import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

const UserShema = new mongoose.Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.User || mongoose.model("User", UserShema);

export default User;
