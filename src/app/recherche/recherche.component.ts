import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationServiceService } from '../_services/authentication-service.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent {
  query: any;
  query2: any;
  form !: FormGroup;
   event : any;
   total:any[] = [];
   listearticlereq:any[] = [];
  constructor(public fb: FormBuilder, private http: HttpClient, private toastr: ToastrService, private authenticationService: AuthenticationServiceService) {
    this.form = this.fb.group({
      designation: ['', Validators.required],

      idcategorie: ['', Validators.required],

    });
    this.authenticationService.getCategorie().subscribe((data: any) => {

      console.log("data getCategorie",data.data);
      this.total.push(data.data);

      console.log("ruisha",this.total);
    }
    );
  }

  search() {
    const token = localStorage.getItem('token');
    const headers = {
     'Authorization': `Bearer ${token}`,
    };
    this.listearticlereq = [];
    this.http.get('https://127.0.0.1:8000/api/articles/rechercher?q=' + this.form.get('designation')?.value + '&q1=' + this.form.get('idcategorie')?.value ,{ headers }).subscribe(data => {
      // Traitez les résultats de la recherche ici

      this.listearticlereq.push(data);
      console.log(data);
    });
  }
}
