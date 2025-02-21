import { Component } from '@angular/core';
import { DataSharingService } from '../../../common/data-sharing.service';
import { ClickEventService } from '../../../common/click-event.service';
import { ApiService } from '../../../common/api.service';
import { faEye, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
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

  }

  toggleActive(event: Event, surveyId: string) {
    event.stopPropagation();
    this.changeActiveStatus(surveyId);
  }
  
  deleteSurveyCard(event: Event, surveyId: string) {
    event.stopPropagation();
    this.deleteSurveyById(surveyId);
  }

  navigateToResponsePage(event: Event, surveyId: string, surveyTitle: string) {
    event.stopPropagation();

    this.router.navigate(['admin/survey-responses'],{
      queryParams: {
        survey_id: surveyId,
        survey_title: surveyTitle,
      }
    });
  }


  // ---------------------API calls---------------------------

  // getSurvey cards through api service
  getSurveyCards() {
    this.apiService.getSurveyCards().subscribe(
      {
        next: (data) => {
          this.pagedSurveyCardsDB = data;
          this.surveyCards = this.pagedSurveyCardsDB?.content || [
              {
                  "id": "67ad49c520a9217601c01a15",
                  "title": "survey 3",
                  "description": "---",
                  "active": true
              }
          ];
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
        error: (e) => console.error(e),
      }
    )
  }

  //delete survey usign surveyId
  deleteSurveyById(surveyId: string) {
    this.apiService.deleteSurveyById(surveyId).subscribe({
      next: (data) => {
        this.apiService.deleteResponseBySurveyId(surveyId).subscribe({
          next: () => {},
          error: (e) => {console.log(e)},
          complete: () => {"delete completed the response by survey id"}
        })
      },
      error: (e) => {
        console.error(e);
      },
    })
  }




}
