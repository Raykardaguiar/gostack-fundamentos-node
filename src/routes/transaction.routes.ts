import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const balance = transactionsRepository.getBalance();
    const transactions = transactionsRepository.all();
    return response.status(200).json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;
  try {
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const createTransaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.status(200).json(createTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
