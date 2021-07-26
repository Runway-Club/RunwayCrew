import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NbDialogRef } from '@nebular/theme';

@Component({
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(private dialogRef: NbDialogRef<FileUploadComponent>, private storage: AngularFireStorage, private auth: AngularFireAuth, private db: AngularFirestore) { }

  public percentage = 0;
  public fileList: any[] = [];
  public selectedId = 0;

  public isFinish = true;

  ngOnInit(): void {
    this.getFiles();
  }

  async getFiles() {
    let user = await this.auth.currentUser;
    this.db.collection(`storage`).doc(`${user?.uid ?? 'default'}`).collection('files').snapshotChanges().subscribe((snapshots) => {
      this.fileList = [];
      for (let s of snapshots) {
        this.fileList.push(s.payload.doc.data());
      }
    });
  }

  async select() {
    let user = await this.auth.currentUser;
    let file = this.fileList[this.selectedId];
    let url = await this.storage.ref((user?.uid ?? "default") + "/" + file.id).getDownloadURL().toPromise();
    this.dialogRef.close({ url: url });
  }

  async upload(event: Event) {
    let user = await this.auth.currentUser;
    let timestamp = Date.now().toString();
    let fileList = (event.currentTarget as HTMLInputElement).files;
    if (!fileList) {
      return;
    }
    let file = fileList[0];
    let task = this.storage.ref((user?.uid ?? "default") + "/" + timestamp).put(file);

    task.percentageChanges().subscribe((percentage) => this.percentage = percentage ?? 0);
    task.snapshotChanges().subscribe((t) => {
      if (t?.state == 'running') {
        this.isFinish = false;
      }
      else {
        this.isFinish = true;
      }
    });
    await this.db.collection(`storage`).doc(`${user?.uid ?? 'default'}`).collection('files').doc(timestamp).set({
      name: file.name,
      type: file.type,
      size: file.size,
      id: timestamp
    });
  }

}
