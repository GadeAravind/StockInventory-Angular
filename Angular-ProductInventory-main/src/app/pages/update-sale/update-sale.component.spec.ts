import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSaleComponent } from './update-sale.component';

describe('UpdateSaleComponent', () => {
  let component: UpdateSaleComponent;
  let fixture: ComponentFixture<UpdateSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
