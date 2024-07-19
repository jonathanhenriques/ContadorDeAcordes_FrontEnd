import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimboloMusicaComponent } from './simbolo-musica.component';

describe('SimboloMusicaComponent', () => {
  let component: SimboloMusicaComponent;
  let fixture: ComponentFixture<SimboloMusicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimboloMusicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimboloMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
