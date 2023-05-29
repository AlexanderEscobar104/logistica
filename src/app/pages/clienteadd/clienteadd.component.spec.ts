import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteaddComponent } from './clienteadd.component';

describe('ClienteaddComponent', () => {
  let component: ClienteaddComponent;
  let fixture: ComponentFixture<ClienteaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
