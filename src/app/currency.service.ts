import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  API_KEY = '97e155f3287d78ed1810';
  BASE_URL = 'https://free.currconv.com/api/v7/convert?q=';
  constructor(private http:HttpClient) {}

  async convert(from:string,to:string){
    console.log(from);
    console.log(to);

    const convertResult = await this.http.get(`${this.BASE_URL}${from}_${to}&compact=ultra&apiKey=${this.API_KEY}`);
    console.log(convertResult);

    return convertResult;
  }
}
