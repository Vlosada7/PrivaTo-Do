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
					hash: crypto.SHA256(req.body + this.timeStamp).toString(),
				});
				await newBlock.save();
				res.status(201).send(newBlock);
			} else {
				const newBlock = new Block({
					timeStamp: Date.now(),
					data: req.body.task,
					hash: crypto
						.SHA256(req.body + this.timeStamp + lastBlock.hash)
						.toString(),
					previous: lastBlock.hash,
				});
				await newBlock.save();
				res.status(201).send(newBlock);
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
	res.send("Task completed");
};

module.exports = { createBlock, completeBlock };
