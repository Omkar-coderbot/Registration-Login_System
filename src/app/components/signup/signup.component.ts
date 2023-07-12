import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import ValidateForm from 'src/app/helper/validateForm';
import Swal from 'sweetalert2';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth : AuthService, private router: Router) { }

  ngOnInit(): void {
  
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
     

    })
  }

  hideShowPass(){

    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    // debugger;
    if(this.signupForm.valid){
      console.log(this.signupForm.value);
      // debugger;


      this.auth.signup(this.signupForm.value)
      .subscribe({
        next:(res) => {
          // alert(res.message)
          this.auth.storeToken(res.token);
          this.signupForm.reset();
          this.router.navigate(['login'])
          Swal.fire('Ok...', 'User Registration Success!', 'success');
        },
        error:(err) => {
          alert(err.error.message);
          Swal.fire('Ok...', "", 'error');
        }
      })


     
    }
    else{
      debugger;
      
      ValidateForm.validateFormFields(this.signupForm);
      // alert("Invalid Form");
      Swal.fire('Ok...', 'Registration UnSuccess!', 'error');
    }
  }

  

}


