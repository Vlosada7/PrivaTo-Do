const Express = require("express");
const router = Express.Router();
const blockController = require('./controller/Blocks');

router.post('/create', blockController.createBlock);
router.post('/complete', blockController.completeBlock);
router.get('/all', blockController.getBlockInOrder);

module.exports = router;