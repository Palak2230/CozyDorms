import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { async, Observable } from 'rxjs';
import { map, min, startWith } from 'rxjs/operators';
import { Pg } from 'src/app/shared/models/pg';
import { PgService } from 'src/app/services/pg.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Rooms } from 'src/app/shared/models/rooms';
import { User } from 'src/app/shared/models/User';
import { LoginPageComponent } from '../login-page/login-page.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements OnInit {
  liked: boolean = false;
  report: boolean = false;
  pgs: Pg[] = [];
  pgsample: Pg[] = [];
  localities: string[] = [];
  wishlist: Pg[] = [];
  filterOptions!: Observable<Pg[]>;
  formControl = new FormControl('');


  constructor(
    private pgService: PgService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private _dialog: MatDialog
  ) {

  }

  pgrating: number = 0;
  minvalue: number = 0;
  maxvalue: number = 100000;
  ngOnInit(): void {
    console.log(history);
    this.minvalue = history.state.data.minvalue;
    this.maxvalue = history.state.data.maxvalue;
    console.log(this.minvalue);
    console.log(this.maxvalue);
    let PgsObservable: Observable<Pg[]>;
    let LocalityObservable: Observable<string[]>;
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        PgsObservable = this.pgService.getAllBySearch(params['searchTerm']);
        // LocalityObservable = this.pgService.getlocalitiesBySearch(params['searchTerm']);
      } else {
        PgsObservable = this.pgService.getAll();
        // LocalityObservable = this.pgService.getLocalities();
      }
      PgsObservable.subscribe((serverpgs) => {
        this.pgs = serverpgs;
        this.pgsample = serverpgs;
        this.pgfiltered = serverpgs;
        console.log(this.pgfiltered);
        this.changePage(1);
      });
      // LocalityObservable.subscribe((serverlocalities) => {
      //   this.localities = serverlocalities;
      // });
    });

    this.filterOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    // this.pgsample = this.filterOptions;
    this.pgsample = this._filter(this.formControl.value || '');
    const item = localStorage.getItem('User');
    if (item) this.user = JSON.parse(item);
    // localStorage.setItem('Wishlist', JSON.stringify([]));

    // this.wishlist = JSON.parse(localStorage.getItem('Wishlist') || '');
    this.getPgs();

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
  show() {
    this.pgsample = this._filter(this.formControl.value || '');
    this.getPgs();
  }
  private _filter(value: string): Pg[] {
    const filterValue = value.toLowerCase();

    this.pgsample = this.pgs.filter(option => option.address.toLowerCase().includes(filterValue));
    return this.pgsample;
  }

  tenant_type: any[] = [{ id: 1, type: 'female' },
  { id: 2, type: 'male' },
  { id: 3, type: 'unisex' }];

  room_type: any[] = [{ id: 1, type: 'Single Room', value: '1' },
  { id: 2, type: 'Double Room', value: '2' },
  { id: 3, type: 'Triple Room', value: '3' },
  { id: 4, type: 'Other', value: 'other' }
  ];

  rating_type: any[] = [{ id: 1, type: '1' },
  { id: 2, type: '2' },
  { id: 3, type: '3' },
  { id: 4, type: '4' },
  { id: 5, type: '5' },
  ];

  foundfilters: any[] = [];

  findfilters(pg: Pg) {
    this.foundfilters = [];
    this.selectedRoomsValues.forEach((room) => {
      for (let i of room.rooms) {
        if (i.occupancy == room.value) {
          this.foundfilters.push(room.type);
          break;
        }
        if (room.type == 'others' && i.occupancy > 3) { this.foundfilters.push(room.type); break; }
      }
    })

  }

  selectedTenants: any[] = [];

  get selectedTenantsValues() {

    return this.tenant_type.filter((e, i) => this.selectedTenants[i]);
  }
  selectedRooms: any[] = [];

  get selectedRoomsValues() {
    return this.room_type.filter((e, i) => this.selectedRooms[i]);
  }
  selectedRatings: any[] = [];

  get selectedRatingsValues() {
    return this.rating_type.filter((e, i) => this.selectedRatings[i]);
  }
  selectedLocalities: any[] = [];
  updateMySelection(event: any) {
    this.selectedLocalities.push(event.option.value);
    this.getPgs();
  }

  selectedFilters: any[] = [];
  pgfiltered: Pg[] = this.pgsample;
  getPgs() {
    this.selectedFilters = [];
    // this.selectedFilters = this.selectedFilters.concat(this.selectedLocalities);
    this.selectedFilters = this.selectedFilters.concat(this.selectedRoomsValues);
    this.selectedFilters = this.selectedFilters.concat(this.selectedTenantsValues);
    this.selectedFilters = this.selectedFilters.concat(this.selectedRatingsValues);
    this.pgfiltered = this.pgService.filter(this.pgsample, this.selectedTenantsValues, this.selectedRoomsValues, this.selectedRatingsValues);

  }

  clearAll() {
    this.selectedRatings = [];
    this.selectedRooms = [];
    this.selectedTenants = [];

    this.getPgs();
  }
  user!: User;
  // if(this.user) { wishlist = JSON.parse(localStorage.getItem()) }
  IsInWishlist(pg: Pg) {
    console.log(this.wishlist);
    console.log(this.user);

    const item = localStorage.getItem('Wishlist');
    this.wishlist = item ? JSON.parse(item) : [];

    if (!this.user) {
      this._dialog.open(LoginPageComponent, {
        panelClass: 'bg-color',
      });
    } else {
      const pgIndex = this.wishlist.findIndex((pgs) => pgs.id === pg.id);
      if (pgIndex !== -1) {
        this.wishlist.splice(pgIndex, 1);
        console.log('Removed from wishlist');
      } else {
        this.wishlist.push(pg);
        console.log('Added to wishlist');
      }
      localStorage.setItem('Wishlist', JSON.stringify(this.wishlist));
      console.log(this.wishlist);
    }
  }

  isPgInWishlist(pg: Pg): boolean {
    return this.wishlist.some((pgs) => pgs.id === pg.id);
  }

  calleventmin(event: any) {
    this.minvalue = event.target.value;
  }
  calleventmax(event: any) {
    this.maxvalue = event.target.value;
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  currentPage = 1;
  itemsPerPage = 4;
  // items: any[] = []; // Replace with your data type
  paginatedItems: any[] = this.pgfiltered; // Store items for the current page


  changePage(page: number): void {
    // if (page < 1 || page > this.totalPages) {
    //   return; // Exit if page is out of bounds
    // }
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedItems = this.pgfiltered.slice(start, end);
    console.log(this.paginatedItems);
  }

  get totalPages(): number {
    console.log(Math.ceil(this.pgfiltered.length / this.itemsPerPage));
    return Math.ceil(this.pgfiltered.length / this.itemsPerPage);
  }




}
