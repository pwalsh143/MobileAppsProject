import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonInput, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { trophyOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

/*This page was also created with help from your exercises and notes, from here I was able to slightly build upon it
and add some extra functionality, as its core the foundation was set up by following along with your videos but you'll notice some nuances here and there.
This page was the first page setup and a lot of the code was copied and utilised on other pages like movie-details, details etc as this 
page acted like a stepping stone to build on from. I've added further comments throughout to explain my understanding in my own words
 */

//metadata
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,  IonLabel,  IonButton, RouterLink, CommonModule, FormsModule, IonInput, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
})
export class HomePage implements OnInit {

//variables that contain the apikey, potential data etc
  keyword: string = ""; 
  apiKey = "1e83ad3775d3523cef62b909a9826f44"
  movieInfo: any;
  options: HttpOptions = {
  url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey 
  }

  //constructor with router for linking and the relevant injection of dataservice and MyHttpService
  constructor(private router: Router,private ds:DataService, private mhs:MyHttpService) {addIcons({heart, trophyOutline});}

    //call method on page intialisation
   ngOnInit() {
    this.loadTrends();
   }

   //method to get trending movies
    async loadTrends(){
    this.options.url ="https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey; //actual api url plus concatenation with my own api key
    let result = await this.mhs.get(this.options) //variable to store retrieved data
    this.movieInfo = result.data.results //store response returned in movieInfo(variable listed above)
    console.log(JSON.stringify(this.movieInfo)) //converts JSon to string
  }
  
  //methiod for storing search data in ionic storage, set method called(from dataservice)
  async openMovies(){
  await this.ds.set("kw", this.keyword);
  
  
  //for empty search bar return trending movies by calling method again
  if(this.keyword ==""){
    this.loadTrends();
    return;

  }
  //search bar with returned query from call as per suggestion in project brief
this.options.url= "https://api.themoviedb.org/3/search/movie?api_key=" + this.apiKey + "&query=" + this.keyword

//(copied code from above to reuse)
let result = await this.mhs.get(this.options)
    this.movieInfo = result.data.results


}
  
async openMovieDetails(id: number){

  console.log(id);
  //using dataservice save movie clicked
  await this.ds.set("movieId", id)

  //then open the relevant movie details page
  this.router.navigate(['/movie-details']);
}

}



  