import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../_services/authentication-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{

    total:any[] = [];

    constructor(      private authenticationService: AuthenticationServiceService,
      ) {
        this.authenticationService.getlistearticle()
        .subscribe((data: any)=>{

          this.total.push(data);

          console.log("ruisha",this.total);
        },
        (err)=>{
           console.log(err);
        });
      }

    ngOnInit(): void {

    }

}
