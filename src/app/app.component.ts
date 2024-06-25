import {Component, OnInit} from '@angular/core';
import {TransactionDataService} from './services/transaction-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  sampleDataAddedOnce = 0;

  constructor(private dservice: TransactionDataService) {}

  ngOnInit(): void {
    this.sampleDataAddedOnce = localStorage.getItem('sampleDataAddedOnce')
      ? +JSON.parse(localStorage.getItem('sampleDataAddedOnce'))
      : 0;
    if (this.sampleDataAddedOnce === 0) {
      this.dservice.addSampleData();
      localStorage.setItem('sampleDataAddedOnce', JSON.stringify(1));
    }
  }
}
