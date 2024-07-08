
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

  ngAfterViewInit() {
    this.embedMap();
  }
  address: string = '811/2 Shakti Nagar Colony , Near V-Mart , Jhansi';
  embedMap(): void {
    console.log(this.address);
    const encodedAddress = encodeURIComponent(this.address);
    const embed = `
      <iframe width='900' height='400' frameborder='0' loading='lazy'
      scrolling='no' marginheight='0' marginwidth='0' 
      src='https://maps.google.com/maps?&amp;q=${encodedAddress}&amp;output=embed'></iframe>
    `;
    document.querySelector('.place')!.innerHTML = embed;
  }
  constructor(private _liveAnnouncer: LiveAnnouncer, private _dialog: MatDialog, private activatedRoute: ActivatedRoute, private pgService: PgService, private renderer: Renderer2) {

  }


  // const tabs: NodeListOf<HTMLElement> = document.querySelectorAll('.tab_btn');
  // const all_content: NodeListOf<HTMLElement> = document.querySelectorAll('.content');

  // tabs.forEach((tab: HTMLElement, index: number) => {
  //   tab.addEventListener('click', () => {
  //     // Remove 'active' class from all tabs before adding it to the clicked one
  //     tabs.forEach(t => t.classList.remove('active'));
  //     tab.classList.add('active');
  //   });
  // });
  tabs!: NodeListOf<HTMLElement>;
  all_content!: NodeListOf<HTMLElement>;

  // ngOnInit(): void {
  //   // Assign NodeLists within ngOnInit to ensure DOM is ready
  //   this.tabs = document.querySelectorAll('.tab_btn');
  //   this.all_content = document.querySelectorAll('.content');

  //   // Attach click event listeners to each tab
  //   this.tabs.forEach((tab, index) => {
  //     tab.addEventListener('click', (e: MouseEvent) => {
  //       // Remove active class from all tabs
  //       this.tabs.forEach(t => t.classList.remove('active'));
  //       // Add active class to the clicked tab
  //       tab.classList.add('active');

  //       // Update line style based on the clicked tab
  //       const target = e.target as HTMLElement;
  //       const line = document.querySelector('.line') as HTMLElement;
  //       if (line) {
  //         line.style.width = target.offsetWidth + "px";
  //         line.style.left = target.offsetLeft + "px";
  //       }
  //       this.all_content.forEach(content => {
  //         content.classList.remove('active');
  //       })
  //       this.all_content[index].classList.add('active');
  //     });
  //   });
  // }

  ngOnInit(): void {
    // Initially hide all tab contents except the default one
    const tabContents = document.querySelectorAll('.content');
    tabContents.forEach(content => {
      (content as HTMLElement).style.display = 'none';
    });
    // Show the default tab content
    const defaultTab = document.getElementById('Overview');
    if (defaultTab) {
      (defaultTab as HTMLElement).style.display = 'block';
    }
  }

  openPage(pageName: string, event: Event): void {
    // Ensure event.target is an HTMLElement
    const target = event.target as HTMLElement;
    if (!target) return;

    // Hide all tab contents
    const tabContents = document.querySelectorAll('.content');
    tabContents.forEach(content => {
      (content as HTMLElement).style.display = 'none';
    });

    // Remove the active class from all tab buttons
    const tabLinks = document.querySelectorAll('.tab_btn');
    tabLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Show the specific tab content
    const selectedTab = document.getElementById(pageName);
    if (selectedTab) {
      (selectedTab as HTMLElement).style.display = 'block';
    }

    // Add the active class to the clicked tab button
    target.classList.add('active');

    // Update line position
    const line = document.querySelector('.line') as HTMLElement;
    if (line) {
      line.style.width = target.offsetWidth + 'px';
      line.style.left = target.offsetLeft + 'px';
    }
  }
}