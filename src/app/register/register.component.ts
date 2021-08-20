import { User } from './../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { CustomerService } from '../customer.service';


interface Role{
  value:number;
  viewValue:string;
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  email:string;
  name:string;
  password:string;
  confirmedPassword:string;
  emailErrorMessage:string;
  passwordsError:string;
  email_msg = true
  uid:string;

  // roles:string[] = ['Bank Manager','Department Manager','Accounts Manager'];
  roles: Role[] = [
    {value: 2, viewValue: 'Bank Manager'},
    {value: 1, viewValue:'Accounts Manager' }
  ];
    onSubmit(){
    if(this.password === this.confirmedPassword){
      const registeredUser = {
        email:this.email,
        displayName:this.name,
      }
      this.auth.register(this.email,this.password)
       .then(res => {
         console.log({res});
         this.auth.addUser(res.user.uid,registeredUser);
         console.log(this.email_msg);
         if (this.email_msg){
           console.log("hh");
           this.auth.getUser().subscribe(user => {
            this.uid = user.uid;
            this.customerService.EmailConfirmSend(this.email,this.uid ).subscribe(
              (data) =>{
                console.log("EmailConfirmSend completed");

              });;
           }

           )}
        this.router.navigate(['customer/list']);
      })
      .catch(err =>{
        this.emailErrorMessage = err.message;
        this.password ="";
        this.confirmedPassword ="";

      })
    }else{
     this.passwordsError = 'the passwords did not match';
     this.password ="";
     this.confirmedPassword ="";
    }
  }

  clearError(){
    this.emailErrorMessage = '';
    this.passwordsError = '';
  }

  checkBox_click($event){
    console.log($event);
    console.log($event['checked']);
    this.email_msg = $event['checked']



  }
  constructor(private auth:AuthService,private router:Router, private customerService:CustomerService) { }

  ngOnInit(): void {
  }

}
