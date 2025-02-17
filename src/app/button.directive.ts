import { Directive } from '@angular/core';
import { ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {


  constructor(private el: ElementRef) {
    this.setStyle();
  }

  private setStyle() {
    this.el.nativeElement.style.color = '#ffffff';
    this.el.nativeElement.style.backgroundColor = '#a94a4a';
    this.el.nativeElement.style.padding = '0 24px';
    this.el.nativeElement.style.fontSize = '14px';
    this.el.nativeElement.style.fontWeight = '500';
    this.el.nativeElement.style.lineHeight = '2rem';
    this.el.nativeElement.style.borderRadius = '4px';
    this.el.nativeElement.style.transition = 'all 0.3s';
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = '#f46060';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '#a94a4a';
  }





}
