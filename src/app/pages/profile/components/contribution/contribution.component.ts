import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContributionService } from 'src/app/services/contribution.service';
import { UserContribution } from 'src/models/user-profile.model';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss'],
})
export class ContributionComponent implements OnInit {
  @Input() uid = '';
  @Input() contributionInfo: UserContribution | undefined;
  currentUser: any;
  constructor(
    private authService: AuthenticationService
  ) {
    setTimeout(async () => {
      this.currentUser = (await this.authService.user)?.uid;
    }, 500);
  }
  ngOnInit(): void { }
  public convertDate(timestamp?: number) {
    var d = new Date(timestamp ?? 0);

    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  }
  checkViewAvgas() {
    if (this.currentUser == this.uid) {
      return true;
    }
    return false;
  }
}
