import express, {Request, Response } from 'express';
import * as APIs from './api';

const router = express.Router();
router.get('/', async(req: Request, res: Response) => {
  const response = await APIs.upcheck()
  res.send({"status": response})
})

router.get("/keys", async(req: Request, res: Response) => {
    const keys = await APIs.getKeys()
    res.send({"keys": keys})
})

router.post("/sign/:identifier", async(req: Request, res: Response) => {
    const response = await APIs.signData(req.params.identifier, req.body.signingRoot)
    res.send(response)
})


export default router;