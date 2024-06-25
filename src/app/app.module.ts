import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TransactionFormComponent} from './transaction-form/transaction-form.component';
import {SummaryComponent} from './summary/summary.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';

@NgModule({
  declarations: [AppComponent, TransactionFormComponent, SummaryComponent, AllTransactionsComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
