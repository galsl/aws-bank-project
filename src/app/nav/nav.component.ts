import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CustomerService } from './../customer.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  ProfileImage:any= "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png";
  uid:string ="";

  uploadImage(file) {

    this.authService.getUser().subscribe(user => {
      this.uid = user.uid;
      this.ProfileImage = file.target.files[0];
      this.CustomerService.uploadImage(this.ProfileImage, this.uid).subscribe(
        (img) =>{
          console.log(img);
          console.log(img);
          console.log(img);
          console.log(img);

        this.ProfileImage = img; 
            });
    })
   

   


}


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout(){
      this.authService.logout();
      this.router.navigate([''])
    }

  constructor(private breakpointObserver: BreakpointObserver,
    public authService : AuthService,private router:Router, public CustomerService:CustomerService) {
      

    }

    ngOnInit(): void {
      this.authService.getUser().subscribe(user => {
        if (user == null){

        }else{
        this.uid = user.uid;
        console.log(user.uid)
        this.CustomerService.getImageByUid(this.uid).subscribe(
          (img) =>{
          console.log(img);
          this.ProfileImage = img;

            }  )
          }


      }
      )
     

    }
}
