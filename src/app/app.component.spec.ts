import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture:ComponentFixture<AppComponent>;
  let app:AppComponent;
  let compiled: HTMLDivElement;

  @Component({
    selector: 'app-navbar'
  })
  class NavbarComponentMock {}


  beforeEach(async () => {
    // * Recomendado
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [NavbarComponentMock],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    })

    // await TestBed.configureTestingModule({
    //   imports: [AppComponent],
    //   providers: [
    //     provideRouter([])
    //   ]
    // })
    // .overrideComponent(AppComponent, {
    //   add: {
    //     imports: [NavbarComponentMock]
    //   },
    //   remove: {
    //     imports: [NavbarComponent]
    //   }
    // })
    // .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLDivElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet`, () => {
    const navbar = compiled.querySelector('app-navbar');
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(navbar).toBeTruthy()
    expect(routerOutlet).toBeTruthy()
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  // });
});
