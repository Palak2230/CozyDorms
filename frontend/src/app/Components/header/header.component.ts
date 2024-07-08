import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PgService } from 'src/app/services/pg.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  options: string[] = ['Mumbai', 'Delhi', 'Pune'];
  filteroptions !: Observable<string[]>;
  formcontrol = new FormControl('');
  ngOnInit(): void {
    this.filteroptions = this.formcontrol.valueChanges.pipe(
      startWith(''), map(value => this._FILTER(value || ''))
    );
  }
  private _FILTER(value: string) {
    const searchvalue = value.toLocaleLowerCase();
    return this.options.filter(option => option.toLocaleLowerCase().includes(searchvalue));
  }
  constructor(private renderer: Renderer2, private pgService: PgService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  searchpg(event: any): void {

    if (event.target.value)
      this.router.navigate(['/results', event.target.value]);

  }
}
