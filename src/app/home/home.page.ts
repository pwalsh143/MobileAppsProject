import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonLabel, IonItem, IonButton, IonInput,IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonLabel, IonItem, IonButton, RouterLink, FormsModule, IonInput, IonIcon],
})
export class HomePage {


  keyword: string = "";
  constructor(private router: Router,private ds:DataService) {addIcons({heart});}

  
  
  async openMovies(){
  await this.ds.set("kw", this.keyword);
  this.router.navigate(['/movie-details']);
}
  
}
