import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit{
  private title = inject(Title);
  private meta = inject(Meta);
  // private platform = inject(PLATFORM_ID);
  ngOnInit(): void {
    // if (!isPlatformServer(this.platform)) return;
    this.title.setTitle('Pricing');
    this.meta.updateTag({name: 'description', content: 'Este es el pricing page'})
    this.meta.updateTag({name: 'og:title', content: 'pricing page'})
    this.meta.updateTag({name: 'keywords', content: 'hola, mundo, kevin, mejia'})
  }
}
