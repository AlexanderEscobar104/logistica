import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesaddComponent } from './planesadd.component';

describe('PlanesaddComponent', () => {
  let component: PlanesaddComponent;
  let fixture: ComponentFixture<PlanesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
