import { Component } from '@angular/core';
import { DataSharingService } from '../../../common/data-sharing.service';
import { ClickEventService } from '../../../common/click-event.service';
import { ApiService } from '../../../common/api.service';
import { faEye, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private dataSharingService: DataSharingService,
    private clickEventService: ClickEventService,
    private apiService: ApiService,
  ) { }

  public faTrash: IconDefinition = faTrash;
  public faEye: IconDefinition = faEye;


  public loggedInUser: { 'emailId': string, 'role': string } | null = null;

  public pagedSurveyCardsDB!: any;

  public surveyCards!: any[];

  

  //dynamic navbar content: string[]
  dynamicContent =
    [
      JSON.stringify({
        'label': 'Create Survey',
        'routeUrl': 'admin/survey-create'
      }),

    ]


  ngOnInit() {

    //update the dynamic content of the navbar for the admin dashboard page
    this.dataSharingService.updateData(this.dynamicContent);

    //user detials
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('loggedInUser');
      if (user) {
        this.loggedInUser = JSON.parse(user);
      }
    }

    //subcribing to the buttons in nvabar
    this.clickEventService.shareData$.subscribe((button) => {
      if (button === "Create-Survey") {
        console.log("Create-Survey button clicked at admin page");
      }

    })

    this.getSurveyCards();
    this.surveyCards = this.pagedSurveyCardsDB?.content || [];

  }

  toggleActive(surveyId: string) {
    this.changeActiveStatus(surveyId);
  }


  // ---------------------API calls---------------------------

  // getSurvey cards through api service
  getSurveyCards() {
    this.apiService.getSurveyCards().subscribe(
      {
        next: (data) => {
          console.log(data);
          this.pagedSurveyCardsDB = data;
        },
        error: (e) => console.error(e),
      }
    )
  }

  //change the active status of the survey
  changeActiveStatus(surveyId: string) {
    this.apiService.changeActiveStatus(surveyId).subscribe(
      {
        next: (data) => {
          console.log(data);
        },
        error: (e) => console.error("-----"+JSON.stringify(e)),
      }
    )
  }





}
