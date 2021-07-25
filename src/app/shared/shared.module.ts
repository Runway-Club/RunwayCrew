import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule } from '@nebular/theme';
import { NavbarComponent } from './navbar/navbar.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: [
    NavbarComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    FormsModule,
    NbDialogModule.forChild({
      hasBackdrop: true,
      closeOnBackdropClick: true
    }),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NbListModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: []
})
export class SharedModule { }
