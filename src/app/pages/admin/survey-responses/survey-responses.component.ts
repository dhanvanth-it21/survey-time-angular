import { Component } from '@angular/core';
import { ApiService } from '../../../common/api.service';
import { ActivatedRoute } from '@angular/router';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-survey-responses',
  templateUrl: './survey-responses.component.html',
  styleUrl: './survey-responses.component.css'
})
export class SurveyResponsesComponent {

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) {}

  public faTrash: IconDefinition = faTrash;

  public surveyId!: string;
  public surveyTitle!: string;

  public responseCardsDB: any[] = [];

  ngOnInit() {
    // getting surveyId from url
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        this.surveyId = params.get('survey_id') || '';
        this.surveyTitle = params.get('survey_title') || '';
      }
    )
    this.getResponseById(this.surveyId);
    
  }




  // to get all the responses of particular survey id
  getResponseById(surveyId: string) {
    this.getAllResponsesBySurveyId(surveyId);
  }

  deleteResponseById(responseId: string) {
    this.deleteResponseByResponseId(responseId);
  }



  // ---------------------------------------Api calls---------------------------------
  // (helper)
  getAllResponsesBySurveyId(surveyId: string) {
    this.apiService.getAllResponseBySurveyId(surveyId).subscribe({
      next: (data) => {
        this.responseCardsDB = Object.values(data);
        console.log(this.responseCardsDB);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("fetch all response completed")
      },
    })
  }

  deleteResponseByResponseId(responseId: string) {
    this.apiService.deleteResponseByResponseId(responseId).subscribe({
      next: () => {},
      error: (e) => { console.log(e)},
      complete: () => {
        console.log("delete response completed")
      },
    })
  }

}
