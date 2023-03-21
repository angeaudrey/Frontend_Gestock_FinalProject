import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

 import { User } from '../_models';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
  }

  public get userValue() {
      return this.userSubject.value;
  }

  login(username: string, password: string) {
       return this.http.post<any>('https://127.0.0.1:8000/api/login_check', { username, password })
          .pipe(map(user => {
            console.log(user);
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('token', JSON.stringify(user.token));

              this.userSubject.next(user);
              return user;
          }));
  }

  proposition(message:string, articledemande :string, articlequirecoistrue: string) {
    console.log("articlequirecoistrue",articlequirecoistrue);
    const token = localStorage.getItem('token');
    const headers = {
     'Authorization': `Bearer ${token}`,
    };

    return this.http.post<any>('https://127.0.0.1:8000/api/proposition/new', { message, articledemande,articlequirecoistrue },{headers})
       .pipe(map(user => {
         console.log("proposition",user);

           return user;
       }));
}

  register(name: string, username: string, phone_number: string, email: string, nameplaintextPassword: string) {

    return this.http.post<any>('https://127.0.0.1:8000/user/create', { name, username, phone_number, email, nameplaintextPassword })
       .pipe(map(user => {
         console.log(user);
       }));
}

  getlistearticle() {

    return this.http.get<any>('https://127.0.0.1:8000/articles/liste')
              .pipe(map(user => {
                console.log(user);
                return user;
              }));

  }


  getlistearticlecreer() {
    const token = localStorage.getItem('token');
    const headers = {
     'Authorization': `Bearer ${token}`,
    };

    return this.http.get<any>('https://127.0.0.1:8000/api/getlistearticlecreer',{ headers })
              .pipe(map(user => {
                console.log(user);
                return user;
              }));

  }


  propositionenattente() {
    const token = localStorage.getItem('token');
    const headers = {
     'Authorization': `Bearer ${token}`,
    };

    return this.http.get<any>('https://127.0.0.1:8000/api/propositionenattente',{ headers })
              .pipe(map(user => {
                console.log(user);
                return user;
              }));

  }

  propositionenattentedevalidation(){
    const token = localStorage.getItem('token');
    const headers = {
     'Authorization': `Bearer ${token}`,
    };

    return this.http.get<any>('https://127.0.0.1:8000/api/propositionenattentedevalidation',{ headers })
              .pipe(map(user => {
                console.log(user);
                return user;
              }));

  }


  newechange(id : any){
    const token = localStorage.getItem('token');
    const headers = {
     'Authorization': `Bearer ${token}`,
    };

    return this.http.get<any>('https://127.0.0.1:8000/api/echange/'+id,{ headers })
              .pipe(map(user => {
                console.log(user);
                return user;
              }));

  }




  getCategorie() {

    const token = localStorage.getItem('token');
     const headers = {
      'Authorization': `Bearer ${token}`,
     };

    return this.http.get<any>('https://127.0.0.1:8000/api/category',{ headers })
              .pipe(map(user => {
                console.log(user);
                return user;
              }));

  }

  getDetailarticle(id : any) {

    const token = localStorage.getItem('token');
     const headers = {
      'Authorization': `Bearer ${token}`,
     };

    return this.http.get<any>('https://127.0.0.1:8000/api/detailarticle/'+id,{ headers })
              .pipe(map(user => {
                console.log(user);
                return user;
              }));

  }
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.userSubject.next(null);
      this.router.navigate(['/login']);
  }
}
