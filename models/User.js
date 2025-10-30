import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
  // Student fields
  rollNumber: String,
  branch: String,
  cgpa: Number,
  // Company fields
  company: String,
  phone: String,
  // Company Profile (detailed information)
  companyProfile: {
    companyName: String,
    industry: String,
    companySize: String,
    location: String,
    website: String,
    description: String,
    contactEmail: String,
    contactPhone: String,
    foundedYear: Number,
    logo: String
  }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);