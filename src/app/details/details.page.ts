import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonButton, IonIcon, IonList, IonItem, IonThumbnail, IonLabel, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonButton, IonIcon, RouterLink, IonList, IonItem, IonThumbnail, IonLabel, IonCardContent]
})
export class DetailsPage implements OnInit {

  apiKey = "1e83ad3775d3523cef62b909a9826f44"
  personInfo: any;
  creditsInfo: any;
  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey 
    }


 constructor(private router: Router, private ds:DataService, private mhs:MyHttpService) { 
 
     addIcons({ homeOutline });
   }

   async getPersonalDetails(){
    let personalId = await this.ds.get("personalId");

    this.options.url= "https://api.themoviedb.org/3/person/" + personalId + "?api_key=" + this.apiKey;

    let result = await this.mhs.get(this.options);

    this.personInfo = result.data;
   }

   async getCredits(){
 let personalId = await this.ds.get("personalId");

    this.options.url= "https://api.themoviedb.org/3/person/" + personalId + "/movie_credits?api_key=" + this.apiKey;

    let result = await this.mhs.get(this.options);

    this.creditsInfo = result.data.cast;
    
}

//pulled this code over from homepage ts to reuse, could of potentially made a service of this perhaps but decided against it
async openMovieDetails(id: number){

  console.log(id);
  //using dataservice save movie clicked
  await this.ds.set("movieId", id)

  //then open the relevant movie details page
  this.router.navigate(['/movie-details']);

}

  ngOnInit() {

    this.getPersonalDetails();

    this.getCredits();
  }

}
