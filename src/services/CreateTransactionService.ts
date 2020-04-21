import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    const validate = total - value;
    if (validate < 0 && type === 'outcome') throw Error('Saldo negativo');
    const createTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return createTransaction;
  }
}

export default CreateTransactionService;
