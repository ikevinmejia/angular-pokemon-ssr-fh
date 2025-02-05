import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { PokemonListComponent } from './pokemon-list.component';

const mockPokemon: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
];

// describe es agrupador de pruebas
describe('PokemonListComponent', () => {

  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent

  // beforeEach se ejecuta antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemon', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should tender the pokemon list with 2 pokemon-card', () => {
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('pokemon-card').length).toBe(mockPokemon.length);
  });


  it('should render empty message when there arent pokemon', () => {
    fixture.componentRef.setInput('pokemon', []);
    fixture.detectChanges();
    const text = compiled.querySelector('div')?.innerText;

    expect(text).toContain('No hay pokémon');
  });

});
