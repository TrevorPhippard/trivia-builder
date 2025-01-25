import express from 'express';
import Model from '../../../../models/question.model';
import BaseController from '../../../../controllers/baseController';
import { Op } from 'sequelize';

const Controller = new BaseController(Model);

const router = express.Router();

router.get('/', async (req: any, res: any) => {
  try {
    const entries = await Controller.getAllEntries();
    return res.json(entries);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', async (req: any, res: any) => {
  try {
    const { slide_rank, owner, trivia, category, type, question, options, answer, bgImg } = req.body;
    const result = await Controller.addEntry({
      slide_rank,
      owner,
      trivia,
      category,
      type,
      question,
      options,
      answer,
      bgImg,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const result = await Controller.getEntryByQuery({
      where: { id: { [Op.eq]: id } },
    });
    if (!result) {
      return false;
    } else {
      return res.json(result);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/:id', async (req: any, res: any) => {
  try {
    const routeId = Number(req.params.id);
    const { slide_rank, owner, trivia, category, type, question, options, answer, bgImg } = req.body;
    const result = await Controller.updateEntryById(routeId, {
      slide_rank,
      owner,
      trivia,
      category,
      type,
      question,
      options,
      answer,
      bgImg,
    });
    if (!result) {
      return res.status(404).send('item not found');
    } else {
      return res.json(result);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete('/:id', async (req: any, res: any) => {
  try {
    const routeId = req.params.id;
    const result = await Controller.removeEntryById(routeId);
    if (!result) {
      return res.status(404).send('item not found');
    } else {
      return res.send('item deleted successfully');
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
