import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


/*Please note this page was created by following along with your notes/exercise solutions for assistance with the project,
I take no credit for this work but added comments to demonstrate my understanding of what is occuring here in regards to ionic storage
and the actual service that can be used throughout the various pages
*/



@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  //Constructoer to intilaise Storage object
constructor(private storage: Storage){
  this.init();
}

//wait and create the storage setup
async init(){
  await this.storage.create();
}

//set/save the data into storage uisng set keyword
async set(key: string,value: any){
  await this.storage.set(key, value);
}

//retieves/gets data from storage using the get keyword and key value
async get(key: string){
  return await this.storage.get(key);
}
}
