import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  pastExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docData => {
            return docData.map(doc => {
              const d: any = doc.payload.doc;
              return {
                id: d.id,
                name: d.data().name,
                duration: d.data().duration,
                calories: d.data().calories,
              };
            });
          })
        )
        .subscribe((exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        })
    );
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDB({
      ...this.runningExercise,
      duration: this.runningExercise.duration / 1000,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDB({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100000),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchPastExercises() {
    this.fbSubs.push(
      this.db
        .collection('pastExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.pastExercisesChanged.next(exercises);
        })
    );
  }

  cancelSubs() {
    this.fbSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private addDataToDB(exercise: Exercise) {
    this.db.collection('pastExercises').add(exercise);
  }
}
