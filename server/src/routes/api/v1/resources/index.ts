import express from 'express';
import Model from '../../../../models/resource.model';
import BaseController from '../../../../controllers/baseController';

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
    const { file_name, owner } = req.body;
    const result = await Controller.addEntry({ file_name, owner });
    return res.status(200).json({
      id: result.id,
      file_name: file_name,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req: any, res: any) => {
  try {
    const result = await Controller.getEntryById(req.params.id);
    if (!result) {
      return res.status(404).send('item not found');
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
    const { file_name } = req.body;
    const result = await Controller.updateEntryById(routeId, { file_name });
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
