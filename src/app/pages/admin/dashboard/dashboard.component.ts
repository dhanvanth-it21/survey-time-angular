import { Component } from '@angular/core';
import { DataSharingService } from '../../../common/data-sharing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private dataSharingService: DataSharingService) { }

  public loggedInUser: { 'emailId': string, 'role': string } | null = null;

  //dynamic navbar content: string[]
  dynamicContent =
    [
      JSON.stringify({
        'label': 'Create-Survey',
        'routeUrl': 'admin/survey-create'
      }),
    ]


  ngOnInit() {

    //updat the dynamic content of the bnavbar for the admin dashboard page
    this.dataSharingService.updateData(this.dynamicContent);

    //user detials
    const user = localStorage.getItem('loggedInUser');
    console.log('User:', user);
    if (user) {
      this.loggedInUser = JSON.parse(user);
      console.log('loggedInUser:', this.loggedInUser);
    }
  }





}
