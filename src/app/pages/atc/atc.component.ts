import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component'
@Component({
  selector: 'app-atc',
  templateUrl: './atc.component.html',
  styleUrls: ['./atc.component.scss']
})
export class AtcComponent implements OnInit {
  constructor(
    private AppComponent: AppComponent
  ) { }

  taskList = [
    { id: 1, name: 'Quản lý thành viên',router:"members",icon:"people-outline" },
    { id: 2, name: 'Quản lý vai trò',router:"roles",icon:"briefcase-outline" },
    { id: 3, name: 'Quản lý kỹ năng',router:"skills",icon:"activity-outline" },
    { id: 4, name: 'Quản lý thành tựu',router:"achievements",icon:"award-outline" },
    { id: 5, name: 'Quản lý phản hồi',router:"feedback",icon:"message-circle-outline" },
  ];
  selectedTasks: any = {
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false
  };
  ObjectLength(object: any) {
    var length = 0;
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        ++length;
      }
    }
    return length;
  };
  click(task: any) {
    let length = this.ObjectLength(this.selectedTasks)
    for (let i = 1; i <= length; i++) {
      this.selectedTasks[i] = false;
    }
    this.selectedTasks[task.id]= !this.selectedTasks[task.id];
  }

  ngOnInit(): void {
    this.AppComponent.selectedMenu = 2
    this.AppComponent.showSidemenu = false
  }
}
