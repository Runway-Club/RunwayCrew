import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private defautlSnackBarConfig: MatSnackBarConfig =
    {
      horizontalPosition: 'end', verticalPosition: 'bottom',
      duration: 1 * 2000,
      panelClass: ['white-snackbar']
    };
  private defaultSnackBarAction: string = "close";


  constructor(readonly snackBar: MatSnackBar) { }

  openSnackBar(message: string, isSuscess: boolean = true, action = this.defaultSnackBarAction, config: MatSnackBarConfig = this.defautlSnackBarConfig) {
    if(!isSuscess){
      this.defautlSnackBarConfig.panelClass = ['red-snackbar'];
    }
    this.snackBar.open(message, action, config);
  }
}
