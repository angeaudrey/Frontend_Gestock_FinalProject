import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../_services/authentication-service.service';

@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.scss']
})
export class PropositionComponent {
  total:any[] = [];
  constructor(    private authenticationService: AuthenticationServiceService) {

    this.authenticationService.propositionenattente()
    .subscribe((data: any)=>{

      this.total.push(data);

      console.log("ruisha",this.total);
    },
    (err)=>{
       console.log(err);
    });
   }


}
