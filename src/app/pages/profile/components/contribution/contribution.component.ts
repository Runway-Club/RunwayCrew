import { Component, OnInit } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { UserContribution } from 'src/models/user-profile.model';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss']
})
export class ContributionComponent implements OnInit {

  contributionInfo: UserContribution | undefined;
  constructor(
    private contributionService: ContributionService
  ) { }

  ngOnInit(): void {
    setTimeout(async () => {
      await this.getContributions();
    }, 500)
  }


  async getContributions() {
    this.contributionInfo = await this.contributionService.get();
  }
  public convertDate(timestamp?: number) {
    var d = new Date(timestamp ?? 0);

    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  }
}
