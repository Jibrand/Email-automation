import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: { type: Number, },
  avatar: {
    type: String,  
  }

});

const Users = mongoose.model("Users", userSchema);
export default Users