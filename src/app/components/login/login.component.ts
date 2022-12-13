import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formValue !: FormGroup;

  constructor(private auth : AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      meno: [""],
      heslo: [""]
    })
    this.login();
  }

  login() {

    if(this.formValue.value.meno == '') {
      this.formValue.reset();
      return;
    }

    if(this.formValue.value.heslo == '') {
      this.formValue.reset();
      return;
    }

    this.auth.login(this.formValue.value.meno, this.formValue.value.heslo);
    
    this.formValue.reset();

  }
 
}
