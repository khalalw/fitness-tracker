import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';

// @Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 17 },
    { id: 'plank', name: 'Plank', duration: 30, calories: 9 },
    { id: 'pullups', name: 'Pull Ups', duration: 15, calories: 6 },
    { id: 'pushups', name: 'Push Ups', duration: 50, calories: 13 },
    { id: 'legraises', name: 'Leg Raises', duration: 90, calories: 16 },
  ];

  getExercises() {
    return [...this.availableExercises];
  }
}
