import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/models/country';
import { Customer } from 'src/app/models/customer';
import { CustomerAddress } from 'src/app/models/customerAddress';
import { CountryService } from 'src/app/services/country.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerAddressService } from 'src/app/services/customerAddress.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit, AfterContentChecked, OnDestroy, OnChanges {
  private unsubscribe$ = new Subject<void>();
  customer: Customer = new Customer();
  id: number = 0;
  countries: Country[] = [];
  isLoading: boolean = false;
  selectedFile: any;
  imagePath: string = "app/assets/default-user.png";
  

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _cdRef: ChangeDetectorRef,
    private customerService: CustomerService,
    private countryService: CountryService,
    private customerAddressService: CustomerAddressService,
    public _dialog: MatDialog,
    public _snackBarService: SnackBarService,

  ) { }

  ngOnInit() {
    this.loadCountries();
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id > 0) this.findCustomer(this.id);
    })
    this.addAddress();
  }
  loadCountries(): void {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);

  }
  

  onCustomerNameChange(result: any) {
    this.customer.customerName = result.value;
  }
  onFatherNameChange(result: any) {
    this.customer.fatherName = result.value;
  }
  onMotherNameChange(result: any) {
    this.customer.motherName = result.value;
  }
  onCountrySelect(result: any) {
    this.customer.countryId = result.value;
  }
  onAddressValueChange(event: any, i: number) {
    this.customer.customerAddresses[i].address = event.value;
  }
  addAddress() {
    this.customer.customerAddresses.push(new CustomerAddress());
  }


  onSave() {

    this.customerService.saveCustommerAsync(this.customer).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        this._snackBarService.success("Saved Successfully!");
        this.isLoading = false;
        this.router.navigate(['']);
      }
    },
      error => {
        this._snackBarService.error("Something Wrong");
        this.isLoading = false;
      }
    );
  }
  onUpdate() {
    this.isLoading = true;
    this.customerService.updateCustomerAsync(this.customer).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        this._snackBarService.success("Updated Successfully!");
        this.isLoading = false;
      }

    },
      () => {
        this._snackBarService.error("Something Wrong");
        this.isLoading = false;
      }
    );

  }
  onDelete() {
    this.isLoading = true;
    const dailog = this._dialog.open(ModalComponent,
      {
        position: { top: '50px' }
      });
    dailog.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(
      result => {
        if (result) {
          this.customerService.deleteCustomerAsync(this.id).subscribe((event) => {

            if (event.type === HttpEventType.Response) {
              this._snackBarService.success("Deleted Successfully!");
              this.isLoading = false;
              this.router.navigate(['']);
            }
          },
            error => {
              this._snackBarService.error("Something Wrong");
              this.isLoading = false;
            }
          );
        }
        else{
          this.isLoading = false;
        }
      });
  }
  onCancel() {
    this.router.navigate(['']);
  }
  saveAddress(item: any) {
    item.customerId = this.customer.id;
    this.customerAddressService.saveCustommerAddressAsync(item).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        this._snackBarService.success("Saved Successfully!");
        this.isLoading = false;
        this.findCustomer(this.id);

      }
    },
      error => {
        this._snackBarService.error("Something Wrong");
        this.isLoading = false;
      }
    );

  }
  addressUpdate(item: CustomerAddress) {
    this.isLoading = true;
    this.customerAddressService.updateCustomerAddressAsync(item).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        this._snackBarService.success("Updated Successfully!");
        this.isLoading = false;
      }

    },
      () => {
        this._snackBarService.error("Something Wrong");
        this.isLoading = false;
      }
    );

  }
  addressDelete(item: any) {
    this.isLoading = true;
    const dailog = this._dialog.open(ModalComponent,
      {
        position: { top: '50px' }
      });
    dailog.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(
      result => {
        if (result) {
          this.customerAddressService.deleteCustomerAddressAsync(item.id).subscribe((event) => {

            if (event.type === HttpEventType.Response) {
              this._snackBarService.success("Deleted Successfully!");
              this.isLoading = false;
              this.findCustomer(this.id);
            }
          },
            error => {
              this._snackBarService.error("Something Wrong");
              this.isLoading = false;
            }
          );
        }else{
          this.isLoading = false;
        }
      });
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('myFile', this.selectedFile, this.selectedFile.name);
    fd.append('customerId', `${this.customer.id}`);
    
    this.customerService.upload(fd).subscribe(
      e => {
        if (e.type === HttpEventType.Response) {
          this._snackBarService.success("Upload Successfully!");
          this.isLoading = false;
          this.findCustomer(this.id);
        }
      },
        error => {
          this._snackBarService.error("Something Wrong");
          this.isLoading = false;
        }
    )
  }


  findCustomer(id: number) {
    this.customerService.findCustomerByIdAsync(id).subscribe(
      e => {
        this.customer = e;
        this.imagePath = "data:image/jpeg;base64," +this.customer.customerPhoto;
        if (this.customer) {
          console.log(this.customer);
          // this.setValue();
        }
      });



  }


  ngAfterContentChecked(): void {
    this._cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      if (propName === "id") {
        let changedProp = changes[propName];
        if (changedProp.currentValue && !changedProp.firstChange) {
          if (this.id > 0)
            this.findCustomer(this.id);
        }
      }
    }
  }
}





