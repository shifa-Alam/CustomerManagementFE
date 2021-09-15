import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer = new Customer();
  id: number = 0;
  constructor(private route: ActivatedRoute,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

    })
    if (this.id)
      this.findCustomer(this.id);
  }

  findCustomer(id: number) {
    this.customerService.findCustomerByIdAsync(id)
      .subscribe(customer => this.customer = customer);
  }

}


