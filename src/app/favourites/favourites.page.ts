import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import { heart, trophyOutline } from 'ionicons/icons';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { homeOutline } from 'ionicons/icons';


/*This page contains methods relevant for the favourites display, again it reuses much of the code already created
*but changed slightly
*/

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, RouterLink, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle]
})
export class FavouritesPage implements OnInit {


  favouriteList: any; //variable to store films

  constructor(private router: Router, private ds: DataService, private mhs: MyHttpService) { addIcons({ heart, trophyOutline, homeOutline }); }


  async loadFavourites() {

    //get favourites from storage
    let favourites = await this.ds.get("favourites");

    //if it doesn't exist create a new array, just like movie details page(copied from there)
    if (favourites === null || favourites === "") {
      favourites = []; //empty array created

    }
    this.favouriteList = favourites;
  }

  //method copied over from other pages to open movie-details page
  async openMovieDetails(id: number) {

    console.log(id);
    //using dataservice save movie clicked
    await this.ds.set("movieId", id)

    //then open the relevant movie details page
    this.router.navigate(['/movie-details']);
  }


  ngOnInit() {

    this.loadFavourites();
  }

  ionViewWillEnter() {
    this.loadFavourites();
  }

}
