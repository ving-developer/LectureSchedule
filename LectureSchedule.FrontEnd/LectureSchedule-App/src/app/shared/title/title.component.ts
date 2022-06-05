import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() title?: string;
  @Input() iconProp: IconProp = 'triangle-exclamation';
  @Input() subtitle = '';
  @Input() listButton = false;

  constructor() { }

  ngOnInit() {
  }

}
