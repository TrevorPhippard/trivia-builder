import express from 'express';

import auth from './auth';
import accounts from './account';
import messages from './messages';
import questions from './questions';
import resources from './resources';
import room from './room';
import trivia from './trivia';
import upload from './upload';
import users from './users';

const router = express.Router();

router.get('/', (_req: any, res: any) => {
  res.send('/api/v1 is working!');
});

router.use('/accounts', accounts);
router.use('/auth', auth);
router.use('/messages', messages);
router.use('/questions', questions);
router.use('/resources', resources);
router.use('/room', room);
router.use('/trivia', trivia);
router.use('/upload', upload);
router.use('/users', users);

export default router;
