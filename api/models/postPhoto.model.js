import mongoose from "mongoose";
const { Schema } = mongoose;

const postPhoto = new Schema(
	{
		userId: {
			type: String,
      required: true,
		},
		creator: {
			type: String,
      required: true,
		},
		title: {
			type: String,
      required: true,
		},
		prompt: { 
			type: String, 
			required: true, 
		},
		photoUrl: {
			type: String,
      required: false,
		},
    desc: {
      type: String,
      required: false,
    },
    
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("PostPhoto", postPhoto);