import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthenticationServiceService } from '../_services/authentication-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  form:FormGroup;


  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationServiceService,
      private fb:FormBuilder,private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      email: ['',Validators.required],
      name: ['',Validators.required],
      nameplaintextPassword : ['',Validators.required],
      phone_number: ['',Validators.required],

  });
      // redirect to home if already logged in
      if (this.authenticationService.userValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {

  }

  login(){
    this.router.navigate(['/login']);
  }

  // convenience getter for easy access to form fields

  register() {
    console.log("register");
    const val = this.form.value;

      this.submitted = true;

      console.log(val);


       this.error = '';
      this.loading = true;
      this.authenticationService.register(val.name, val.username, val.phone_number, val.email, val.nameplaintextPassword)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from route parameters or default to '/'
                  this.toastr.success('Votre compte à ete creer merci de vous connecter', 'Succès');
                  this.router.navigate(['/login']);

              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }
}
