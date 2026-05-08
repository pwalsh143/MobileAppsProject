import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import { heart, trophyOutline } from 'ionicons/icons';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { homeOutline } from 'ionicons/icons';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, RouterLink]
})
export class FavouritesPage implements OnInit {

  constructor(private router: Router,private ds:DataService, private mhs:MyHttpService) {addIcons({heart, trophyOutline, homeOutline});}

  ngOnInit() {
  }

}
