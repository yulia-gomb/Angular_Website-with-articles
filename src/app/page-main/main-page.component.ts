import { Component, OnInit } from '@angular/core';
import { FirebaseService} from "../Services/firebase.service";
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [FirebaseService]
})
export class MainPageComponent implements OnInit {

  data: any;
  tags?: string[];
  res: any;

  constructor(private firebaseService: FirebaseService) {}

  //function of filter articles by tags

  tagsForFilter: string[] = [];


  filterByTags(e: any) {
    let newTag = e.target.innerHTML.trim();
    if(!this.tagsForFilter.includes(newTag)){
      this.tagsForFilter.push(newTag);
      e.target.classList.add('active');
    } else {
      this.tagsForFilter = this.tagsForFilter.filter(item => item !== newTag);
      e.target.classList.remove('active');
    }
    /*console.log(this.tagsForFilter);*/
    /*this.data = this.data.filter(
        (d: { tags: string | string[]; }[]) => d[1].tags.includes("Angular")
    )
    console.log(this.data);*/

  }

  ngOnInit(): void {

    // getting data from Firebase

    this.firebaseService.getArticles().subscribe( data => {
        this.data = Object.entries(data)
      /*console.log(this.data)*/
    }
    )

    this.firebaseService.getTags().subscribe(tags =>
      this.tags = tags)

    //function of filter articles by search input

    let searchBox: any = document.getElementById('searchInput');
    let keyup = fromEvent(searchBox, 'keyup');

    keyup.pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(500)
    ).subscribe(res => {
        this.res = res;
        this.firebaseService.getArticlesBySearch(this.res).subscribe( data => {
            this.data = Object.entries(data);
            }
        )
      });

  }

}
