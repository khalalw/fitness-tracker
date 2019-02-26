import { AuthModule } from './auth/auth.module';
import { UIService } from './shared/ui.service';
import { AuthService } from './auth/auth.service';
import { AppRoutingMOdule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from './../environments/environment';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken,
} from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { TrainingService } from './training/training.service';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingMOdule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
  ],
  providers: [
    AuthService,
    UIService,
    TrainingService,
    { provide: FirestoreSettingsToken, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
