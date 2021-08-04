import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  uploadPercent: Observable<any> | undefined;
  downloadURL: Observable<string> | undefined;

  /*profileUrl: Observable<string | null> | undefined;*/

  constructor(private storage: AngularFireStorage) { }

  public uploadImage(file: any, name: string): any {

    /*const ref = this.storage.ref(name);
    ref.put(file);*/

     this.storage.upload(name, file);


  }

  /*public getURLimage(file: any, name: string){
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( url =>{
          this.downloadURL = url
          console.log(this.downloadURL)}
        )

      })
    )
      .subscribe( )

    return this.downloadURL;

  }*/


}
