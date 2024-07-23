import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMusicasComponent } from './cadastro-musicas.component';

describe('CadastroComponent', () => {
  let component: CadastroMusicasComponent;
  let fixture: ComponentFixture<CadastroMusicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroMusicasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroMusicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
