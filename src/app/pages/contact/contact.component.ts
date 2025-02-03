import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent implements OnInit{
  private title = inject(Title);
  private meta = inject(Meta);
  ngOnInit(): void {
    this.title.setTitle('Contact');
    this.meta.updateTag({name: 'description', content: 'Este es el contact page'})
    this.meta.updateTag({name: 'og:title', content: 'contact page'})
    this.meta.updateTag({name: 'keywords', content: 'hola, mundo, kevin, mejia'})
  }
}
