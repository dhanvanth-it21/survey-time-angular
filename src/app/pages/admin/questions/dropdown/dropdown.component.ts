import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { faCalendarDays, faCaretDown, faCircleDot, faClock, faFileLines, faHashtag, faImage, faSquareCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  public faCaretDown: IconDefinition = faCaretDown;
  public selectedType!: string
  public selectedTypeIcon!: IconDefinition;

  // List of question types
  public questionTypeList = [
    { name: 'Multiple-Choice', icon: faCircleDot, type: 'radio' },
    { name: 'Checkboxes', icon: faSquareCheck, type: 'checkbox' },
    { name: 'Dropdown', icon: faCaretDown, type: 'select' },
    { name: 'Paragraph', icon: faFileLines, type: 'textarea' },
    { name: 'Number', icon: faHashtag, type: 'number' },
    { name: 'Date', icon: faCalendarDays, type: 'date' },
    { name: 'Time', icon: faClock, type: 'time' },
    { name: 'Upload-image', icon: faImage, type: 'file' },
  ];

  // Dropdown state
  public isOpen = false;
  
  //emitting the selected option
  @Output() 
  optionSelected = new EventEmitter<string>();
  
  //initailizing the ultiple choice as the default selected option and emitting it
  ngOnInit() {
    const defaultOption = this.questionTypeList[0];
    this.selectedType = defaultOption.name;
    this.selectedTypeIcon = defaultOption.icon;
    this.optionSelected.emit(defaultOption.type);
  }

  //open and closing the dropdown
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  //selecting the option and emitting it
  selectOption(option: string) {
    const selectedOption = this.questionTypeList.find(type => type.name === option) || this.questionTypeList[0];
    if(!(this.selectedType === selectedOption.name)) {
      this.selectedType = selectedOption.name;
      this.selectedTypeIcon = selectedOption.icon;
      this.optionSelected.emit(selectedOption.type);
    }
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (
      !target.closest('.question-type-selection-container') &&
        !target.closest('.question-type-options'))
       {
      this.isOpen = false;
    }
  }


}