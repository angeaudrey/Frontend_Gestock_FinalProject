import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationServiceService } from '../_services/authentication-service.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {
   form !: FormGroup;
   event : any;
   total:any[] = [];

  constructor(public fb: FormBuilder, private http: HttpClient, private toastr: ToastrService,    private router: Router,      private route: ActivatedRoute,private authenticationService: AuthenticationServiceService,
    ) {
    this.form = this.fb.group({
      designation: ['', Validators.required],
      description: ['', [Validators.required, Validators.email]],
      montantestimation: ['', Validators.required],
      statut: ['', Validators.required],
      iduser: ['', Validators.required],
      idcategorie: ['', Validators.required],
      image: [null],
    });
    this.authenticationService.getCategorie().subscribe((data: any) => {

      console.log("data getCategorie",data.data);
      this.total.push(data.data);

      console.log("ruisha",this.total);
    }
    );
   }

  ngOnInit() {


  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      image: file
    });
     this.form.updateValueAndValidity();


  }

  submitForm() {
    const formData: FormData = new FormData();
    formData.append('designation', this.form.get('designation')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('statut', this.form.get('statut')?.value);
    formData.append('idcategorie', this.form.get('idcategorie')?.value);
    formData.append('montantestimation', this.form.get('montantestimation')?.value);
    formData.append('image', this.form.get('image')?.value);




    const token = localStorage.getItem('token');
     const headers = {
      'Authorization': `Bearer ${token}`,
     };

    this.http.post('https://127.0.0.1:8000/api/articles/add', formData, { headers }).subscribe({
  next: (response) => {
    console.log("eeeeeeeeee",response);
    this.toastr.success('L\'article a été soumis merci de continuer L\'etape 2', 'Succès');
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/rechercher';
    this.router.navigate([returnUrl]);
  },
  error: (error) => console.log("erreur",error),
  complete: () => console.log('HTTP request completed.'),
});
  }
}
