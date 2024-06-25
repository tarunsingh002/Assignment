import {Component} from '@angular/core';
import {Transaction} from '../models/transaction.model';
import {TransactionDataService} from '../services/transaction-data.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrl: './all-transactions.component.scss',
})
export class AllTransactionsComponent {
  transactions: Transaction[] = [];

  constructor(private dservice: TransactionDataService) {}

  ngOnInit(): void {
    this.dservice.getTransactions();

    this.dservice.transactionsChanged.subscribe((t) => {
      if (!t) return;
      this.transactions = t;
    });
  }

  deleteTransaction(id: number) {
    if (confirm('Are you sure you want to delete this transaction ?'))
      this.dservice.deleteTransaction(id);
  }
}
