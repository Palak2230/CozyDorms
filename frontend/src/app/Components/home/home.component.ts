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




declare const ScrollReveal: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {



  ngAfterViewInit(): void {
    this.initializeScripts();
  }

  private initializeScripts() {
    const menuBtn = this.renderer.selectRootElement('#menu-btn', true);
    const navLinks = this.renderer.selectRootElement('#nav-links', true);
    const menuBtnIcon = menuBtn.querySelector('i');

    this.renderer.listen(menuBtn, 'click', () => {
      this.toggleNavLinks(navLinks, menuBtnIcon);
    });

    this.renderer.listen(navLinks, 'click', () => {
      this.closeNavLinks(navLinks, menuBtnIcon);
    });

    const scrollRevealOption = {
      distance: '50px',
      origin: 'bottom',
      duration: 1000,
    };

    // header container
    ScrollReveal().reveal('.header__container p', {
      ...scrollRevealOption,
    });

    ScrollReveal().reveal('.header__container h1', {
      ...scrollRevealOption,
      delay: 500,
    });

    // about container
    ScrollReveal().reveal('.about__image img', {
      ...scrollRevealOption,
      origin: 'left',
    });

    ScrollReveal().reveal('.about__content .section__subheader', {
      ...scrollRevealOption,
      delay: 500,
    });

    ScrollReveal().reveal('.about__content .section__header', {
      ...scrollRevealOption,
      delay: 1000,
    });

    ScrollReveal().reveal('.about__content .section__description', {
      ...scrollRevealOption,
      delay: 1500,
    });

    ScrollReveal().reveal('.about__btn', {
      ...scrollRevealOption,
      delay: 2000,
    });

    // room container
    ScrollReveal().reveal('.room__card', {
      ...scrollRevealOption,
      interval: 500,
    });

    // service container
    ScrollReveal().reveal('.service__list li', {
      ...scrollRevealOption,
      interval: 500,
      origin: 'right',
    });
  }

  private toggleNavLinks(navLinks: HTMLElement, menuBtnIcon: HTMLElement) {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    this.renderer.setAttribute(menuBtnIcon, 'class', isOpen ? 'ri-close-line' : 'ri-menu-line');
  }

  private closeNavLinks(navLinks: HTMLElement, menuBtnIcon: HTMLElement) {
    navLinks.classList.remove('open');
    this.renderer.setAttribute(menuBtnIcon, 'class', 'ri-menu-line');
  }


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
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  constructor(private renderer: Renderer2, private pgService: PgService, private activatedRoute: ActivatedRoute, private router: Router) {

  }
  
  searchpg(term: string): void {
    if (term) {
      this.router.navigateByUrl('/results/' + term);
    }
  }


}