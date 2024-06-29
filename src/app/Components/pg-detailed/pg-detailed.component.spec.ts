import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgDetailedComponent } from './pg-detailed.component';

describe('PgDetailedComponent', () => {
  let component: PgDetailedComponent;
  let fixture: ComponentFixture<PgDetailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PgDetailedComponent]
    });
    fixture = TestBed.createComponent(PgDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
