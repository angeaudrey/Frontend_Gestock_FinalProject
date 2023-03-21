import { Component, OnInit } from '@angular/core';

 import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit{
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
      private fb:FormBuilder,
  ) {
    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
  });
      // redirect to home if already logged in
      if (this.authenticationService.userValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {

  }

  // convenience getter for easy access to form fields
register() {
    console.log("register");
    this.router.navigate(['/inscription']);
 }

  login() {
    console.log("login");
    const val = this.form.value;

      this.submitted = true;

      console.log(val);


       this.error = '';
      this.loading = true;
      this.authenticationService.login(val.username , val.password)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from route parameters or default to '/'
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  this.router.navigate([returnUrl]);
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }
}
