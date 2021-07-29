import { Component, OnInit } from '@angular/core';
import { FirebaseService} from "../Services/firebase.service";



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [FirebaseService]
})
export class MainPageComponent implements OnInit {

  data: any;
  tags: string[] | undefined;

  constructor(private firebaseService: FirebaseService) {}

  //function of filter articles by tags

  tagsForFilter: string[] = [];
  activated: boolean = true;

  filterByTags(e: any) {
    let newTag = e.target.innerHTML;
    if(!this.tagsForFilter.includes(newTag)){
      this.tagsForFilter.push(newTag.trim());
      this.activated=!this.activated;
    } else {
      this.tagsForFilter = this.tagsForFilter.filter(item => item !== newTag);
      this.activated=!this.activated;
    }
    console.log(this.tagsForFilter);

  }

  ngOnInit(): void {

    // getting data from Firebase

    this.firebaseService.getArticles().subscribe( data =>
    this.data = Object.entries(data)

    )

    this.firebaseService.getTags().subscribe(tags =>
      this.tags = tags)

  }

}
