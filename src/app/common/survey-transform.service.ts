import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyTransformService {

  transformFormToSurveyObject(formGroup: any): any {
    const surveyObject = {
      title: formGroup.surveyDetailsForm.surveyTitle,
      description: formGroup.surveyDetailsForm.surveyDescription,
      active: true,
      questions: formGroup.questionsForm.map((q: any, index: number) => this.transformQuestion(q, index))
    };
    return surveyObject;
  }

  private transformQuestion(q: any, index: number): any {
    let questionObject: any = {
      questionId: index + 1,
      question: q.question,
      type: q.type,
      required: q.isRequired
    };

    switch (q.type) {
      case 'radio':
      case 'select':
        questionObject.options = this.mapOptions(q.selectedType.radioOptions || q.selectedType.selectOptions);
        break;
      case 'checkbox':
        questionObject.options = this.mapOptions(q.selectedType.checkboxOptions);
        questionObject.minSelection = q.selectedType.checkboxConstraints?.min;
        questionObject.maxSelection = q.selectedType.checkboxConstraints?.max;
        break;
      case 'textarea':
        questionObject.type = 'text'; // Convert to 'text' for storage
        questionObject.minLength = q.selectedType.paragraphConstraints?.min;
        questionObject.maxLength = q.selectedType.paragraphConstraints?.max;
        break;
      case 'number':
        questionObject.minValue = q.selectedType.numberConstraints?.min;
        questionObject.maxValue = q.selectedType.numberConstraints?.max;
        break;
      case 'date':
        questionObject.startDate = q.selectedType.dateConstraints?.start_date;
        questionObject.endDate = q.selectedType.dateConstraints?.end_date;
        break;
      case 'time':
        questionObject.startTime = q.selectedType.timeConstraints?.start_time;
        questionObject.endTime = q.selectedType.timeConstraints?.end_time;
        break;
      case 'file':
        questionObject.size = q.selectedType.file_size;
        questionObject.accept = q.selectedType.fileConstraints.join(', ');
        break;
    }
    return questionObject;
  }

  private mapOptions(optionsArray: any[]): any {
    return optionsArray.reduce((acc: any, option: any, index: number) => {
      acc[index] = option.option;
      return acc;
    }, {});
  }
}
