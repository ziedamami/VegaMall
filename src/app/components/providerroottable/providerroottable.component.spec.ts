import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderroottableComponent } from './providerroottable.component';

describe('ProviderroottableComponent', () => {
  let component: ProviderroottableComponent;
  let fixture: ComponentFixture<ProviderroottableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderroottableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderroottableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
