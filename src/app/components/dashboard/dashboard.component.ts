import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  formValue !: FormGroup;
  studentModelObj: StudentModel = new StudentModel();
  studentData !: any;
  public age: number = 0;
  dateTime: any = new Date();
  constructor (private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit (): void {
    this.formValue = this.formBuilder.group({
      name: [""],
      surname: [""],
      class: [""],
      birthdate: [""],
      studyField: [""],
      gender: [""],
      gradeAverage: [""],
      disabled: [""],
      awards: [""]
    })
    this.getAllStudents();
  }

  public CalculateAge(birthdate: number): void
     {
         if(birthdate){
            var timeDiff = Math.abs(Date.now() - birthdate);
            this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
        }
    }

  postStudentDetails(){
    this.studentModelObj.lastEdit = this.dateTime.toLocaleString();
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.surname = this.formValue.value.surname;
    this.studentModelObj.class = this.formValue.value.class;
    this.studentModelObj.birthdate = this.formValue.value.birthdate;
    //this.studentModelObj.age = this.CalculateAge(this.formValue.value.birthdate);
    this.studentModelObj.studyField = this.formValue.value.studyField;
    this.studentModelObj.gender = this.formValue.value.gender;
    this.studentModelObj.gradeAverage = this.formValue.value.gradeAverage;
    this.studentModelObj.disabled = this.formValue.value.disabled;
    this.studentModelObj.awards = this.formValue.value.awards;

    this.api.postStudent(this.studentModelObj)
    .subscribe(res=>{
      console.log(res);
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllStudents();
    },
    err=>{
      alert("Something went wrong!");
    })
  }

  getAllStudents(){
    this.api.getStudents()
    .subscribe(res=>{
      this.studentData = res;
    })
  }

  deleteStudent(student: any){
    this.api.deleteStudent(student.id)
    .subscribe(res=>{
      alert("Student deleted!");
      this.getAllStudents();
    })
  }

  editStudent(student: any){
    this.studentModelObj.id = student.id;
    this.studentModelObj.lastEdit = student.lastEdit;
    this.formValue.controls["name"].setValue(student.name);
    this.formValue.controls["surname"].setValue(student.surname);
    this.formValue.controls["class"].setValue(student.class);
    this.studentModelObj.birthdate = student.birthdate;
    this.studentModelObj.age = student.age;
    this.formValue.controls["studyField"].setValue(student.studyField);
    this.formValue.controls["gender"].setValue(student.gender);
    this.formValue.controls["gradeAverage"].setValue(student.gradeAverage);
    this.formValue.controls["disabled"].setValue(student.disabled);
    this.formValue.controls["awards"].setValue(student.awards);
  }

  updateStudent(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.surname = this.formValue.value.surname;
    this.studentModelObj.class = this.formValue.value.class;
    this.studentModelObj.studyField = this.formValue.value.studyField;
    this.studentModelObj.gender = this.formValue.value.gender;
    this.studentModelObj.gradeAverage = this.formValue.value.gradeAverage;
    this.studentModelObj.disabled = this.formValue.value.disabled;
    this.studentModelObj.awards = this.formValue.value.awards;

    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id)
    .subscribe(res=>{
      console.log(res);
      let ref = document.getElementById("cancell")
      ref?.click();
      this.formValue.reset();
      this.getAllStudents();
    })
  }
}
