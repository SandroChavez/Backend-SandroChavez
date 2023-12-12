import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    require: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  isGithub:{
    type: Boolean,
    default: false
  },
  isGoogle:{
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    enum: ["ADMIN","USER_PREMIUM","USER_FREE"],
    default: "USER_FREE"
  },
  carts:[
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Carts",
    }
  ]
});

export const usersModel = mongoose.model("Users", usersSchema);