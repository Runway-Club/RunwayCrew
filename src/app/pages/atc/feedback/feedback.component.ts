import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component'
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  public feedback: any;
  public loadDone:boolean = true;
  constructor(private dialogService: NbDialogService) {
    this.feedback = [
      {
        title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, voluptatibus aliquid. Ea ipsam, numquam repudiandae quidem aliquid nemo optio voluptatum.",
        user: "Lorem",
        status: "peding",
        date: "1/1/1970",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, voluptatibus aliquid. Ea ipsam, numquam repudiandae quidem aliquid nemo optio voluptatum."
      }, 
      {
        title: "Lorem ipsum dolor, sit amet consectetur",
        user: "Lorem",
        status: "peding",
        date: "1/1/1970",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, voluptatibus aliquid. Ea ipsam, numquam repudiandae quidem aliquid nemo optio voluptatum."
      }, 
      {
        title: "Lorem ipsum dolor, sit amet consectetur",
        user: "Lorem",
        status: "peding",
        date: "1/1/1970",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, voluptatibus aliquid. Ea ipsam, numquam repudiandae quidem aliquid nemo optio voluptatum."
      }
    ]

  }
  openDialog(item:any){
    this.dialogService.open(InfoDialogComponent,{context:{data:item}});
  }
  ngOnInit(): void {
  }

}
