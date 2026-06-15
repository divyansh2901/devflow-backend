import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import snippetRoutes from "./routes/snippetRoutes.js";
import debugNoteRoutes from "./routes/debugNoteRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/snippets", snippetRoutes);
app.use("/api/debug-notes", debugNoteRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get('/',(req,res)=>{
    res.send("DevFlow API Running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server Running on Port ${PORT}`);
});