import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthenticationServiceService } from '../_services/authentication-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent   {
  id: any;

  produit:any[] = [];
  produit1:any[] = [];
  form !:FormGroup;
  loading = false;
  submitted = false;
  error = '';
  identifiant:any;

  constructor(
    private router: Router, private fb:FormBuilder,private route: ActivatedRoute,public authenticationService : AuthenticationServiceService,private toastr: ToastrService,) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("DetailComponent",id);
    this.identifiant = id;
    this.authenticationService.getDetailarticle(id).subscribe((data: any) => {

      console.log("data getDetailarticle",data[0]);
      this.produit.push(data[0]);
      console.log("data getDetailarticle produit",this.produit);

    }
    );
    this.authenticationService.getlistearticlecreer().subscribe((data: any) => {
      console.log("data getDetailarticle2",data[0]);
      this.produit1.push(data[0]);
      console.log("data getDetailarticle2 produit",this.produit1);

    }
    );
    this.form = this.fb.group({
      message: ['',Validators.required],
      idarticledemande: ['',Validators.required],
      idarticlequirecois: [''],

  });
   }


   proposition(){
    console.log("login identifiant",this.identifiant);
    const val = this.form.value;

      this.submitted = true;

      console.log(val);


       this.error = '';
      this.loading = true;
      this.authenticationService.proposition(val.message,  val.idarticledemande,  this.identifiant)
          .pipe(first())
          .subscribe({
              next: () => {
                this.toastr.success('Proposition demandee', 'Succès');

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
