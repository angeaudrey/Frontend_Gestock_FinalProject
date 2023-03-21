import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';



import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { DepotComponent } from './depot/depot.component';
import { RechercheComponent } from './recherche/recherche.component';
import { DetailComponent } from './detail/detail.component';
import { RegisterComponent } from './register/register.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { PropositionComponent } from './proposition/proposition.component';
import { PropositionentattendevalidationComponent } from './propositionentattendevalidation/propositionentattendevalidation.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DepotComponent,
    RechercheComponent,
    DetailComponent,
    RegisterComponent,
    ModalPopupComponent,
    PropositionComponent,
    PropositionentattendevalidationComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,ToastrModule.forRoot(),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
