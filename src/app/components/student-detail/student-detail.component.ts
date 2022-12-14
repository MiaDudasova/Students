import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent {
  id: any;
  studentData !: any;

  constructor(private route: ActivatedRoute, private api: ApiService, private auth: AuthService, private router: Router){}

  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);
    this.getOne(this.id);
  }

  getOne(id: any){
    this.api.getOneStudent(this.id)
    .subscribe(res=>{
      this.studentData = res;
    })
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
