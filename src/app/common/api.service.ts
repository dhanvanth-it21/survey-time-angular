import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private serverIp = "localhost:8080";

  
  
  constructor(private http: HttpClient) { }
  
  //post the created survey
  postCreatedSurvey(surveyObject: any) {
    const  apiuri = `http://${this.serverIp}/survey`;
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(apiuri,surveyObject,{headers}).pipe(
      catchError(error => {
        console.error('Error occurred while creating the survey:', error);
        throw error;
      })
    ).subscribe();
  }

  //Get the survey cards
  getSurveyCards() {
    const apiuri = `http://${this.serverIp}/survey/survey-cards`;
    const returnData: Observable<Object> = this.http.get(apiuri);
    return returnData;
  }

  //active status change for the survey
  changeActiveStatus(surveyId: string) {
    const apiuri = `http://${this.serverIp}/survey/active-status/${surveyId}`;
    const returnData: Observable<Object> = this.http.put(apiuri, {}, { responseType: 'text' });
    return returnData;
  }
}
