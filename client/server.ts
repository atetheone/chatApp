// // Generate Angular Universal server with express

// // ng add @nguniversal/express-engine --clientProject messages
// import express, { Request, Response } from "express";
// const path = require("path");
// const { ngExpressEngine } = require("@nguniversal/express-engine");
// const { provideModuleMap } = require("@nguniversal/module-map-ngfactory-loader");
// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require("./dist/server/main");  
// const app = express();
// const PORT = process.env["PORT"] || 4000;
// const DIST_FOLDER = path.join(process.cwd(), "dist");
// app.engine(
//   "html",
//   ngExpressEngine({
//     bootstrap: AppServerModuleNgFactory,
//     providers: [provideModuleMap(LAZY_MODULE_MAP)],
//   })
// );
// app.set("view engine", "html");
// app.set("views", path.join(DIST_FOLDER, "browser"));
// app.get("*.*", express.static(path.join(DIST_FOLDER, "browser")));
// app.get("*", (req: Request, res: Response) => {
//   res.render("index", { req });
// }
// );
// app.listen(PORT, () => {
//   console.log(`Node Express server listening on http://localhost:${PORT}`);
// }
// );
