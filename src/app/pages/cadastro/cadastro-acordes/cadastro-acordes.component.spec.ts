import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAcordesComponent } from './cadastro-acordes.component';

describe('CadastroAcordesComponent', () => {
  let component: CadastroAcordesComponent;
  let fixture: ComponentFixture<CadastroAcordesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAcordesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroAcordesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
