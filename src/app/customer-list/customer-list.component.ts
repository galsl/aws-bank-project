import { Observable } from 'rxjs';
import { CustomerService } from './../customer.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { IncomeData } from '../interfaces/income-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CustomerListComponent implements OnInit {


  columnsToDisplay:string[] = ['name','email','gender','salary','currency','predict','actions'];
  customers = [];
  userId:string;
  currentUserData$:Observable<any>;
  currentUserData:any;
  selectedCustomerData:IncomeData
  predict_result:string;
  constructor(public router:Router,private authService:AuthService,private customerService:CustomerService,public dialog: MatDialog) { }

  predict(customerId:string) {
    const { incomeData } = this.customers.find(customer => customerId === customer.id);
    this.customerService.predict(incomeData).subscribe(res=>{
      console.log(res);
      this.predict_result = res['result'];
      this.customerService.SavePredict(customerId, res['result']).subscribe(res2 =>{
        console.log("njvnjvcnjvnvcjn")
        this.ngOnInit()
      })
    });
  }

  deleteCustomer(customerId:string) {
   this.customerService.delete(this.userId,customerId).subscribe(
    (data) =>{
      this.ngOnInit()
        });;
  }

  editCustomer(customerId:string){
    const selectedCustomer = this.customers.find(customer => customer.id === customerId);
    console.log(selectedCustomer);
    localStorage.setItem(customerId,JSON.stringify(selectedCustomer))
    console.log(JSON.stringify(selectedCustomer));

    // this.openDialog();
    this.router.navigate(['/customer/list/editCustomer',customerId])
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(EditCustomerComponent, {
  //     width: '500px',
  //     data:{...this.selectedCustomerData}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log({result})
  //   });
  // }
  
  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.userId = user.uid;
      this.customerService.getCustomersById(user.uid).subscribe(
        customers => {
          console.log(customers)
          this.customers = [];
          for(let customer of customers){
            console.log(customer)

            this.customers.push(customer);
          }
        }
      )
    })
  }
}
