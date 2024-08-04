import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { PgService } from 'src/app/services/pg.service';
import { UserService } from 'src/app/services/user.service';
import { Pg } from 'src/app/shared/models/pg';
import { Rooms } from 'src/app/shared/models/rooms';
import { User } from 'src/app/shared/models/User';
import { LoginPageComponent } from '../login-page/login-page.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-yourproperty',
  templateUrl: './yourproperty.component.html',
  styleUrls: ['./yourproperty.component.scss']
})
export class YourpropertyComponent {
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
    const user = JSON.parse(item || '')
   
   
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
    if (pgIndex !== -1) {
      this.wishlist.splice(pgIndex, 1);

    } else {
      this.wishlist.push(pg);
  
    }
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


  // show() {
  //   this.pgsample = this._filter(this.formControl.value || '');

  // }
  // private _filter(value: string): Pg[] {
  //   const filterValue = value.toLowerCase();

  //   this.pgsample = this.pgs.filter(option => option.address.toLowerCase().includes(filterValue));
  //   return this.pgsample;
  // }

  // tenant_type: any[] = [{ id: 1, type: 'Female' },
  // { id: 2, type: 'Male' },
  // { id: 3, type: 'Unisex' }];

  // room_type: any[] = [{ id: 1, type: 'Single Room', value: '1' },
  // { id: 2, type: 'Double Room', value: '2' },
  // { id: 3, type: 'Triple Room', value: '3' },
  // { id: 4, type: 'Other', value: 'other' }
  // ];

  // rating_type: any[] = [{ id: 1, type: '1' },
  // { id: 2, type: '2' },
  // { id: 3, type: '3' },
  // { id: 4, type: '4' },
  // { id: 5, type: '5' },
  // ];

  // foundfilters: any[] = [];

  // findfilters(pg: Pg) {
  //   this.foundfilters = [];
  //   this.selectedRoomsValues.forEach((room) => {
  //     for (let i of room.rooms) {
  //       if (i.occupancy == room.value) {
  //         this.foundfilters.push(room.type);
  //         break;
  //       }
  //       if (room.type == 'others' && i.occupancy > 3) { this.foundfilters.push(room.type); break; }
  //     }
  //   })

  // }

  // selectedTenants: any[] = [];

  // get selectedTenantsValues() {

  //   return this.tenant_type.filter((e, i) => this.selectedTenants[i]);
  // }
  // selectedRooms: any[] = [];

  // get selectedRoomsValues() {
  //   return this.room_type.filter((e, i) => this.selectedRooms[i]);
  // }
  // selectedRatings: any[] = [];

  // get selectedRatingsValues() {
  //   return this.rating_type.filter((e, i) => this.selectedRatings[i]);
  // }
  // selectedLocalities: any[] = [];
  // updateMySelection(event: any) {
  //   this.selectedLocalities.push(event.option.value);
  //   this.getPgs();
  // }

  // selectedFilters: any[] = [];
  // pgfiltered: Pg[] = this.pgsample;
  // getPgs() {
  //   this.selectedFilters = [];
  //   // this.selectedFilters = this.selectedFilters.concat(this.selectedLocalities);
  //   this.selectedFilters = this.selectedFilters.concat(this.selectedRoomsValues);
  //   this.selectedFilters = this.selectedFilters.concat(this.selectedTenantsValues);
  //   this.selectedFilters = this.selectedFilters.concat(this.selectedRatingsValues);
  //   this.pgfiltered = this.pgService.filter(this.pgsample, this.selectedTenantsValues, this.selectedRoomsValues, this.selectedRatingsValues);

  // }

  // clearAll() {
  //   this.selectedRatings = [];
  //   this.selectedRooms = [];
  //   this.selectedTenants = [];

  //   this.getPgs();

  // }

}
