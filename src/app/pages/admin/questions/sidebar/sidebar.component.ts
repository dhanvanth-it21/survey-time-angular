import { Component } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  //font awesome icons
  public faPlus = faPlus;
  public faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  addQuestion() {

  }

  removeQuestion() {
    
  }

}
