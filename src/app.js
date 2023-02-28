import express from "express";
import morgan from "morgan";
import libraryRoutes from "./routes/library.routes"

const app = express();
//server port
app.set("port",81);

//middleware
app.use(morgan('dev'));
app.use(express.json());
//router
app.use("/api/library",libraryRoutes);


export default app; 