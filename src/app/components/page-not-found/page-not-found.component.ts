import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor(private router: Router, private auth: AuthService)  {

  }

  ngOnInit() {

  }

  back() {
    if(this.auth.isLoggedIn == true) {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/students']);
    }
  }
}
