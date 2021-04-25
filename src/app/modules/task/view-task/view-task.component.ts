import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewTaskComponent implements OnInit {

  public moment: any = moment;
  public dialogData: any;

  constructor(
    public dialogRef: MatDialogRef<ViewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) { 
    this.dialogData = _data;
  }

  ngOnInit(): void {
    
  }

}
