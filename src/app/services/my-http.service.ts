import { Injectable } from '@angular/core';
import { CapacitorConfig } from '@capacitor/cli';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

/*Please note this page was also created by following along with your notes/exercise solutions for assistance with the project,
I take no credit for this work but added comments to demonstrate my understanding of what is occuring here. In this case we are using capacitorHttp
to help make calls to the relevant API
*/


@Injectable({
  providedIn: 'root',
})
export class MyHttpService {
  

  constructor(){}

    //get method to retrieve and allow for api call to take its time
  public async get (options: HttpOptions) {
    console.log(options.url)//this is just a console.log print for inspection
    return await CapacitorHttp.get(options);//sends request to api and rteurn data(JSON data)
  }
}
