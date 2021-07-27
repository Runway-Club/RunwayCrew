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

  constructor(private dialog: NbDialogService, private skillService: SkillService) { }

  ngOnInit(): void {
    this.skillService.getAll().subscribe((skills) => {
      this.skills.length = 0;
      this.skills.push(...skills);
    })
  }

  public skills: Skill[] = [];

  public addEmptySkill() {
    this.skills.push({
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
    await this.skillService.create(this.skills[i]);
  }

}
