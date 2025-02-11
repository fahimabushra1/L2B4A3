import express, { Application, Request, Response } from "express";
import cors from "cors";
// import { UserRoutes } from "./app/modules/blogs/routers/user.router";
// import { AdminRoutes } from "./app/modules/blogs/routers/admin.router";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors())

//application route
// app.use("/", UserRoutes);
// app.use("/", AdminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send("It's L2B4A3!")
})


export default app;