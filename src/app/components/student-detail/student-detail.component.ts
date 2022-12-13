import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent {
  id: any;
  studentData !: any;

  constructor(private route: ActivatedRoute, private api: ApiService){}

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
}
