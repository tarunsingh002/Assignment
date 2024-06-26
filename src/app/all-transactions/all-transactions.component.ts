import {Component} from '@angular/core';
import {Transaction} from '../models/transaction.model';
import {TransactionDataService} from '../services/transaction-data.service';
import {FormControl, FormGroup} from '@angular/forms';
import {tap} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrl: './all-transactions.component.scss',
})
export class AllTransactionsComponent {
  transactions: Transaction[] = [];
  allTransactions: Transaction[] = [];
  searchQueryTransactions: Transaction[] = [];
  sortingQueryTransactions: Transaction[] = [];

  sortByCode: string;

  usingSearch: boolean = false;
  usingSorting: boolean = false;

  reactiveForm: FormGroup;
  reactiveForm1: FormGroup;
  searching: boolean;

  searchTerm: string;

  sortBy: string;
  direction: string;
  toBeSorted: Transaction[];

  constructor(
    private dservice: TransactionDataService,
    private router: Router,
    private aroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dservice.getTransactions();

    this.dservice.transactionsChanged.subscribe((t) => {
      if (!t) return;
      this.allTransactions = t;
      this.transactions = t;
    });

    let url = this.router.url.substring(0, this.router.url.indexOf('?'));
    if (url) this.router.navigate([url]);

    this.reactiveForm = new FormGroup({
      searchTerm: new FormControl(null),
    });

    this.reactiveForm1 = new FormGroup({
      sortByCode: new FormControl('0'),
    });

    this.reactiveForm.get('searchTerm').valueChanges.subscribe((term: string) => {
      this.searchTerm = term.trim();
      let searchParam: Params;
      if (this.searchTerm !== '') {
        this.usingSearch = true;
        let t1 = this.allTransactions.filter((t) =>
          t.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        let t2 = this.allTransactions.filter((t) =>
          t.category.toLowerCase().includes(this.searchTerm.toLowerCase())
        );

        this.searchQueryTransactions = this.unique(t1.concat(t2));
        this.transactions = this.searchQueryTransactions;
        searchParam = {search: this.searchTerm};
        this.router.navigate([], {
          relativeTo: this.aroute,
          queryParams: searchParam,
          queryParamsHandling: 'merge',
        });
      } else {
        this.usingSearch = false;
        this.transactions = this.allTransactions;
        searchParam = {search: null};
      }
      if (this.usingSorting) {
        this.reactiveForm1.setValue({sortByCode: this.sortByCode});
      }
      this.router.navigate([], {
        relativeTo: this.aroute,
        queryParams: searchParam,
        queryParamsHandling: 'merge',
      });
    });

    this.reactiveForm1.get('sortByCode').valueChanges.subscribe((sortByCode: string) => {
      this.sortByCode = sortByCode;
      let filterParam: Params = {sortBy: null, direction: null};
      if (this.usingSearch) this.toBeSorted = this.searchQueryTransactions;
      else this.toBeSorted = this.allTransactions;
      switch (+sortByCode) {
        case 0:
          this.sortBy = 'transactionId';
          this.direction = 'asc';
          this.sortingQueryTransactions = this.toBeSorted.sort(
            (t1, t2) => t1.transactionId - t2.transactionId
          );
          this.usingSorting = false;
          break;

        case 1:
          this.sortBy = 'date';
          this.direction = 'desc';
          this.sortingQueryTransactions = this.toBeSorted.sort(
            (t1, t2) => new Date(t2.date).getTime() - new Date(t1.date).getTime()
          );
          break;

        case 2:
          this.sortBy = 'date';
          this.direction = 'asc';
          this.sortingQueryTransactions = this.toBeSorted.sort(
            (t1, t2) => new Date(t1.date).getTime() - new Date(t2.date).getTime()
          );
          break;

        case 3:
          this.sortBy = 'amount';
          this.direction = 'asc';
          this.sortingQueryTransactions = this.toBeSorted.sort((t1, t2) => t1.amount - t2.amount);
          break;

        case 4:
          this.sortBy = 'amount';
          this.direction = 'desc';
          this.sortingQueryTransactions = this.toBeSorted.sort((t1, t2) => t2.amount - t1.amount);

          break;
      }

      if (+sortByCode !== 0) {
        this.usingSorting = true;
        filterParam = {sortBy: this.sortBy, direction: this.direction};
      }

      this.transactions = this.sortingQueryTransactions;

      this.router.navigate([], {
        relativeTo: this.aroute,
        queryParams: filterParam,
        queryParamsHandling: 'merge',
      });
    });
  }

  unique(t: Transaction[]) {
    const ids = t.map(({transactionId}) => transactionId);
    const unique = t.filter(({transactionId}, index) => !ids.includes(transactionId, index + 1));
    return unique;
  }

  deleteTransaction(id: number) {
    if (confirm('Are you sure you want to delete this transaction ?'))
      this.dservice.deleteTransaction(id);
  }
}
