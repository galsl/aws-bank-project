import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {FormControl, Validators} from '@angular/forms';
import { CustomerService } from './../customer.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  ErrorMessage:string;

  onSubmit(){
    this.auth.login(this.email,this.password)
    .then(res => {
      console.log({res:res.user});
      this.auth.getUserById(res.user.uid).subscribe(
        res => {
        console.log({res})
        this.auth.getUser().subscribe(user => {
          this.CustomerService.sendEmailLogedIn(user.uid).subscribe()

        }
      )
        })
    
      this.router.navigate(['customer/list']);
      
      console.log(res);
      })
    .catch(err => {
      console.log(err);
      this.ErrorMessage = err.message; 
      })
  }

  clearError(){
    this.ErrorMessage = '';
  }

  constructor(public auth:AuthService,public router:Router, public CustomerService:CustomerService) { }

  ngOnInit(): void {
  }

}
