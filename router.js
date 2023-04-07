const Express = require("express");
const router = Express.Router();
const taskController = require('./controller/task');

router.post('/create', taskController.createTask);
router.put('/complete', taskController.completeTask);

module.exports = router;