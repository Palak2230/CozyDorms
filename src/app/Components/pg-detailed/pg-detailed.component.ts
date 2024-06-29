import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { trigger, transition, style, animate } from "@angular/animations";
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface RoomPrices {
  roomtype: string;
  rooms: number;
  vacancies: number;
  rent: number;
  deposit: number;

}

const ELEMENT_DATA: RoomPrices[] = [
  {
    roomtype: 'Single Room AC',
    rooms: 3,
    vacancies: 4,
    rent: 5000,
    deposit: 5000
  },
  {
    roomtype: 'Single Room AC',
    rooms: 3,
    vacancies: 4,
    rent: 5000,
    deposit: 5000
  },
  {
    roomtype: 'Single Room AC',
    rooms: 3,
    vacancies: 4,
    rent: 5000,
    deposit: 5000
  },
  {
    roomtype: 'Single Room AC',
    rooms: 3,
    vacancies: 4,
    rent: 5000,
    deposit: 5000
  },


];


@Component({
  selector: 'app-pg-detailed',
  templateUrl: './pg-detailed.component.html',
  styleUrls: ['./pg-detailed.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PgDetailedComponent implements OnInit {
  //IMAGES

  public slides = [
    { src: "../../../assets/room-1.jpg" },
    { src: "../../../assets/room-2.jpg" },
    { src: "../../../assets/room-3.jpg" },


  ];
  currentSlide = 0;



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


  //ROOM DETAILS
  displayedColumns: string[] = ['roomtype', 'rooms', 'vacancies', 'rent', 'deposit'];
  dataSource = ELEMENT_DATA;
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //MAP 

  @Input() address: string = 'Shakti Nagar Colony , Near V-Mart ,Jhansi';

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.embedMap();
  }

  embedMap(): void {
    const encodedAddress = encodeURIComponent(this.address);
    const embed = `
      <iframe width='900' height='400' frameborder='0' loading='lazy'
      scrolling='no' marginheight='0' marginwidth='0' 
      src='https://maps.google.com/maps?&amp;q=${encodedAddress}&amp;output=embed'></iframe>
    `;
    document.querySelector('.place')!.innerHTML = embed;
  }

}
