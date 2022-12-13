import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  studentData !: any;

  constructor(private api: ApiService, private router: Router){

  }

  ngOnInit(){
    this.getAllStudents();
  }

  getAllStudents(){
    this.api.getStudents()
    .subscribe(res=>{
      this.studentData = res;
    })
  }

  goToLogin($myParam: string = ''): void {
    const navigationDetails: string[] = ['/login'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
}
