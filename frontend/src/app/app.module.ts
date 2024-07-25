import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { SearchResultsComponent } from './Components/search-results/search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSort, Sort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { PgComponent } from './Components/pg/pg.component';
import { PropertyComponent } from './Components/property/property.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { envionment } from 'src/environments/environment';
import { YourpropertyComponent } from './Components/yourproperty/yourproperty.component';
import { EditpropertyComponent } from './Components/editproperty/editproperty.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultsComponent,

    HeaderComponent,
    LoginPageComponent,
    PgComponent,
    PropertyComponent,
    YourpropertyComponent,
    EditpropertyComponent,
    WishlistComponent,
    PaginationComponent,

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
    FormsModule,
    ToastrModule.forRoot({ timeOut: 3000, positionClass: 'toast-top-right', newestOnTop: false })
    ,
    MatCardModule,
    MatButtonModule,
    NgOtpInputModule,
    MatToolbarModule,
    MatStepperModule,
    MatProgressBarModule,
    MatRadioModule,
    RouterModule,
    NgxPaginationModule,
    MatPaginatorModule








  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
// { provide: LocationStrategy, useClass: HashLocationStrategy }
export class AppModule {



}
