import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpComponent } from './editp.component';

describe('EditpComponent', () => {
  let component: EditpComponent;
  let fixture: ComponentFixture<EditpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
