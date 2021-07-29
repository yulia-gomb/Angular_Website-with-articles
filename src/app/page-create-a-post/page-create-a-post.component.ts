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
    count: number = 1;

    public addNewBlock(e: Event) {
      e.preventDefault();
      this.items = [...this.items, this.items.length];
      this.count++;
      console.log(this.count);
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

    onSubmit(myForm: NgForm){

      console.log(myForm);

      //get values for article object

      //***title
      let title: string = myForm.value.title

      //***subtitles and text
      let value: string[] = myForm.value;
      let subtitles: string[] = [];
      let text: string[] = [];

      for (let i = 0; i < this.count; i++) {
        let keyOfSubtitles: any= "subtitle"+i;
        subtitles.push(value[keyOfSubtitles]);

        let keyOfText: any= "text"+i;
        text.push(value[keyOfText]);

      }

      //***author
      let author: string | null | undefined = localStorage.getItem("author");

      //***date
      let date: string = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"long"});



      //save (send) article
      this.firebaseService.sendArticle({
        title: title,
        description: subtitles,
        subtitles: subtitles,
        text: text,
        author: author,
        date: date,
        tags: this.tagsForForm
      })

    }


}
