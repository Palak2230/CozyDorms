import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PgService } from 'src/app/services/pg.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login-page/login-page.component';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  options: string[] = ['Mumbai', 'Delhi', 'Pune'];
  filteroptions!: Observable<string[]>;
  formcontrol = new FormControl('');
  user!: User;

  constructor(
    private pgService: PgService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.filteroptions = this.formcontrol.valueChanges.pipe(
      startWith(''),
      map(value => this._FILTER(value || ''))
    );

    this.userService.userObservable.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

  private _FILTER(value: string) {
    const searchvalue = value.toLocaleLowerCase();
    return this.options.filter(option => option.toLocaleLowerCase().includes(searchvalue));
  }

  gotoyours() {
    this.router.navigate(['/yourproperty']);
  }

  gologin() {
    this._dialog.open(LoginPageComponent, {
      panelClass: 'bg-color',
    });
  }

  logout() {
    this.userService.logout();
  }

  searchpg(event: any): void {
    if (event.target.value)
      this.router.navigate(['/results', event.target.value]);
  }
 get isAuth(){
  return this.user.name;
 }
 
}
