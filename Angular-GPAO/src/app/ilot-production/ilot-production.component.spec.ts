import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlotProductionComponent } from './ilot-production.component';

describe('IlotProductionComponent', () => {
  let component: IlotProductionComponent;
  let fixture: ComponentFixture<IlotProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlotProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IlotProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
