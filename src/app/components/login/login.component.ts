import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import ValidateForm from 'src/app/helper/validateForm';
import Swal from 'sweetalert2';
import { SignupComponent } from '../signup/signup.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  type: string = "password";
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    const state: RouterState = router.routerState;
    console.log(state);
    const root: ActivatedRoute = state.root;
    console.log(root);
    const child = root.firstChild;
    console.log(child);
    console.log("route url",route.url);
    
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){

    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  

  onLogin(){
    
    // debugger;
    if(this.loginForm.valid){
      // debugger;
      console.log(this.loginForm.value);
      // debugger;
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=> {
          // alert(res.message)
          // debugger;
          
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
          Swal.fire('Ok...', 'Login Success!', 'success');
         
        },
       
        error:(err) => {
          debugger;
          // alert(err.error.message)
          Swal.fire('Ok...', 'Login UnSuccess!', 'error');
        }
      })

    
    }
    else{
      debugger;
      
      ValidateForm.validateFormFields(this.loginForm);
      alert("Invalid Form");

      
    }
  }




}
