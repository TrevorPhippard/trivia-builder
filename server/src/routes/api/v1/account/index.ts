import express from 'express';
import AcctModel from '../../../../models/account.model';
import BaseController from '../../../../controllers/baseController';
import { Op } from 'sequelize';

const Controller = new BaseController(AcctModel);
const router = express.Router();

router.get('/', async (_req: any, res: any) => {
  try {
    const entries = await Controller.getAllEntries();
    return res.json(entries);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', async (req: any, res: any) => {
  try {
    const { user_name, room_id, body_text } = req.body;
    const result = await Controller.addEntry({ user_name, room_id, body_text });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:acct_id', async (req: any, res: any) => {
  try {
    const acct_id = req.params.acct_id;
    const result = await Controller.getEntryByQuery({
      where: { acct_id: { [Op.eq]: acct_id } },
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
    const { id, user_name, room_id, body_text } = req.body;
    const result = await Controller.updateEntryById(routeId, { id, user_name, room_id, body_text });
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
