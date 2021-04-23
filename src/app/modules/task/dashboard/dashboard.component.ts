import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public tasksList: any = [];

  constructor() { }

  ngOnInit(): void {
    this.tasksList = [{
      id: 1,
      title: 'new',
      description: 'sfadsfsdfasfsdf asdfdsfasdf'
    },
      {
        id: 2,
        title: 'new tea',
        description: 'sfadsfsdfasfsdf asdfdsfasdf'
      },
      {
        id: 3,
        title: 'new tea',
        description: 'sfadsfsdfasfsdf asdfdsfasdf'
      },
      {
        id: 4,
        title: 'newsdfa sadf tea',
        description: 'sfadsfsdfasfsdf asdfdsfasdf'
      },
      {
        id: 1,
        title: 'new',
        description: 'sfadsfsdfasfsdf asdfdsfasdf'
      },
      {
        id: 2,
        title: 'new tea',
        description: 'sfadsfsdfasfsdf asdfdsfasdf'
      },
      {
        id: 3,
        title: 'new tea',
        description: 'sfadsfsdfasfsdf asdfdsfasdf'
      },
      {
        id: 4,
        title: 'newsdfa sadf tea',
        description: 'sfadsfsdfasfsdf asdfdsfasdf'
      }]
  }

  applyFilter(event) {
    console.log(event);
  }

}
