import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerNewComponent } from './components/customer-new/customer-new.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  { path: '', component:CustomerNewComponent },
  // { path: '', component:CustomerComponent },
  // { path: 'dashboard', component:DashboardComponent },
  { path: ':id', component:CustomerNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
