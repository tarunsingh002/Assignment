import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TransactionDataService} from '../services/transaction-data.service';
import {Transaction} from '../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent implements OnInit {
  reactiveForm: FormGroup;
  editMode = false;
  id: number;

  constructor(
    private aroute: ActivatedRoute,
    private dservice: TransactionDataService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
    });

    this.aroute.params.subscribe((params: Params) => {
      if (params['index'] != null) {
        this.editMode = true;
        let editTransaction = this.dservice.getTransactionById(+params['index']);

        this.reactiveForm.setValue({
          name: editTransaction.name,
          description: editTransaction.description,
          amount: editTransaction.amount,
          type: editTransaction.type,
          date: editTransaction.date,
          category: editTransaction.category,
        });

        this.id = editTransaction.transactionId;
      }
    });
  }

  onSubmit(rf: FormGroup) {
    let value = rf.value;
    let transaction = new Transaction(
      value.name,
      value.description,
      value.amount,
      value.date,
      value.type,
      value.category
    );

    console.log(transaction);

    rf.reset();

    if (this.editMode) {
      transaction.transactionId = this.id;
      this.dservice.editTransaction(this.id, transaction);
      this.route.navigate(['all']);
    } else {
      this.dservice.addTransaction(transaction);

      this.route.navigate(['summary']);
    }
  }
}
