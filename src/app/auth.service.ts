import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './interfaces/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:Observable<User | null>;
  employeesCollection:AngularFirestoreCollection = this.db.collection('users')
  userInfoCollection:AngularFirestoreCollection;
  login(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }


  register(email,password){
    return this.afAuth.createUserWithEmailAndPassword(email,password);
  }
  addUser(userId:string,employee){
    return this.employeesCollection.doc(userId).collection('userInfo').add(employee)
  }

  logout(){
  //  this.afAuth.authState.subscribe((authState) => { authState.delete(); });
    this.afAuth.signOut();
  }

  getUser(): Observable<User | null> {
    return this.user;
    
  }

  

  getUserById(userId:string){
    this.userInfoCollection =  this.employeesCollection.doc(userId).collection('userInfo');
    return this.userInfoCollection.snapshotChanges();
  }

  constructor(private afAuth:AngularFireAuth,private db:AngularFirestore) {
    console.log(this.afAuth.authState);
    this.user = this.afAuth.authState;
   }

   

}
