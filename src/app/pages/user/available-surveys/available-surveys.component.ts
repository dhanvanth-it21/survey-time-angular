import { Component } from '@angular/core';
import { ApiService } from '../../../common/api.service';
import { AuthService } from '../../../common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-surveys',
  templateUrl: './available-surveys.component.html',
  styleUrl: './available-surveys.component.css'
})
export class AvailableSurveysComponent {

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
  ) {}

  public emailId!: string;

  public surveyCardsDB!: any[];

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const user = this.authService.getLoggedInUser();
      this.emailId = JSON.parse(user!).emailId;
      console.log(this.emailId);
      this.fillPendingSurvey(this.emailId);
    }
  }


  fillPendingSurvey(emailId: string) {
    this.getPendingSurveyCards(emailId);
  }

  openSurveybyId(surveyId: string) {
    this.router.navigate(['user/respond-survey'], {
      queryParams: {
        surveyId: surveyId,
      }
    })
  }


  // -----------------------api calls-----------------

  getPendingSurveyCards(emailId: string) {
    this.apiService.getPendingSurveyCards(emailId).subscribe({
      next: (data) => {
        this.surveyCardsDB = Object.values(data);
        console.log(this.surveyCardsDB);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("pending survey fetched");
      },

    }) 
  }

}
