import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) { }
  profileImage: string = "/src/assets/images/default-user.png";
  ngOnInit() {
    this.customerService.refreshNeeded$.subscribe(() => {
      this.getCustomers();
    })
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);

  }

}
