import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  getPrivateUsers(): Observable<Array<UserDetails>>{
    return this.http.get<Array<UserDetails>>('../../assets/loginUsers.json');
  }
}
