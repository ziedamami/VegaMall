import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepComponent } from './deletep.component';

describe('DeletepComponent', () => {
  let component: DeletepComponent;
  let fixture: ComponentFixture<DeletepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
