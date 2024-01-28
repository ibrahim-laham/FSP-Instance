// server here
//import Express from "express";
//import cors from "cors";
//import passport from "passport";

//import productsRouter from "./routes/products";
//import usersRouter from "./routes/users";
//import ordersRouter from "./routes/orders";
//import apiErrorHandler from "./middlewares/apiErrorHandler";
//import { jwtStrategy } from "./config/passport";
//import path from "path";
//import { Request, Response } from "express";

//const app = Express();
//const _dirname = path.dirname("");
//const buildpath = path.join(_dirname, "../client/build");

//app.use(Express.static(buildpath));

//app.use(Express.json());
//app.use(cors());
//app.use(passport.initialize());
//passport.use(jwtStrategy);
//app.get("/", function(req:Request, res:Response){

//  res? res.sendFile(
//      path.join(__dirname, "../client/build/index.html"),
//      function (err) {
//        if (err) {
//          res.status(500).send(err);
//        }
//      }
//    ): null;

//})
//app.use("/products", productsRouter);
//app.use("/users", usersRouter);
//app.use("/orders", ordersRouter);

//app.use(apiErrorHandler);



//export default app;
