import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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

  filterOptions!: Observable<string[]>;
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
        LocalityObservable = this.pgService.getlocalitiesBySearch(params['searchTerm']);

      } else {
        PgsObservable = this.pgService.getAll();
        LocalityObservable = this.pgService.getLocalities();
      }
      PgsObservable.subscribe((serverpgs) => {
        this.pgs = serverpgs;
        this.pgsample = serverpgs;
      });
      LocalityObservable.subscribe((serverlocalities) => {
        console.log(serverlocalities);
        this.localities = serverlocalities;
      });
    });

    this.filterOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.localities.filter(option => option.toLowerCase().includes(filterValue));
  }

  tenant_type: any[] = [{ id: 1, type: 'Female' },
  { id: 2, type: 'Male' },
  { id: 3, type: 'Any' }];

  room_type: any[] = [{ id: 1, type: 'Single Room' },
  { id: 2, type: 'Double Room' },
  { id: 3, type: 'Triple Room' },
  { id: 4, type: 'Other' }
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


  getPgs() {
    this.pgsample = this.pgService.filter(this.pgs, this.selectedTenantsValues, this.selectedRoomsValues, this.selectedRatingsValues, this.selectedLocalities);
    console.log(this.pgsample);
  }
  clearAll() {
    this.selectedLocalities = [];
    this.selectedRatings = [];
    this.selectedRooms = [];
    this.selectedTenants = [];
    this.getPgs();

  }

}
