import { Location } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { routes } from "./app.routes";

describe('App routes', () => {

  let router:Router;
  let location:Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });


  it('Should navigate to "about" redirects to "/about"', async() => {
    await router.navigate(['about']);

    expect(location.path()).toBe('/about');
  });

  it('Should navigate to "pokemon/page/1" redirects to "/pokemon/page/1"', async() => {
    await router.navigate(['pokemon/page/1']);

    expect(location.path()).toBe('/pokemon/page/1');
  });

  it('Should navigate to not reconized page', async() => {
    await router.navigate(['unknown-page']);

    expect(location.path()).toBe('/about');
  });

  it('Should load the proper component', async() => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();
    const aboutComponent = await aboutRoute.loadComponent!() as any;
    expect(aboutComponent.default.name).toBe('AboutPageComponent');

    const pokemonRoute = routes.find((route) => route.path === 'pokemon/page/:page')!;
    expect(pokemonRoute).toBeDefined();
    const pokemonComponent = await pokemonRoute.loadComponent!() as any;
    expect(pokemonComponent.default.name).toBe('PokemonPageComponent');
  });

});
