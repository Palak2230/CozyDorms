import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-pg-card',
  templateUrl: './pg-card.component.html',
  styleUrls: ['./pg-card.component.scss']
})
export class PgCardComponent {
  liked: boolean = false;
  report: boolean = false;
 
}
