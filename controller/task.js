

const createTask = async (req, res) => {
  res.send('create new task');
};

const completeTask = async (req, res) => {
  res.send('Task completed');
}

module.exports = { createTask, completeTask };