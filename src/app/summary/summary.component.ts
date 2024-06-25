import {Component, OnInit} from '@angular/core';
import {TransactionDataService} from '../services/transaction-data.service';
import {Transaction} from '../models/transaction.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  transactions: Transaction[] = [];
  income: number = 0;
  expenses: number = 0;
  balance: number = 0;

  constructor(private dservice: TransactionDataService) {}

  ngOnInit(): void {
    this.dservice.getTransactions();

    this.dservice.transactionsChanged.subscribe((t) => {
      if (!t) return;
      this.transactions = t;
      this.income = this.dservice.getTotalIncome();
      this.expenses = this.dservice.getTotalExpenses();
      this.balance = this.income - this.expenses;

      let length = this.transactions.length;

      if (length > 4) this.transactions = this.transactions.slice(length - 4, length);
    });
  }
}
