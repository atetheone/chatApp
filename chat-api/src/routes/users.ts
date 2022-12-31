import { Request, Response, Router } from "express";

import express from 'express';
const router = Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response) {
  res.send('respond with a resource');
});

export { router as someRouter}
