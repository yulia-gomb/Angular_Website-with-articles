import { Component, OnInit } from '@angular/core';
import { NgForm} from "@angular/forms";
import { FirebaseService} from "../Services/firebase.service";


@Component({
  selector: 'app-page-create-a-post',
  templateUrl: './page-create-a-post.component.html',
  styleUrls: ['./page-create-a-post.component.css'],
  providers: [FirebaseService]
})
export class PageCreateAPostComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {}

    //button "Add new block"

    public items: any[] = [''];

    public addNewBlock(e: Event) {
      e.preventDefault();
      console.log(e)
      this.items = [...this.items, this.items.length]
    }

    //function of adding tags to article

    tags!: string[];
    tagsForForm: string[] = [];

    addTags(e: any) {
      let newTag = e.target.innerHTML;
      if(!this.tagsForForm.includes(newTag)){
        this.tagsForForm.push(newTag)
      } else {
        this.tagsForForm = this.tagsForForm.filter(item => item !== newTag);
      }
    }

    ngOnInit(): void {

      // getting data from Firebase

      this.firebaseService.getTags().subscribe(tags =>
        this.tags = tags)
  }

    //submit form
    article: any;

    onSubmit(myForm: NgForm){
      console.log(myForm);

      //get values for article object

      //***title
      let title = myForm.value.title

      //***author
      let author: any = localStorage.getItem("author");

      //***date
      let date = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"long"});

      console.log(date);

      //save (send) article
      this.firebaseService.sendArticle({
        title: title,
        author: author,
        date: date
      })

    }


}
