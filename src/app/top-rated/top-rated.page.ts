import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonListHeader, IonList, IonLabel, IonItem, IonButton, IonInput, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonThumbnail } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { homeOutline } from 'ionicons/icons';

/*This page was created as an optional extra, it simply builds upon the other pages like details and movie_details,
You'll notice a lot of the code is similar but just tweaked slightly for the relevant varibales for this page.
Essentially nothing is really new here except the api call to the specific url(top rated) which is listed on the tmdb
reference section under "Top Rated". */

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.page.html',
  styleUrls: ['./top-rated.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, RouterLink],
})
export class TopRatedPage implements OnInit {

  //similarities again but a different variable(topInfo) this time in keeping with previous pages logic
  keyword: string = "";
  apiKey = "1e83ad3775d3523cef62b909a9826f44"
  topInfo: any;
  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey
  }
  constructor(private router: Router, private ds: DataService, private mhs: MyHttpService) { addIcons({ heart, homeOutline, }); }

  //similar to other relevant methods on other pages, just an api call to the relevant url with my api key
  async getTopRated() {
    this.options.url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + this.apiKey;
    let result = await this.mhs.get(this.options)
    this.topInfo = result.data.results
    console.log(JSON.stringify(this.topInfo))
  }
  //method is almost identical to all other pages that utilise it.
  async openMovieDetails(id: number) {

    console.log(id);
    //using dataservice save movie clicked
    await this.ds.set("movieId", id)

    //then open the relevant movie details page
    this.router.navigate(['/movie-details']);
  }

  //call method on intialisation of page
  ngOnInit() {

    this.getTopRated();
  }

}
