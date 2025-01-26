import express from 'express';
// import uploaderService from '../../../../services/fileUploader';

const router = express.Router();

router.post('/', async (_req: any, res: any) => {
  const mock = {
      timeStampName: 'mockImage',
      finalPath: '/server/src/images/default-bg.png',
  }

  // placeholder until lower cost storage solution
  res.send(mock);

  // if (!req.files || Object.keys(req.files).length === 0) {
  //   res.status(400).send('No files were uploaded.');
  //   return;
  // }
  // uploaderService(req.files.file, 'uploads', function (result) {
  //   if (result.error) {
  //     res.status(500).send(result.error);
  //   } else {
  //     res.send({
  //       timeStampName: result.timeStampName,
  //       finalPath: result.finalPath,
  //     });
  //   }
  // });
});

export default router;
