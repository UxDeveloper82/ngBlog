import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if(this.email == '') {
      alert("Please enter email");
      return;
    }
    if(this.password == ''){
      alert("Please enter password");
      return;
    }
    this.auth.loginByEmail(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
