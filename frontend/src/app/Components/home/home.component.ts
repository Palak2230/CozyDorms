import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PgService } from 'src/app/services/pg.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pg } from 'src/app/shared/models/pg';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login-page/login-page.component';




declare const ScrollReveal: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {


  options: string[] = ['Mumbai', 'Delhi', 'Pune'];
  filteroptions !: Observable<string[]>;
  formcontrol = new FormControl('');
  cities: string[] = [];
  user!: User;
  totalpgs: number = 0;
  pgs !: Pg[];
  totalusers: number = 0;
  users !: User[];
  ngOnInit(): void {

    // let PgsObservable: Observable<Pg[]>;
    let CityObservable: Observable<string[]>;
    let PgsObservable: Observable<Pg[]>;
    let UsersObservable: Observable<User[]>;
    this.activatedRoute.params.subscribe((params) => {


      CityObservable = this.pgService.getCities();
      PgsObservable = this.pgService.getAll();
      UsersObservable = this.userService.getAll();

      CityObservable.subscribe((serverlocalities) => {
        this.cities = serverlocalities;
       
      });
      PgsObservable.subscribe((serverpgs) => {
        this.totalpgs = serverpgs.length;
        this.pgs = serverpgs;

      });

      UsersObservable.subscribe((serverusers) => {
        this.totalusers = serverusers.length;
        this.users = serverusers;
      });

    });

    this.filteroptions = this.formcontrol.valueChanges.pipe(
      startWith(''), map(value => this._FILTER(value || ''))
    );
    this.userService.userObservable.subscribe(user => {
      this.user = user;

    });

  }
  private _FILTER(value: string) {
    const searchvalue = value.toLocaleLowerCase();
    return this.cities.filter(option => option.toLocaleLowerCase().includes(searchvalue));
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  constructor(private renderer: Renderer2, private pgService: PgService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, private _dialog: MatDialog) {

  }

  searchpg(term: string): void {
    if (term) {
      this.router.navigateByUrl('/results/' + term, {
        state: {
          data: { minvalue: this.minvalue, maxvalue: this.maxvalue },
        }
      });
    }
  }
  minvalue: number = 0;
  calleventmin(event: any) {
    this.minvalue = event.target.value;
  }
  calleventmax(event: any) {
    this.maxvalue = event.target.value;
  }
  maxvalue: number = 100000;
  add() {
    if (!this.user.name) {
      this._dialog.open(LoginPageComponent, {
        panelClass: 'bg-color',
      });
    }
    else { this.router.navigate(['/add']); }

  }
  gotowishlist() {
    if (!this.user.name) {
      this._dialog.open(LoginPageComponent, {
        panelClass: 'bg-color',
      });
    } else {
      this.router.navigate(['/wishlist']);
    }

  }

  gologin() {
    this._dialog.open(LoginPageComponent, {
      panelClass: 'bg-color',
    });
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.name;
  }
  openprofile() {
    this._dialog.open(ProfileComponent, {
      panelClass: 'bg-color',
    });
  }

  myFunction(): void {
    const dots = document.getElementById('dots');
    const moreText = document.getElementById('more');
    const btnText = document.getElementById('myBtn');

    if (dots && moreText && btnText) {
      if (dots.style.display === 'none') {
        dots.style.display = 'inline';
        btnText.innerHTML = 'Read more';
        moreText.style.display = 'none';
      } else {
        dots.style.display = 'none';
        btnText.innerHTML = 'Read less';
        moreText.style.display = 'inline';
      }
    }
  }
}