import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';

import { map, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  pastExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
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
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableExercises(exercises));
          },
          err => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.openSnackBar(
              'Fetching exercises failed, please try again later',
              null,
              3000
            );
            this.exerciseChanged.next(null);
          }
        )
    );
  }

  fetchPastExercises(userId) {
    this.fbSubs.push(
      this.db
        .collection(`users/${userId}/pastExercises`)
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedExercises(exercises));
        })
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise(userId) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDB(
          {
            ...ex,
            duration: ex.duration / 1000,
            date: new Date(),
            state: 'completed',
          },
          userId
        );
        this.store.dispatch(new Training.StopTraining());
      });
  }

  cancelExercise(progress: number, userId) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDB(
          {
            ...ex,
            duration: ex.duration * (progress / 100000),
            calories: ex.calories * (progress / 100),
            date: new Date(),
            state: 'canceled',
          },
          userId
        );
        this.store.dispatch(new Training.StopTraining());
      });
  }

  cancelSubs() {
    this.fbSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private addDataToDB(exercise: Exercise, userId) {
    // this.db.collection('pastExercises').add(exercise);
    this.db.collection(`users/${userId}/pastExercises`).add(exercise);
  }
}
