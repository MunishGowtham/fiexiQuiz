import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Customer } from './models/customer';
import { AppService } from './services/app.service';
import { addCustomer } from './store/action/customer.actions';
import { CustomerState } from './store/reducer/customer.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['Album Id', 'Id', 'Thumbnail Url', 'Title', 'Url'];
  tableDatSource: MatTableDataSource<Customer>;
  params = {
    pageStartIndex: 0,
    pageSize: 5
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private appService: AppService, private store: Store<CustomerState>) {
  }
  ngOnInit() {
    this.getTableDetails();
  }
  getTableDetails() {
    this.appService.getTableData(this.params).subscribe(res => {
      this.tableDatSource = new MatTableDataSource(res);
      res.forEach(element => {
        this.addCustomer(element)
      });

      this.paginator.length = 5000;
    })
  }
  addCustomer(data: Customer): void {
    const customer = new Customer(data);
    this.store.dispatch(addCustomer(customer));
  }
  onPageChange(e) {
    this.params.pageStartIndex = e.pageIndex * e.pageSize;
    this.params.pageSize = e.pageSize;
    this.getTableDetails();
  }
  clearRow(row) {
    this.tableDatSource.data.indexOf(row) > -1 ?
      this.tableDatSource.data.splice(this.tableDatSource.data.indexOf(row), 1) : '';
    this.tableDatSource = new MatTableDataSource(this.tableDatSource.data);
  }
}
