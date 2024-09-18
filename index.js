import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATIONS */
//only when we use type modules
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

dotenv.config(); // to use .env file
const app = express(); // initialize express
app.use(express.json()); // to parse json data
app.use(helmet()); // for security
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); // for security to allow cross origin;
app.use(morgan("common")); // for logging
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors()); // to allow cross origin requests; user-sharing 
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // where to store images; dont need cloud storage for now

/* File Storage */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({ storage }); //save file to storage

/* Routes with files*/
app.post("/auth/register", upload.single("picture"), register); 
app.post("/posts", verifyToken,upload.single("picture"), createPost);

// verifyToken is middleware to upload file. registration doesn't need that yet

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((err) => console.log(`${err} did not connect`));
