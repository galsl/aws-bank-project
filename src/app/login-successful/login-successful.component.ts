import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-successful',
  templateUrl: './login-successful.component.html',
  styleUrls: ['./login-successful.component.css']
})
export class LoginSuccessfulComponent implements OnInit {
  userActiveEmail:string;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(
      (res) => {
      this.userActiveEmail =  res.displayName;
      console.log(res.displayName);
    }

    )
   
  }

}
