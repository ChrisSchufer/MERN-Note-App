import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";

const app = express();

//MIDDLEWARE
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoutes);

//fallthrough if Endpoint is not found --> wrong url
app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

//Errorhandler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({
    error: errorMessage,
  });
});

export default app;