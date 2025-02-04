import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonListComponent } from "../../pokemon/componentes/pokemon-list/pokemon-list.component";
import { SimplePokemon } from '../../pokemon/interfaces';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
@Component({
  selector: 'app-pokemon-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);


  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page )),
      map(page => Math.max(1, page))
    )
  );
  public pokemon = signal<SimplePokemon[]>([]);

  public loadOnPageChanged = effect(() => {
    this.loadPokemon(this.currentPage())
  })


  public loadPokemon(page: number = 0) {

    this.pokemonService.loadPage(page)
      .pipe(
        tap( () => this.title.setTitle(`Pokémon SSR - Page ${page}`))
      )
      .subscribe(pokemon => this.pokemon.set(pokemon))
  }
}
