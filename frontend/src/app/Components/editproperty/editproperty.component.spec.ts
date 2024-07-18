import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpropertyComponent } from './editproperty.component';

describe('EditpropertyComponent', () => {
  let component: EditpropertyComponent;
  let fixture: ComponentFixture<EditpropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditpropertyComponent]
    });
    fixture = TestBed.createComponent(EditpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
