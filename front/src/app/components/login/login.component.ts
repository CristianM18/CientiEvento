import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LoginI } from 'src/app/models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 
  loginform = new FormGroup({
    usuario : new FormControl('', Validators.required),
    clave : new FormControl('', Validators.required)
  })
  

  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void{
  }

  onLogin(form: LoginI){
   
      console.log("hola")
    
  }
  
}

