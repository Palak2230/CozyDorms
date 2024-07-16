import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';

import { LoginPageComponent } from './Components/login-page/login-page.component';
import { PgComponent } from './Components/pg/pg.component';
import { PropertyComponent } from './Components/property/property.component';
import { YourpropertyComponent } from './Components/yourproperty/yourproperty.component';
import { EditpropertyComponent } from './Components/editproperty/editproperty.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'results/:searchTerm', component: SearchResultsComponent },
  { path: 'results', component: SearchResultsComponent },
  { path: 'results/pg/:searchTerm', component: PgComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'pg', component: PgComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'editpg/:searchTerm', component: EditpropertyComponent },
  { path: 'yourproperty', component: YourpropertyComponent },

  { path: '', redirectTo: '/yourproperty', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
