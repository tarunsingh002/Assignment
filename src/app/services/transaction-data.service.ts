import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Transaction} from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionDataService {
  transactionsChanged = new BehaviorSubject<Transaction[]>([]);
  transactions: Transaction[] = [];
  trackOfId = 1;

  constructor() {}

  addTransaction(t: Transaction) {
    let currentId = localStorage.getItem('trackOfId')
      ? +JSON.parse(localStorage.getItem('trackOfId')) + 1
      : this.trackOfId;
    t.transactionId = currentId;
    this.transactions.push(t);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    localStorage.setItem('trackOfId', JSON.stringify(currentId));
    this.transactionsChanged.next(this.transactions);
  }

  getTransactions() {
    this.transactions = JSON.parse(localStorage.getItem('transactions'));
    this.transactionsChanged.next(this.transactions);
    return this.transactions;
  }

  getTransactionById(id: number) {
    this.getTransactions();
    return this.transactions.find((t) => t.transactionId === id);
  }

  editTransaction(id: number, t: Transaction) {
    let index = this.transactions.findIndex((t) => t.transactionId === id);

    this.transactions.splice(index, 1, t);
    this.transactionsChanged.next(this.transactions);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }
  deleteTransaction(id: number) {
    let index = this.transactions.findIndex((t) => t.transactionId === id);
    this.transactions.splice(index, 1);
    this.transactionsChanged.next(this.transactions);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  getTotalIncome() {
    let income = 0;
    this.transactions.map((t) => {
      if (t.type === 'income') income += t.amount;
    });
    return income;
  }

  getTotalExpenses() {
    let expenses = 0;
    this.transactions.map((t) => {
      if (t.type === 'expense') expenses += t.amount;
    });
    return expenses;
  }
}
