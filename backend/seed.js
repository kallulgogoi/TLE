const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Subject = require("./models/Subject");

dotenv.config();

const subjectsData = [
  {
    name: "DSA",
    description:
      "Master Data Structures & Algorithms. Covers Arrays, Trees, Graphs, DP, and more with adaptive challenges.",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/hierarchical-structure_pkajm5.png",
    totalLevels: 10,
  },
  {
    name: "OS",
    description:
      "Understand Operating Systems concepts: Process Management, Threading, Deadlocks, and Memory Management.",
    icon: "https://cdn-icons-png.flaticon.com/512/2172/2172891.png",
    totalLevels: 10,
  },
  {
    name: "CN",
    description:
      "Dive into Computer Networks. Learn about OSI Model, TCP/IP, Subnetting, and Network Security.",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/images__1_-removebg-preview_morqan.png",
    totalLevels: 10,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    await Subject.deleteMany({});
    console.log("Cleared old subjects");
    await Subject.insertMany(subjectsData);
    console.log("Added 3 Core Subjects: DSA, OS, CN");

    console.log("Database Reseeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
