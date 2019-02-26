import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [SharedModule, TrainingRoutingModule],
  exports: [],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
