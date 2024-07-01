import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';
import { PgDetailedComponent } from './Components/pg-detailed/pg-detailed.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'results/:searchTerm', component: SearchResultsComponent },
  { path: 'results', component: SearchResultsComponent },
  { path: 'pg', component: PgDetailedComponent },
  { path: '', redirectTo: '/results', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
