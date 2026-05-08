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
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonButton, RouterLink]
})
export class MovieDetailsPage implements OnInit,ViewWillEnter {

  
  apiKey = "1e83ad3775d3523cef62b909a9826f44"
  movieInfo: any;
  castMembers: any;
  crewMembers: any;
  options: HttpOptions = {
  url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey 
  }
  
  constructor(private router: Router, private ds:DataService, private mhs:MyHttpService) { 

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

  //copied method from homepage and adjusted it to open details
  async openDetails(id: number){

  console.log(id);
  //using dataservice save cast/crew details clicked
  await this.ds.set("personalId", id)
  //open the relevant details page
  this.router.navigate(['/details']);
  }



   ngOnInit() {
    //call methods on page load
    this.getMovieDetails();

    this.castingCall();

   }

   /* as per your lecture notes(Ionic Introduction) on the ionic lifecycle and the ionic docs, used ionViewWillEnter to fix the issue of pages 
   keeping data and not properly routing to desired content, instead what occured was routing back to the retrieved saved data, 
   there appeared to be a loop, where after clicking it most likely referenced what was saved in storage. */
   
   ionViewWillEnter(){
  //calls methods after ngOnInit, refreshing relevant data
  this.getMovieDetails();

  this.castingCall();
}

   
}

