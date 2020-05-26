import express, { Request, Response } from 'express';
import { deploymentsService } from '../services/deployments';
import { validate } from '../middleware/validate';
import Joi from '@hapi/joi';

const router = express.Router();

const deploymentBodySchema = Joi.object({
  url: Joi.string().required(),
  templateName: Joi.string().required(),
  version: Joi.string().required()
});

router.post('/', validate(deploymentBodySchema, 'body'), async (req: Request, res: Response) => {
  const deployment = await deploymentsService.create(req.body);
  res.status(201).send(deployment);
});

router.get('/', async (req: Request, res: Response) => {
  const deployments = await deploymentsService.find();
  res.status(200).send(deployments);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await deploymentsService.remove(req.params.id);
  res.status(204).send();
});

export default router;
