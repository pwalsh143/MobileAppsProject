import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonLabel, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonLabel, IonItem, IonButton, RouterLink, FormsModule, IonInput],
})
export class HomePage {

  keyword: string = "";
  constructor() {}
}
