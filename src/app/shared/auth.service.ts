import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private router : Router) { }

  // login method
  login(email : string, password : string) {
    if(email == "admin" && password == "uzasnaappka") {
      this.isLoggedIn = true;
      this.router.navigate(['dashboard']);
    }
    else {
      alert("Zle meno alebo heslo!");
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/students']);
  }

  isAuthenticated(){
    return this.isLoggedIn;
  }

}
