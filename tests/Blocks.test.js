const {
	descibre,
	expect,
	beforeAll,
	afterAll,
	describe,
} = require("@jest/globals");
const request = require("supertest");
const Block = require("../models/Block");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto-js");

const URL = "http://localhost:3000";

describe('Blocks tests: ', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/PrivaTo-Do');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /create:', () => {
    it('Should respond with 400 if no task is passed:', async () => {
      const res = await request(URL).post('/create').send();
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual('Task is missing');
    });
    it('Should create a new block if task is passed', async () => {
      const res = await request(URL).post('/create').send({
        task: 'teste'
      });
      const lastBlock = await Block.findOne().sort({ timeStamp: -1});
      expect(res.status).toBe(201);
      expect(res.body.message).toEqual('New block created');
      expect(res.body.block.data).toEqual('teste');
      expect(res.body.block.hash).toEqual(lastBlock.hash);
    });
  })

  describe('POST /complete:', () => {
    it('Should create a new block with same data but completed', async () => {
      const lastBlock = await Block.findOne().sort({ timeStamp: -1 });
      const hash = lastBlock.hash;
      const res = await request(URL).post('/complete').send({hash: hash});
      expect(res.status).toBe(201);
      expect(res.body.block.previous).toEqual(hash);
      expect(res.body.block.completed).toEqual(!lastBlock.completed)
    })
  })

  describe('GET /all:', () => {
    it('Should get all the blocks in order', async () => {
      const res = await request(URL).get('/all');
      expect(res.status).toBe(200);
      expect(res.body[0].previous).toEqual(null);
      expect(res.body[res.body.length - 1].next).toEqual(null);
    })
  })
})