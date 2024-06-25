import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SummaryComponent} from './summary/summary.component';
import {TransactionFormComponent} from './transaction-form/transaction-form.component';
import {AllTransactionsComponent} from './all-transactions/all-transactions.component';

const routes: Routes = [
  {path: '', redirectTo: '/summary', pathMatch: 'full'},
  {path: 'summary', component: SummaryComponent},
  {path: 'add', component: TransactionFormComponent},
  {path: 'all', component: AllTransactionsComponent},
  {path: 'edit/:index', component: TransactionFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
