import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private baseurl: string = "https://localhost:7013/api/User/";

  constructor(private httpm: HttpClientModule, private http: HttpClient) { }

  signup(userObj: any){
    console.log(userObj);
    return this.http.post<any>(`${this.baseurl}register`, userObj)

  }
 
  login(loginObj: any){
    // debugger;
    console.log(loginObj);
    return this.http.post<any>(`${this.baseurl}authenticate`, loginObj)


  }

  storeToken(tokenValue: string){
    localStorage.setItem("token", tokenValue)
  }

  getItem(){
    return localStorage.getItem("token")
  }

  loggedin(): boolean{
    return !localStorage.getItem("token")
  }
}
