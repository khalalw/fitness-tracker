import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30000, calories: 8 },
    { id: 'burpees', name: 'Burpees', duration: 60000, calories: 17 },
    { id: 'plank', name: 'Plank', duration: 30000, calories: 9 },
    { id: 'pullups', name: 'Pull Ups', duration: 15000, calories: 6 },
    { id: 'pushups', name: 'Push Ups', duration: 50000, calories: 13 },
    { id: 'legraises', name: 'Leg Raises', duration: 90000, calories: 16 },
  ];

  private runningExercise: Exercise;

  getExercises() {
    return [...this.availableExercises];
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
