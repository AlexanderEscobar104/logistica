import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneseditComponent } from './planesedit.component';

describe('PlaneseditComponent', () => {
  let component: PlaneseditComponent;
  let fixture: ComponentFixture<PlaneseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneseditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaneseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
