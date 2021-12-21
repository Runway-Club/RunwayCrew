import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  public feedback: any;
  public loadDone:boolean = true;
  constructor() {
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

  ngOnInit(): void {
  }

}
