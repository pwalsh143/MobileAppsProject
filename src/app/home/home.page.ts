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
    this.options.url ="https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey;
    let result = await this.mhs.get(this.options)
    this.movieInfo = result.data.results
    console.log(JSON.stringify(this.movieInfo)) 
  }
  
  async openMovies(){
  await this.ds.set("kw", this.keyword);
  
  
  //for empty search bar return trending movies by calling method again
  if(this.keyword ==""){
    this.loadTrends();
    return;

  }
  //search bar with returned query from call as per suggestion in project brief
this.options.url= "https://api.themoviedb.org/3/search/movie?api_key=" + this.apiKey + "&query=" + this.keyword

//copied code from above to reuse
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



  