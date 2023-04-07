const Block = require("../models/Block");
const crypto = require("crypto-js");

const createBlock = async (req, res) => {
	if (req.body.task) {
		try {
			const lastBlock = await Block.findOne().sort({ timeStamp: -1 });
			if (!lastBlock) {
				const newBlock = new Block({
					timeStamp: Date.now(),
					data: req.body.task,
					hash: crypto.SHA256(req.body.task + this.timeStamp).toString(),
				});
				await newBlock.save();
				res.status(201).send({ message: "New block created", block: newBlock });
			} else {
				const newBlock = new Block({
					timeStamp: Date.now(),
					data: req.body.task,
					hash: crypto
						.SHA256(req.body.task + this.timeStamp + lastBlock.hash)
						.toString(),
					previous: lastBlock.hash,
				});
        lastBlock.next = newBlock.hash;
        await lastBlock.save();
				await newBlock.save();
				res.status(201).send({ message: "New block created", block: newBlock });
			}
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "API error" });
		}
	} else {
		res.status(400).send({ message: "Task is missing" });
	}
};

const completeBlock = async (req, res) => {
	const blockHash = req.body.hash;
	if (blockHash) {
		try {
			const selectedBlock = await Block.findOne({
				hash: blockHash,
			});
			if (selectedBlock) {
				const lastBlock = await Block.findOne().sort({ timeStamp: -1 });
				const newBlock = new Block({
					timeStamp: Date.now(),
					data: selectedBlock.data,
					hash: crypto
						.SHA256(selectedBlock.data + this.timeStamp + lastBlock.hash)
						.toString(),
					previous: lastBlock.hash,
					completed: (!selectedBlock.completed),
				});
        lastBlock.next = newBlock.hash;
        await lastBlock.save();
				await newBlock.save();
				res
					.status(201)
					.send({
						message: "Block created with the alteration",
						block: newBlock,
					});
			} else {
				res.status(404).send({ message: "Block not found" });
			}
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "API error" });
		}
	} else {
		res.status(400).send({ message: "Hash is missing" });
	}
};

const getBlockInOrder = async (req, res) => {
  const blocks = await Block.find();
  if (blocks.length > 0) {
    const firstBlock = blocks.find(block => !block.previous);
    const lastBlock = blocks.find(block => !block.next);
    let currentBlock = firstBlock;
    const orderedBlocks = [];
  
    while(currentBlock) {
      orderedBlocks.push(currentBlock);
      if (currentBlock === lastBlock) break;
      currentBlock = blocks.find(block => currentBlock.next === block.hash);
    };  
    res.status(200).send(orderedBlocks);
  } else {
    res.status(404).send({message: 'Blockchain is empty'});
  }
}

module.exports = { createBlock, completeBlock, getBlockInOrder };
