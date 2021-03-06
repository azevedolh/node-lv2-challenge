import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (total, item) => {
        const newTotal = total;
        if (item.type === 'income') {
          newTotal.value = total.value + item.value;
        }
        return newTotal;
      },
      { value: 0 },
    );

    const outcome = this.transactions.reduce(
      (total, item) => {
        const newTotal = total;
        if (item.type === 'outcome') {
          newTotal.value = total.value + item.value;
        }
        return newTotal;
      },
      { value: 0 },
    );

    const total = income.value - outcome.value;

    const balance = {
      income: income.value,
      outcome: outcome.value,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
