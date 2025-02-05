import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { PokemonCardComponent } from './pokemon-card.component';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
}

// describe es agrupador de pruebas
describe('PokemonCardComponent', () => {

  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent

  // beforeEach se ejecuta antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);

    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {

    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const nameTag = compiled.querySelector('h2');
    const imgTag = compiled.querySelector('img');
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`

    expect(nameTag).toBeTruthy();
    expect(nameTag?.innerText.trim()).toBe(mockPokemon.name);
    expect(imgTag).toBeTruthy();
    expect(imgTag?.src).toBe(imgUrl);
  });

  it('should have the proper ng-reflect-router-link', () => {
    const divWithLink = compiled.querySelector('div');
    expect(divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe('/pokemon,bulbasaur');
  });

});
