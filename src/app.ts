import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors())

//application route
app.use("/api", router);

app.get('/', (req: Request, res: Response) => {
  res.send("It's L2B4A3!")
});

app.use(globalErrorHandler);
app.use(notFound);


export default app;