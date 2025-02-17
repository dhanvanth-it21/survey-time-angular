import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public loggedInUser : {'emailId': string, 'role': string} | null = null;

  ngOnInit() {
    const user  = localStorage.getItem('loggedInUser');
    console.log('User:', user);
    if(user) {
      this.loggedInUser = JSON.parse(user);
      console.log('loggedInUser:', this.loggedInUser);
    }
  }


 


}
