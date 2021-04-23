import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
