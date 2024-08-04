import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 1;
  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit(): void {
    console.log(this.total);
    const pagesCount = Math.ceil(this.total / this.limit);

    this.pages = this.range(1, pagesCount);
    console.log(this.pages);
    console.log(pagesCount);
  }
  ngOnChanges(): void {
    console.log(this.total);
    const pagesCount = Math.ceil(this.total / this.limit);

    this.pages = this.range(1, pagesCount);
    console.log(this.pages);
    console.log(pagesCount);
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }
}