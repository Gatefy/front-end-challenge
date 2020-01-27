import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[todoIsDone]"
})
export class TodoIsDoneDirective implements OnInit {
  @Input() todoIsDone: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.todoIsDone) {
      this.el.nativeElement.style.textDecoration = "line-through";
    }
  }
}
