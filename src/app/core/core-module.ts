import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { provideAuth, getAuth} from '@angular/fire/auth'

@NgModule({
  declarations: [],
  providers: [
   provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
   provideFirestore(() => getFirestore()),
   provideAuth(() => getAuth()),
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
