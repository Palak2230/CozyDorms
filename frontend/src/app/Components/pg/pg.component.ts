
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { trigger, transition, style, animate } from "@angular/animations";
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Pg } from 'src/app/shared/models/pg';
import { ActivatedRoute } from '@angular/router';
import { PgService } from 'src/app/services/pg.service';
import { Observable } from 'rxjs';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Review } from 'src/app/shared/models/Review';
import { User } from 'src/app/shared/models/User';


@Component({
  selector: 'app-pg',
  templateUrl: './pg.component.html',
  styleUrls: ['./pg.component.scss']
})

export class PgComponent implements AfterViewInit, OnInit {


  public slides = [
    { src: "../../../assets/room-1.jpg" },
    { src: "../../../assets/room-2.jpg" },
    { src: "../../../assets/room-3.jpg" },
  ];
  currentSlide = 0;


  wishlist: Pg[] = [];
  user: any; // replace with appropriate user type


  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

  pg!: Pg;
  url!: string;
  //ROOM DETAILS
  displayedColumns: string[] = ['occupancy', 'roomtype', 'rooms', 'vacancies', 'rent', 'deposit'];
  dataSource !: any;
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.embedMap();
  }
  // address: string = this.pg.address;
  embedMap(): void {
    console.log(this.pg.address);
    const encodedAddress = encodeURIComponent(this.pg.address);
    this.directionlink = 'https://www.google.com/maps/dir//' + encodedAddress;
    console.log(encodedAddress);
    const embed = `
      <iframe width='900' height='500' frameborder='0' loading='lazy'
      scrolling='no' marginheight='0' marginwidth='0' 
      src='https://maps.google.com/maps?&amp;q=${encodedAddress}&amp;output=embed'></iframe>
    `;
    document.querySelector('.place')!.innerHTML = embed;
  }
  constructor(private _liveAnnouncer: LiveAnnouncer, private _dialog: MatDialog, private activatedRoute: ActivatedRoute, private pgService: PgService, private renderer: Renderer2, private _fb: FormBuilder, private modalService: NgbModal
  ) {
    this.reviewForm = this._fb.group({
      stars: [0, Validators.required],
      comment: ['']
    })
    this.url = window.location.href;


  }

  openModal(modalContent: any) {
    this.modalService.open(modalContent, { centered: true });
  }

  submitreview(text: string) {
    if (this.starvalue == 0) {
      alert('Rating not valid !');
      return;
    }

    const review = {
      id: this.pg.id,
      user: this.user,
      rating: this.starvalue,
      comment: text
    };

    this.pgService.addreview(review).subscribe({
      next: (serverpgs) => {
        console.log(serverpgs);
        this.ngOnInit();
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.error('Error adding review:', error);
      }
    });


  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
  directionlink: string = '';
  tabs!: NodeListOf<HTMLElement>;
  all_content!: NodeListOf<HTMLElement>;

  starvalue: number = 0;
  pgstars: number = 0;
  ngOnInit(): void {
    // Initially hide all tab contents except the default one


    // this.activatedRoute.params.subscribe((params) => {
    //   if (params.id)
    //     this.pg = pgservice.getPgById('mumbai');
    // })
    let PgsObservable: Observable<Pg>;

    this.activatedRoute.params.subscribe((params) => {
      console.log(this.activatedRoute);
      PgsObservable = this.pgService.getPgById(params['searchTerm']);
      PgsObservable.subscribe((serverpgs) => {
        this.pg = serverpgs;
        this.dataSource = this.pg.rooms;
        this.pgstars = Math.round(this.pg.stars);
      });

    });

    const item = localStorage.getItem('Wishlist');
    this.wishlist = JSON.parse(item || '[]');
    // Assume user information is stored in local storage or retrieved from a service
    this.user = JSON.parse(localStorage.getItem('User') || '{}');
  }
  convert(rating: number) {
    return Number(rating).toFixed(1);
  }

  reviewForm!: FormGroup;
  closed: boolean = false;

  IsInWishlist(pg: Pg) {
    const item = localStorage.getItem('Wishlist');
    this.wishlist = JSON.parse(item || '[]');
    if (!this.user) {
      this._dialog.open(LoginPageComponent, {
        panelClass: 'bg-color',
      });
    } else {
      if (this.wishlist.some((pgs) => pgs.id === pg.id)) {
        this.wishlist = this.wishlist.filter((item) => item.id !== pg.id);
      } else {
        this.wishlist.push(pg);
      }
    }
    localStorage.setItem('Wishlist', JSON.stringify(this.wishlist));
  }

  isPgInWishlist(pg: Pg): boolean {
    return this.wishlist.some((pgs) => pgs.id === pg.id);
  }

}
