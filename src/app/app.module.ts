import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { Form, FormArray, FormControl } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { SearchResultsComponent } from './Components/search-results/search-results.component';
import { PgCardComponent } from './Components/search-results/pg-card/pg-card.component';
import { MatIconModule } from '@angular/material/icon';
import { PgDetailedComponent } from './Components/pg-detailed/pg-detailed.component';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultsComponent,
    PgCardComponent,
    PgDetailedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatIconModule,
    NgbModule,
    NgbCarouselModule,
    MatTableModule,
    MatSortModule,
  


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
