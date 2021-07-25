import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Feedback } from 'src/models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  public async requireRoles(roleNames: string[]) {
    let current = Date.now();
    let user = await this.auth.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    let feedback: Feedback = {
      fromId: user.uid,
      fromEmail: user.email ?? "",
      author: user.displayName ?? "Unknown",
      subject: "[REQUIRES ROLES]",
      content: roleNames.reduce((prev, r) => prev + ', ' + r),
      processed: false,
      timestamp: current
    };
    await this.db.collection("feedbacks/atc").doc(current.toString()).set(feedback);
  }

  public async processFeedback(feedbackId: string, isAtc: boolean) {
    let current = Date.now();
    let user = await this.auth.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    if (isAtc) {
      await this.db.collection("feedbacks/atc").doc(feedbackId).update({
        processed: true,
        processedTime: current,
        processBy: user.email
      });
    }
  }

}
