import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationServiceService } from '../_services/authentication-service.service';

@Component({
  selector: 'app-propositionentattendevalidation',
  templateUrl: './propositionentattendevalidation.component.html',
  styleUrls: ['./propositionentattendevalidation.component.scss']
})
export class PropositionentattendevalidationComponent {
  total:any[] = [];


  constructor( private authenticationService: AuthenticationServiceService,private toastr: ToastrService,) {
    this.authenticationService.propositionenattentedevalidation()
    .subscribe((data: any)=>{

      this.total.push(data);

      console.log("ruisha",this.total);
    },
    (err)=>{
       console.log(err);
    });
  }

  async accepter(id :any){

    console.log("id",id);
    this.authenticationService.newechange(id).subscribe((data: any)=>{
      console.log("data",data);
      this.toastr.success('Proposition acceptée avec succès', 'Succès');

    },
    (err)=>{
       console.log(err);
    });

  }

}
