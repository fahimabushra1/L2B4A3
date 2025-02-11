import express, { Application, Request, Response } from "express";
import cors from "cors";
// import { UserRoutes } from "./app/modules/blogs/routers/user.router";
import { BlogRoutes } from "./app/modules/blogs/routers/blog.router";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors())

//application route
// app.use("/", UserRoutes);
app.use("/", BlogRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send("It's L2B4A3!")
})


export default app;