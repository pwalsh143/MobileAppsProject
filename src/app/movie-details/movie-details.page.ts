import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { homeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonButton, RouterLink]
})
export class MovieDetailsPage implements OnInit {

  
  apiKey = "1e83ad3775d3523cef62b909a9826f44"
  movieInfo: any;
  castMembers: any;
  crewMembers: any;
  options: HttpOptions = {
  url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey 
  }
  
  constructor(private ds:DataService, private mhs:MyHttpService) { 

    addIcons({ homeOutline });
  }

  async getMovieDetails(){

    //retrieve movie ID
    let movieId = await this.ds.get("movieId");

    //movie id to console, to check with inspect tool
    console.log(movieId);

     //took code from home.page.ts and adjusted it slightly
    this.options.url= "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + this.apiKey;

    //send request to database & store
    let result = await this.mhs.get(this.options)
    this.movieInfo = result.data;

    console.log(this.movieInfo);
  }

  async castingCall(){

    //same as above but added credits to url to pull relevant details for page display
    let movieId = await this.ds.get("movieId");
    this.options.url= "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + this.apiKey;

    //store data for cast and crew separately
    let result = await this.mhs.get(this.options)
    this.castMembers = result.data.cast;
    this.crewMembers = result.data.crew;
  }


   ngOnInit() {
    //call methods on page load
    this.getMovieDetails();

    this.castingCall();

   }

   
}

