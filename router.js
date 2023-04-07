const Express = require("express");
const router = Express.Router();
const blockController = require('./controller/Blocks');

router.post('/create', blockController.createBlock);
router.put('/complete', blockController.completeBlock);
router.get('/all', blockController.getBlockInOrder);

module.exports = router;