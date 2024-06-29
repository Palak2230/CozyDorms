import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';
import { PgCardComponent } from './Components/search-results/pg-card/pg-card.component';
import { PgDetailedComponent } from './Components/pg-detailed/pg-detailed.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'results', component: SearchResultsComponent },
  { path: 'pgcard', component: PgCardComponent },
  {
    path: 'pg', component: PgDetailedComponent

  },

  { path: '', redirectTo: '/results', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
