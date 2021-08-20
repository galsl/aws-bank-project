import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore';
import { Currency, CustomerRaw } from './interfaces/customer-raw';
import { IncomeData } from './interfaces/income-data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerCollection:AngularFirestoreCollection;
  userCollection:AngularFirestoreCollection = this.db.collection('users');
  END_POINT_URL = 'https://c9r3vc1eh1.execute-api.us-east-1.amazonaws.com/beta';
  GET_CUSTOMERS_ENDPOINT_URL :string = "http://ec2-3-84-189-241.compute-1.amazonaws.com/get_customers";
  ADD_CUSTOMER_ENDPOINT_URL :string = "http://ec2-3-84-189-241.compute-1.amazonaws.com/add_customer";
  DELETE_CUSTOMER_ENDPOINT_URL :string = "http://ec2-3-84-189-241.compute-1.amazonaws.com/delete_customer";
  EDIT_CUSTOMER_ENDPOINT_URL :string = "http://ec2-3-84-189-241.compute-1.amazonaws.com/edit_customer";
  UPLOAD_IMAGE_ENDPOINT_URL :string = "  http://ec2-3-84-189-241.compute-1.amazonaws.com/uploadImage";
  UPDATE_IMAGE_DB_ENDPOINT_URL :string = "http://ec2-3-84-189-241.compute-1.amazonaws.com/uploadImageDB";
  GET_USER_IMAGE_ENDPOINT_URL :string = "http://ec2-3-84-189-241.compute-1.amazonaws.com/getUserImage";
  EMAIL_CONFIRM_SEND_ENDPOINT_URL :string = "http://ec2-3-84-189-241.compute-1.amazonaws.com/sns";
  EMAIL_LOGED_IN_SEND_ENDPOINT_URL :string = "http://ec2-3-84-189-241.compute-1.amazonaws.com/send_email";
  PREDICT_SEND_ENDPOINT_URL :string = "http://ec2-3-84-189-241.compute-1.amazonaws.com/predict";
  

  constructor(private db:AngularFirestore,private http:HttpClient) { }

  getImageByUid(uid){
    console.log("in the service")
    console.log(uid)
    console.log(uid)
    console.log(uid)
    console.log(uid)


    return this.http.post<any>(`${this.GET_USER_IMAGE_ENDPOINT_URL}`,{'uid':uid}).pipe(map(result =>{
      console.log(result);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);
      console.log(result['img']);


      return result['img'];
      }
     )
    )


    
  }


  uploadImage(image,uid){
   let fd:FormData = new FormData();
   fd.append('image', image, image.name);
   console.log(fd)
    return this.http.post<any>(this.UPLOAD_IMAGE_ENDPOINT_URL,fd).pipe(map(result =>{
      const img = result['img']
      console.log(result['img']);
      this.uploadImageDB(uid, result['img']).subscribe(
        (result) =>{
          console.log(result);
          return img

            })
            return img

      }
     )
    )
  }

  uploadImageDB(uid, img){
    return this.http.post<any>(this.UPDATE_IMAGE_DB_ENDPOINT_URL,{'uid':uid , img: img}).pipe(map(result =>{
      console.log(img);


      return img;
      }
     )
    )
  }

  EmailConfirmSend(email, uid){
    console.log("EmailConfirmSend entered");
    console.log(uid);
    console.log(email);


    return this.http.post<any>(this.EMAIL_CONFIRM_SEND_ENDPOINT_URL,{'email':email, 'uid':uid}).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }

  sendEmailLogedIn(uid){
    console.log("sendEmailLogedIn entered");
    console.log(uid);
    return this.http.post<any>(this.EMAIL_LOGED_IN_SEND_ENDPOINT_URL,{'uid':uid}).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }

  addCustomer(userId:string,customerData:CustomerRaw){
    const customerDataJson = JSON.stringify(customerData)
    console.log(customerData);
    console.log(customerDataJson);
    return this.http.post<any>(this.ADD_CUSTOMER_ENDPOINT_URL, customerData).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }
  
  getCustomersById(userId:string){
    console.log(userId)
    return this.http.post<any>(`${this.GET_CUSTOMERS_ENDPOINT_URL}`, {"uid": userId}).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }

  delete(userId:string,customerId:string){
    console.log(customerId);
    return this.http.post<any>(this.DELETE_CUSTOMER_ENDPOINT_URL, {"id": customerId}).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
    

  }
//   

  predict(incomeData:IncomeData){
  console.log(incomeData)
  const predictData = {data:`${incomeData.totalRelationship},${incomeData.inactiveMonth},${incomeData.numberOfContacts},${incomeData.totalRevolvingBal},${incomeData.totalCtChangeQ1ToQ4},${incomeData.totalTransChange},${incomeData.totalTransCount},${incomeData.totalCtChangeQ1ToQ4},${incomeData.avgRatio}`};
  return this.http.post(this.END_POINT_URL,predictData)
  }

  
  SavePredict(customerId:string, predict){
    console.log(customerId);
    return  this.http.post(this.PREDICT_SEND_ENDPOINT_URL, {"id": customerId, "predict":predict}).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
    

  }


  saveConvert(userId:string,customerId:string,currency:Currency,newSalary:number,selectedCustomer:any){
    console.log(selectedCustomer);
    console.log(customerId);

    const marged_data = {
      id: customerId,
      user_id:userId,
    generalData:{
      ...selectedCustomer.generalData,
      currency,
      salary:newSalary
    },
    incomeData:{
      ...selectedCustomer.incomeData,
    },
    predict:selectedCustomer.predict
  }
    const customerDataJson = JSON.stringify(marged_data)
    console.log(marged_data)
    return this.http.post<any>(this.EDIT_CUSTOMER_ENDPOINT_URL, marged_data).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }


editCustomer(userId:string,customerId:string,editData:any,selectedCustomer){
  console.log(selectedCustomer.generalData)
  const marged_data = {
    id: customerId,
    user_id:userId,
  generalData:{
    ...selectedCustomer.generalData,
    salary:editData.generalData.salary
  },
  incomeData:{
    ...selectedCustomer.IncomeData,
    ...editData.incomeData
  },
  predict:selectedCustomer.predict
}
  const customerDataJson = JSON.stringify(marged_data)
  console.log(marged_data)
  return this.http.post<any>(this.EDIT_CUSTOMER_ENDPOINT_URL, marged_data).pipe(map(result =>{
    console.log(result);
    return result;
    }
   )
  )

}
};



