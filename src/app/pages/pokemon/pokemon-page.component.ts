import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonListComponent } from "../../pokemon/componentes/pokemon-list/pokemon-list.component";
import { SimplePokemon } from '../../pokemon/interfaces';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
@Component({
  selector: 'app-pokemon-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);


  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page )),
      map(page => Math.max(1, page))
    )
  );
  public pokemon = signal<SimplePokemon[]>([]);

  ngOnInit(): void {
    this.loadPokemon();
  }

  public loadPokemon(page: number = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonService.loadPage(pageToLoad)
      .pipe(
        tap( () => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap( () => this.title.setTitle(`Pokémon SSR - Page ${pageToLoad}`))
      )
      .subscribe(pokemon => this.pokemon.set(pokemon))
  }
  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe()
  // }
}
