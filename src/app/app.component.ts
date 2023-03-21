import { Component } from '@angular/core';
import { User } from './_models';
import { AuthenticationServiceService } from './_services/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  user?: User | null;
  title = 'gestiontroc';


  constructor(private authenticationService: AuthenticationServiceService) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.authenticationService.logout();
  }
}
