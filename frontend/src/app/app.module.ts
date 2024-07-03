import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { SearchResultsComponent } from './Components/search-results/search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { PgDetailedComponent } from './Components/pg-detailed/pg-detailed.component';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSort, Sort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgOtpInputModule } from 'ng-otp-input';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultsComponent,
    PgDetailedComponent,
    HeaderComponent,
    LoginPageComponent
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
    MatCheckboxModule,
    MatPaginatorModule,
    FormsModule
    , HttpClientModule,
    AutoCompleteModule,
    MatDialogModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
    ,
    MatCardModule,
    MatButtonModule,
    NgOtpInputModule







  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
