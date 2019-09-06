import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreformComponent } from './offreform.component';

describe('OffreformComponent', () => {
  let component: OffreformComponent;
  let fixture: ComponentFixture<OffreformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffreformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
