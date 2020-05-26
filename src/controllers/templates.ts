import express, { Request, Response } from 'express';
import { templatesService } from '../services/templates';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const templates = await templatesService.find();
  res.status(200).send(templates);
});

export default router;
