import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  public year: number = new Date().getFullYear();
  public author: string = "Dhanvanth S B";
  public license: string = `@copyRight ${this.year}`;

}
