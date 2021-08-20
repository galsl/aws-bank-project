import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';
import { CustomerRaw, Gender,Currency } from '../interfaces/customer-raw';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  
})
export class CustomerFormComponent implements OnInit {

  //constants
  gender:Gender[] = [Gender.MALE,Gender.FEMALE];
  currencyList:Currency[] =[Currency.USD,Currency.ILS,Currency.ARS,Currency.GBP,Currency.PHP,Currency.PLN,Currency.THB];
  generalInfo:FormGroup;
  incomeInfo:FormGroup;
  isEditable = true;
  userId:string;
  salary:number;
  currency:Currency;

  //general info
  selectedGender:Gender;
  email:string;
  name:string;

  //income info
  totalRelationship:number;
  inactiveMonth:number;
  numberOfContacts:number;
  totalRevolvingBal:number;
  totalTransChange:number;
  changeTransFromQ1ToQ4:number;
  totalTransCount:number;
  totalCtChangeQ1ToQ4:number;
  avgRatio:number;
 
  //
  constructor(private _formBuilder: FormBuilder, private customerService:CustomerService,private authService:AuthService,private router:Router) { }

  onFormCompleted(){
    const customerData:CustomerRaw = {
      user_id: this.userId,
      generalData:{
        email:this.email,
        gender:this.selectedGender,
        name:this.name,
        salary:this.salary,
        currency:this.currency
      },
      incomeData:{
        totalRelationship:this.totalRelationship,
        inactiveMonth:this.inactiveMonth,
        numberOfContacts:this.numberOfContacts,
        totalRevolvingBal:this.totalRevolvingBal,
        totalTransChange:this.totalTransChange,
        changeTransFromQ1ToQ4:this.changeTransFromQ1ToQ4,
        totalTransCount:this.totalTransCount,
        totalCtChangeQ1ToQ4:this.totalCtChangeQ1ToQ4,
        avgRatio:this.avgRatio
      }
    }
    this.customerService.addCustomer(this.userId,customerData).subscribe(
      (data) =>{
        this.router.navigate(['customer/list'])
      });;
    
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => this.userId = user.uid
    )
    this.generalInfo = this._formBuilder.group(
    {
      generalCtrl1:['',Validators.required],
      generalCtrl2:['',Validators.required],
      generalCtrl3:['',Validators.required],
      generalCtrl4:['',Validators.required],
      generalCtrl5:['',Validators.required],


    }
    )
    this.incomeInfo = this._formBuilder.group({
      incomeCtrl1:['',Validators.required],
      incomeCtrl2:['',Validators.required],
      incomeCtrl3:['',Validators.required],
      incomeCtrl4:['',Validators.required],
      incomeCtrl5:['',Validators.required],
      incomeCtrl6:['',Validators.required],
      incomeCtrl7:['',Validators.required],
      incomeCtrl8:['',Validators.required],
      incomeCtrl9:['',Validators.required],

    })
  }

}
