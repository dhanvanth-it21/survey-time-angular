import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private serverIp = "localhost:8080";

  
  
  constructor(private http: HttpClient) { }
  
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
}
