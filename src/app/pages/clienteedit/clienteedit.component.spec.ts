import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteeditComponent } from './clienteedit.component';

describe('ClienteeditComponent', () => {
  let component: ClienteeditComponent;
  let fixture: ComponentFixture<ClienteeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
