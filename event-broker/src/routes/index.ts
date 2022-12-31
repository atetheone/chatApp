import { Request, Response, Router } from "express";

import express from 'express';
const router: Router = Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response) {
  res.json({
    message: "Express event-broker API running..."
  })
});

export {router as indexRouter };
