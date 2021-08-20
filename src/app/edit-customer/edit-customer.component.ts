import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  id:string;
  salary:number;
  avgRatio:number;
  changeTransFromQ1ToQ4:number;
  inactiveMonth:number;
  numberOfContacts:number;
  totalCtChangeQ1ToQ4:number;
  totalRelationship:number;
  totalRevolvingBal:number;
  totalTransChange:number;
  totalTransCount:number;
  userId:string;

 
  constructor(private route:ActivatedRoute,private authService:AuthService,private customerService:CustomerService,private router:Router){
    const customerId = this.route.snapshot.params.customerId;
    const data = localStorage.getItem(customerId);
    const jsonData = JSON.parse(data);
    this.id = customerId;
    this.salary = jsonData.generalData.salary;
    this.avgRatio = jsonData.incomeData.avgRatio;
    this.changeTransFromQ1ToQ4 = jsonData.incomeData.changeTransFromQ1ToQ4;
    this.inactiveMonth = jsonData.incomeData.inactiveMonth;
    this.numberOfContacts = jsonData.incomeData.numberOfContacts;
    this.totalCtChangeQ1ToQ4 = jsonData.incomeData.totalCtChangeQ1ToQ4;
    this.totalRelationship = jsonData.incomeData.totalRelationship;
    this.totalRevolvingBal = jsonData.incomeData.totalRevolvingBal;
    this.totalTransChange = jsonData.incomeData.totalTransChange;
    this.totalTransCount = jsonData.incomeData.totalTransCount;
  }

  onSubmit(){
    const data = {
      id : this.id,
      generalData:{
        salary:this.salary,
      },
      incomeData:{
        avgRatio:this.avgRatio,
        changeTransFromQ1ToQ4:this.changeTransFromQ1ToQ4,
        inactiveMonth:this.inactiveMonth,
        numberOfContacts:this.numberOfContacts,
        totalCtChangeQ1ToQ4:this.totalCtChangeQ1ToQ4,
        totalRelationship:this.totalRelationship,
        totalRevolvingBal:this.totalRevolvingBal,
        totalTransChange:this.totalTransChange,
        totalTransCount:this.totalTransCount
      }
    }
    let selectedCustomer = localStorage.getItem(this.id);
    selectedCustomer = JSON.parse(selectedCustomer);
    console.log(this.id);
    console.log({selectedCustomer});
    console.log({data});

    this.customerService.editCustomer(this.userId,this.id,data,selectedCustomer).subscribe(
      

      (data) =>{
        this.router.navigate(['customer/list'])
      });;
  }
  ngOnInit(): void {
   this.authService.getUser().subscribe(
     user => this.userId = user.uid
   )
  }

}
