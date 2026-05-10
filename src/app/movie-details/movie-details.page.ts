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
export class MovieDetailsPage implements OnInit, ViewWillEnter {


  apiKey = "1e83ad3775d3523cef62b909a9826f44"
  movieInfo: any;
  castMembers: any;
  crewMembers: any;
  isFav: boolean = false;
  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey
  }

  constructor(private router: Router, private ds: DataService, private mhs: MyHttpService) {

    addIcons({ homeOutline });
  }

  async getMovieDetails() {

    //retrieve movie ID
    let movieId = await this.ds.get("movieId");

    //movie id to console, to check with inspect tool
    console.log(movieId);

    //took code from home.page.ts and adjusted it slightly
    this.options.url = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + this.apiKey;

    //send request to database & store
    let result = await this.mhs.get(this.options)
    this.movieInfo = result.data;

    //wait for method below to finish to determine if it is a favourite
    await this.favouriteMovie();

    console.log(this.movieInfo);
  }

  async castingCall() {

    //same as above but added credits to url to pull relevant details for page display
    let movieId = await this.ds.get("movieId");
    this.options.url = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + this.apiKey;

    //store data for cast and crew separately
    let result = await this.mhs.get(this.options)
    this.castMembers = result.data.cast;
    this.crewMembers = result.data.crew;
  }

  //copied method from homepage and adjusted it to open details
  async openDetails(id: number) {

    console.log(id);
    //using dataservice save cast/crew details clicked
    await this.ds.set("personalId", id)
    //open the relevant details page
    this.router.navigate(['/details']);
  }


  //this method checks if the movie is already favourited
  async favouriteMovie() {

    //fetch favourites from ionic strage
    let favourites = await this.ds.get("favourites");

    //check if null/empty
    if (favourites === null || favourites === "") {
      //create an array of favourites that is empty 
      favourites = [];
    }

    //default to false
    this.isFav = false;

    //iterate through array containing favourites
    for (let movie of favourites) {
      if (movie.id == this.movieInfo.id) //if there is a match between stored movie and current movie
        this.isFav = true; //then this movie is already a favourite
    }

  }


  //method for adding to favourites
  async addToFavourites() {
    //retrieve favourites array
    let favourites = await this.ds.get("favourites");

    //check if null/empty
    if (favourites === null || favourites === "") {
      //create an array of favourites that is empty 
      favourites = [];
    }

    //add current movie to the array
    favourites.push(this.movieInfo);

    //now set this new array with updated data
    await this.ds.set("favourites", favourites);

    //update status of film
    this.isFav = true;

  }

  //method for removing favourites
  async removeFromFavourites() {

    //retrieve favourites array
    let favourites = await this.ds.get("favourites");

    //loop through the array and remove(splice) the index if it matches
    for (let i = 0; i < favourites.length; i++) {

      //check if the movies match
      if (favourites[i].id == this.movieInfo.id) {
        favourites.splice(i, 1); //and remove if that is the case
      }
    }

    //now set this new array with updated data
    await this.ds.set("favourites", favourites);

    //update status of film
    this.isFav = false;
  }





  //intialisation
  ngOnInit() {
    //call methods on page load
    this.getMovieDetails();

    this.castingCall();

  }

  /* as per your lecture notes(Ionic Introduction) on the ionic lifecycle and the ionic docs, I used ionViewWillEnter here to fix the issue of pages 
  keeping data and not properly routing to desired content, instead what occured was routing back to the retrieved saved data it seems, 
  there appeared to be a loop almost, where after clicking it most likely referenced what was saved in storage. ionViewWillEnter helped to stop this and 
  make page function accordingly. */

  ionViewWillEnter() {
    //calls methods after ngOnInit, refreshing relevant data
    this.getMovieDetails();

    this.castingCall();
  }


}

