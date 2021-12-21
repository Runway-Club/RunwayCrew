import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SkillService } from 'src/app/services/skill.service';
import { FileUploadComponent } from 'src/app/shared/file-upload/file-upload.component';
import { Skill } from 'src/models/skill.model';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  public loadDone = false;

  constructor(private dialog: NbDialogService, private skillService: SkillService) { }

  ngOnInit(): void {
    this.skillService.getAll().subscribe((skills) => {
      this.skills.length = 0;
      this.skills.push(...skills);
      this.loadDone = true;
      this.totalLength = this.skills.length
    })
  }

  public skills: Skill[] = [];

  public totalLength!:number;
  public page:number = 1;
  public pageSize:number = 5;

  public addEmptySkill() {
    this.skills.push({
      _id:'',
      id: "",
      name: "",
      description: "",
      image: "",
      levels: [],
    });
  }

  public uploadImage(i: number) {
    this.dialog.open(FileUploadComponent).onClose.subscribe((data) => {
      this.skills[i].image = data.url;
    })
  }

  public async deleteSkill(id: string) {
    await this.skillService.delete(id);
    window.location.reload();
  }

  public async saveSkill(i: number) {
    const _id = this.skills[i]._id;
    if(!_id){
      return await this.skillService.create(this.skills[i]);
    }else{
      return await this.skillService.update(this.skills[i]);
    }
  }

}
