import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonLabel, IonItem, IonButton, IonInput, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonLabel, IonItem, IonButton, RouterLink, CommonModule, FormsModule, IonInput, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
})
export class HomePage implements OnInit {


  keyword: string = ""; 
  apiKey = "1e83ad3775d3523cef62b909a9826f44"
  movieInfo: any;
  options: HttpOptions = {
  url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey 
  }
  constructor(private router: Router,private ds:DataService, private mhs:MyHttpService) {addIcons({heart});}

   ngOnInit() {
    this.loadTrends();
   }

    async loadTrends(){
    let result = await this.mhs.get(this.options)
    this.movieInfo = result.data.results
    console.log(JSON.stringify(this.movieInfo)) 
  }
  
  async openMovies(){
  await this.ds.set("kw", this.keyword);
  this.router.navigate(['/movie-details']);
}
  
}



  