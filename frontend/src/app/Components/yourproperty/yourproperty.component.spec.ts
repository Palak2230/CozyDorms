import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourpropertyComponent } from './yourproperty.component';

describe('YourpropertyComponent', () => {
  let component: YourpropertyComponent;
  let fixture: ComponentFixture<YourpropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourpropertyComponent]
    });
    fixture = TestBed.createComponent(YourpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
