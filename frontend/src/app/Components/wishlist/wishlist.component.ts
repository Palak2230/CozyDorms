import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PgService } from 'src/app/services/pg.service';
import { UserService } from 'src/app/services/user.service';
import { Pg } from 'src/app/shared/models/pg';
import { Rooms } from 'src/app/shared/models/rooms';
import { User } from 'src/app/shared/models/User';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  liked: boolean = false;
  report: boolean = false;
  pgs: Pg[] = [];
  pgsample: Pg[] = [];
  localities: string[] = [];

  filterOptions!: Observable<Pg[]>;
  formControl = new FormControl('');

  constructor(
    private pgService: PgService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog
  ) {

  }



  pgrating: number = 0;
  ngOnInit(): void {
    const item = localStorage.getItem('User');
    const user = JSON.parse(item || '');
    const item2 = localStorage.getItem('Wishlist');
    this.wishlist = item ? JSON.parse(item2 || '') : [];
    this.user = user;

    let PgsObservable: Observable<Pg[]> = this.pgService.getAll();
    PgsObservable.subscribe((serverpgs) => {
      // this.pgs = serverpgs;
      this.pgs = serverpgs.filter(pg => pg.owner && pg.owner.email === user.email);
    
    }, (error) => {
      console.error('Error fetching PGs:', error);
    });
  }

  convert(rating: number) {
    return Number(rating).toFixed(1);
  }
  price: number = 0;
  findminprice(rooms: Rooms[]) {
    this.price = 500000;
    rooms.forEach((room) => {
      this.price = Math.min(this.price, room.rent);
    })
    return this.price;
  }
  wishlist: Pg[] = [];
  user!: User;
  IsInWishlist(pg: Pg) {
   

    const item = localStorage.getItem('Wishlist');
    this.wishlist = item ? JSON.parse(item) : [];


    const pgIndex = this.wishlist.findIndex((pgs) => pgs.id === pg.id);
  
    this.wishlist.splice(pgIndex, 1);
   
    localStorage.setItem('Wishlist', JSON.stringify(this.wishlist));
  

  }
  isPgInWishlist(pg: Pg): boolean {
    return this.wishlist.some((pgs: Pg) => pgs.id === pg.id);
  }
  deletepg(id: string) {
   
    this.pgService.deletepg(id).subscribe();
    this.ngOnInit();
  }
  editpg(id: string) {

    this.router.navigate([]);
    this.ngOnInit();
  }

}
