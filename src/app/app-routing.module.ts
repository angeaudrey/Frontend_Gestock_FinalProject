import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepotComponent } from './depot/depot.component';
import { DetailComponent } from './detail/detail.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PropositionComponent } from './proposition/proposition.component';
import { PropositionentattendevalidationComponent } from './propositionentattendevalidation/propositionentattendevalidation.component';
import { RechercheComponent } from './recherche/recherche.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'offre', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'deposer', component: DepotComponent, canActivate: [AuthGuard] },
  { path: 'rechercher', component: RechercheComponent, canActivate: [AuthGuard]},
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard]},
  { path: 'inscription', component: RegisterComponent},
  { path: 'mes-proposition', component: PropositionComponent, canActivate: [AuthGuard]},
  { path: 'mes-proposition-en-attente-de-validation', component: PropositionentattendevalidationComponent, canActivate: [AuthGuard]},
   // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
