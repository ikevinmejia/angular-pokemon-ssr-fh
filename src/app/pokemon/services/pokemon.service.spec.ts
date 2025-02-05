import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError } from 'rxjs';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';
import { PokemonService } from './pokemon.service';

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1304,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=2',
  previous: '',
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const expectedPokemon: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon: SimplePokemon = { id: '1', name: 'bulbasaur' };

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemon', () => {
    service.loadPage(1).subscribe((pokemon) => {
      expect(pokemon).toEqual(expectedPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load a page 5 of SimplePokemon', () => {
    service.loadPage(5).subscribe((pokemon) => {
      expect(pokemon).toEqual(expectedPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by id', () => {
    const pokemonId = '1';

    service.loadPokemon(pokemonId).subscribe((pokemon:any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should load a pokemon by name', () => {
    const pokemonName = mockPokemon.name;

    service.loadPokemon(pokemonName).subscribe((pokemon:any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  // Disparar errores

  it('should catch error if pokemon not found', () => {
    const pokemonName = 'yo-no-existo';

    service.loadPokemon(pokemonName)
      .pipe(
        catchError(err => {
          expect(err.message).toContain('Pokemon not found');
          return []
        })
      )
      .subscribe((pokemon:any) => {
        expect(pokemon).toEqual(mockPokemon);
      });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found',{ status: 404, statusText: 'Not Found'});
  });
});
