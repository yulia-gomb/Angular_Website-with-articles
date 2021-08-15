import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FirebaseService} from "../Services/firebase.service";

@Component({
  selector: 'app-page-article',
  templateUrl: './page-article.component.html',
  styleUrls: ['./page-article.component.css'],
  providers: [FirebaseService]
})
export class PageArticleComponent implements OnInit {

  id: number;
  data = {
    img: "",
    title: "",
    subtitles: [],
    text: [],
    author: "",
    date: "",
    tags: [],
  }
  textArray: string[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private firebaseService: FirebaseService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {

    // getting data from Firebase
    this.firebaseService.getArticles().subscribe( (data: any) =>{
        this.data = data[this.id];
        this.textArray = data[this.id].text;
        })
  }

}
