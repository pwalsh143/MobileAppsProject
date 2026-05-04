import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class MovieDetailsPage implements OnInit {

  keyword: string = "";
  apiKey = "1e83ad3775d3523cef62b909a9826f44"
  movieInfo: any;
  options: HttpOptions = {
  url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey 
  }
  
  constructor(private ds:DataService, private mhs:MyHttpService) { }

   ngOnInit() {
    this.getKW();
   }

    async getKW(){
    this.keyword = await this.ds.get('kw');
    this.options.url = this.options.url.concat(this.keyword)
    let result = this.mhs.get(this.options)
    this.movieInfo = (await result).data.results
    console.log(JSON.stringify(this.movieInfo)) 
  }
}

