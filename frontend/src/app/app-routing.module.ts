import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';
import { PgDetailedComponent } from './Components/pg-detailed/pg-detailed.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { PgComponent } from './Components/pg/pg.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'results/:searchTerm', component: SearchResultsComponent },
  { path: 'results', component: SearchResultsComponent },
  { path: 'results/pg/:searchTerm', component: PgDetailedComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'pg', component: PgComponent },

  { path: '', redirectTo: '/pg', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
