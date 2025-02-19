import { Component, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faCircleDot, faSquare, faX, faSquareBinary } from '@fortawesome/free-solid-svg-icons';
import { max, min } from 'rxjs';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent {




  @Input()
  questionType!: string;

  @Input()
  singleQuestion!: FormGroup;







  //icons
  public faCircle = faCircleDot;
  public faX = faX;
  public faSquare = faSquare;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  //Reactvie forms
  commonContainer!: FormGroup;






  fileExtType = [".jpeg",".png",".gif",".tiff",".svg",".webp"]


  ngOnChanges() {

    //changing the commonContainer form group based on the question type
    switch (this.questionType) {
      case 'radio':
        this.commonContainer = this.radioType();
        break;
      case 'checkbox':
        this.commonContainer = this.checkboxType();
        break;
      case 'select':
        this.commonContainer = this.selectType();
        break;
      case 'textarea':
        this.commonContainer = this.paragraphType();
        break;
      case 'number':
        this.commonContainer = this.numberType();
        break;
      case 'date':
        this.commonContainer = this.dateType();
        break;
      case 'time':
        this.commonContainer = this.timeType();
        break;
      case 'file':
        this.commonContainer = this.fileType();
        break;
    }

    this.singleQuestion.setControl('selectedType', this.commonContainer);
  }




  // -(start)----------------------------radio-------------------------------------

  radioType(): FormGroup {
    return this.formBuilder.group({
      radioOptions: this.formBuilder.array([
        this.radioBuildOption(),
      ]),
    })
  }

  radioBuildOption(): FormGroup {
    const fromGroupOption: FormGroup = this.formBuilder.group({
      option: [''],
    })
    return fromGroupOption;
  }

  radioAddOption() {
    this.radioOptions.push(this.radioBuildOption());
  }

  get radioOptions(): FormArray {
    const radioOptions = this.commonContainer.get('radioOptions') as FormArray;
    return radioOptions;
  }

  radioRemoveOption(i: number) {
    if (this.radioOptions.length > 1) {
      this.radioOptions.removeAt(i);
    }
  }

  // -(end)----------------------------radio-------------------------------------


  // -(Start)----------------------------checkbox-------------------------------------

  checkboxType(): FormGroup {
    return this.formBuilder.group({
      checkboxOptions: this.formBuilder.array([
        this.checkboxBuildOption(),
      ]),
      checkboxConstraints: this.formBuilder.group({
        min: ['1'],
        max: ['1'],
      }),
    })
  }

  checkboxBuildOption(): FormGroup {
    const fromGroupOption: FormGroup = this.formBuilder.group({
      option: [''],
    })
    return fromGroupOption;
  }

  get checkboxOptions(): FormArray {
    const checkboxOptions = this.commonContainer.get('checkboxOptions') as FormArray;
    return checkboxOptions;
  }

  checkboxAddOption() {
    this.checkboxOptions.push(this.checkboxBuildOption());
  }

  checkboxRemoveOption(i: number) {
    if (this.checkboxOptions.length > 1) {
      this.checkboxOptions.removeAt(i);
    }
  }

  // -(end)----------------------------checkbox-------------------------------------


  // -(start)----------------------------select-------------------------------------

  selectType(): FormGroup {
    return this.formBuilder.group({
      selectOptions: this.formBuilder.array([
        this.selectBuildOption(),
      ]),
    })
  }

  selectBuildOption(): FormGroup {
    const fromGroupOption: FormGroup = this.formBuilder.group({
      option: [''],
    })
    return fromGroupOption;
  }

  selectAddOption() {
    this.selectOptions.push(this.selectBuildOption());
  }

  get selectOptions(): FormArray {
    const selectOptions = this.commonContainer.get('selectOptions') as FormArray;
    return selectOptions;
  }

  selectRemoveOption(i: number) {
    if (this.selectOptions.length > 1) {
      this.selectOptions.removeAt(i);
    }
  }
  // -(end)----------------------------select-------------------------------------


  // -(start)----------------------------paragraph-------------------------------------

  paragraphType(): FormGroup {
    return this.formBuilder.group({
      paragraphConstraints: this.formBuilder.group({
        min: ['1'],
        max: ['2000'],
      }),
    })

  }

  get paragraphConstraints() {
    return this.commonContainer.get('paragraphConstraints') as FormGroup;
  }



  // -(end)----------------------------paragraph-------------------------------------


  // -(start)----------------------------number-------------------------------------

  numberType(): FormGroup {
    return this.formBuilder.group({
      numberConstraints: this.formBuilder.group({
        min: [1],
        max: [400],
      })
    })
  }

  get numberConstraints() {
    return this.commonContainer.get('numberConstraints') as FormGroup;
  }

  // -(end)----------------------------number-------------------------------------

  // -(start)----------------------------date-------------------------------------
  dateType(): FormGroup {
    return this.formBuilder.group({
      dateConstraints: this.formBuilder.group({
        start_date: [(new Date()).toISOString().split('T')[0]],
        end_date: [(new Date()).toISOString().split('T')[0]],
      })
    })
  }

  get dateConstraints() {
    return this.commonContainer.get('dateConstraints') as FormGroup;
  }

  // -(end)----------------------------date-------------------------------------

  // -(start)----------------------------date-------------------------------------
  timeType(): FormGroup {
    return this.formBuilder.group({
      timeConstraints: this.formBuilder.group({
      start_time: [(new Date()).toISOString().split('T')[1].split('.')[0].substring(0,5)],
      end_time: [(new Date()).toISOString().split('T')[1].split('.')[0].substring(0,5)],
      })
    })
  }

  get timeConstraints() {
    return this.commonContainer.get('timeConstraints') as FormGroup;
  }

  // -(end)----------------------------date-------------------------------------


  //-(start)----------------------------file----------------------------

  fileType(): FormGroup {
    return this.formBuilder.group({
      file_size: [5],
      fileConstraints: this.formBuilder.array([]),
    })
  }

  fileAddExt(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const isChecked = input.checked;

    
    if (isChecked) {
      this.fileConstraints.push(this.formBuilder.control(value));
    } else {
      const index = this.fileConstraints.controls.findIndex(x => x.value === value);
      if (index !== -1) {
        this.fileConstraints.removeAt(index);
      }
    }
  }

  get fileConstraints(): FormArray {
    return this.commonContainer.get('fileConstraints') as FormArray
  }

  //-(end)----------------------------file----------------------------



}