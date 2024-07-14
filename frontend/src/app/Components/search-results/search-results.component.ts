import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { async, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Pg } from 'src/app/shared/models/pg';
import { PgService } from 'src/app/services/pg.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

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

  filterOptions!: Observable<Pg[]>;
  formControl = new FormControl('');

  constructor(
    private pgService: PgService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }


  ngOnInit(): void {
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
      });
      LocalityObservable.subscribe((serverlocalities) => {
        this.localities = serverlocalities;
      });
    });

    this.filterOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    // this.pgsample = this.filterOptions;
    this.pgsample = this._filter(this.formControl.value || '');
    this.getPgs();

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

  tenant_type: any[] = [{ id: 1, type: 'Female' },
  { id: 2, type: 'Male' },
  { id: 3, type: 'Unisex' }];

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
    console.log(this.selectedFilters);
    this.pgfiltered = this.pgService.filter(this.pgsample, this.selectedTenantsValues, this.selectedRoomsValues, this.selectedRatingsValues);
    console.log(this.pgfiltered);
  }

  clearAll() {
    this.selectedRatings = [];
    this.selectedRooms = [];
    this.selectedTenants = [];
    this.getPgs();

  }

}
