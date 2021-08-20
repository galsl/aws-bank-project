import { CustomerService } from './../customer.service';
import { Currency, CustomerRaw } from './../interfaces/customer-raw';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CurrencyService } from '../currency.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SuccessfulyConvertComponent} from '../successfuly-convert/successfuly-convert.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  salary:number;
  currency:Currency;
  selectedCurrency:Currency;
  currencyList:Currency[] = [Currency.USD,Currency.EUR,Currency.ILS,Currency.ARS,Currency.GBP,Currency.PLN,Currency.THB,Currency.PHP];
  result:any;
  userId:string;
  customers:CustomerRaw[] = [];
  selectedCustomer:any;
  save_btn = true
  cust_btn = true

  constructor(private authService:AuthService,private customerService:CustomerService,private currencyService:CurrencyService,private _snackBar: MatSnackBar, private router:Router) {}
  openSnackBar() {
    this._snackBar.openFromComponent(SuccessfulyConvertComponent, {
      duration:5000,
    });
  }
  onCustomerSelect(){
    this.salary = this.selectedCustomer.generalData.salary;
    this.currency = this.selectedCustomer.generalData.currency;
    this.cust_btn = false

  }

  async convertCurrency(){
   const convertedCurrency = await this.currencyService.convert(this.currency,this.selectedCurrency);
  convertedCurrency.subscribe(
    (res:any) =>{
      this.result = Number(res[`${this.currency}_${this.selectedCurrency}`] * this.salary).toFixed(2);
      this.save_btn = false
    }
  )
  }

  saveConvert(){
    this.customerService.saveConvert(this.userId,this.selectedCustomer.id,this.selectedCurrency,this.result,this.selectedCustomer).subscribe(
      _ => {
        this.openSnackBar();
        this.router.navigate(['customer/list']);

      }
    )
  }
  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.userId = user.uid;
        this.customerService.getCustomersById(this.userId).subscribe(
          customers => {
            console.log(customers)
            this.customers = [];
            for(let customer of customers){
              console.log(customer)
              this.customers.push(customer);
            }
          }
            )    
          }
        )
  }

}

