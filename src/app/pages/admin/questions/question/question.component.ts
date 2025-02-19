import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {

  @Output()
  formEmitter: EventEmitter<FormGroup> = new EventEmitter();
  

  questionType!: string;

  singleQuestion!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.singleQuestion = this.formBuilder.group({
      question: [''],
      type: [FormGroup],
      selectedType: [FormGroup],
      isRequired: [false],
    });

    this.formEmitter.emit(this.singleQuestion);
  }

  handleSelection(type: string) {
    this.questionType = type;
  }

}
