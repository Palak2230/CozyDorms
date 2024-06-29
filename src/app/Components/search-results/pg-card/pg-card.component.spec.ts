import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgCardComponent } from './pg-card.component';

describe('PgCardComponent', () => {
  let component: PgCardComponent;
  let fixture: ComponentFixture<PgCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PgCardComponent]
    });
    fixture = TestBed.createComponent(PgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
