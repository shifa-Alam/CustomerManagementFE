import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { HttpEventType } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterContentChecked, OnDestroy, OnChanges{
  private unsubscribe$ = new Subject<void>();
  customer: Customer = new Customer();
  id: number = 0;
  customerForm!: FormGroup;
  countries: Country[] = [];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.loadCountries();
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: [''],
      maritalStatus: [''],
      countryId: [''],
      customerAddresses: this.fb.array([
        this.fb.control('')
      ])
    });

    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

    })
    if (this.id)
      this.findCustomer(this.id);
  }
  loadCountries() {
    for (let i = 1; i < 5; i++) {
      let country: Country = new Country();
      country.id = i;
      country.countryName = `Bangladesh ${i}`,
        this.countries.push(country);

    }

  }
  get address() {
    return this.customerForm.get('customerAddresses') as FormArray;
  }
  addAddress() {
    this.address.push(this.fb.control(''));
  }

  onSave() {
    this.customerService.saveCustommerAsync(this.customerForm.value)
      .subscribe(customer => this.customer = customer);
  }





















  findCustomer(id: number) {
    this.customerService.findCustomerByIdAsync(id).subscribe(
      e => {
        this.customer = e;
        if (this.customer) {
          console.log(this.customer);
          this.setValue();
        }
      });



  }
  setValue() {
    this.customerForm.patchValue({
      customerName: `${this.customer.customerName}`,
      fatherName: this.customer.fatherName,
      motherName: this.customer.motherName,
      maritalStatus: this.customer.maritalStatus,
      // customerAddresses: {
      //   street: '123 Drew Street'
      // }
    });
  }
  // customerName: ['', Validators.required],
  // fatherName: ['', Validators.required],
  // motherName: [''],
  // maritalStatus: [''],
  // countryId: [''],
  // customerAddresses: this.fb.array([
  //   this.fb.control('')
  // ])


  ngAfterContentChecked(): void {
    this._cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log('this id  ' +this.id);
    for (let propName in changes) {
      
      if (propName === "id") {
        let changedProp = changes[propName];
        if (!changedProp.firstChange) {

          this.findCustomer(this.id);
        }
      }
    }
  }
}





