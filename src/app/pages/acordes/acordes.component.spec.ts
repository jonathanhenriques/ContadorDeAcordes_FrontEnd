import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordesComponent } from './acordes.component';

describe('AcordesComponent', () => {
  let component: AcordesComponent;
  let fixture: ComponentFixture<AcordesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcordesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcordesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
