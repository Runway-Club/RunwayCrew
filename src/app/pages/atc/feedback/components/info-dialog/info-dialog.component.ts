import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  data:any;
  constructor(protected ref: NbDialogRef<InfoDialogComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  close(){
    this.ref.close();
  }

}
