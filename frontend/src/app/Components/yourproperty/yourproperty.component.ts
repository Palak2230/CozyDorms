import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { PgService } from 'src/app/services/pg.service';
import { UserService } from 'src/app/services/user.service';
import { Pg } from 'src/app/shared/models/pg';
import { Rooms } from 'src/app/shared/models/rooms';

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
    private router: Router
  ) {

  }



  pgrating: number = 0;
  ngOnInit(): void {
    const item = localStorage.getItem('User');
    const user = JSON.parse(item || '')
    // if(! user){}
    // console.log(user);
    let PgsObservable: Observable<Pg[]>;
    console.log(user);
    PgsObservable = this.pgService.getAll();
    PgsObservable.subscribe((serverpgs) => {
      this.pgs = serverpgs;
      // this.pgs = this.pgs.filter((pg) => {
      //   console.log(pg.owner);

      //   // pg.owner && pg.owner.email && pg.owner.email == user.email;
      // })

    }
    );
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
