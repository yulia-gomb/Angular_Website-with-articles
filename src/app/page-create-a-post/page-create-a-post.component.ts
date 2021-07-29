import { Component, OnInit } from '@angular/core';
import { NgForm} from "@angular/forms";
import { FirebaseService} from "../Services/firebase.service";
import { ImageService } from "../Services/image.service";


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-page-create-a-post',
  templateUrl: './page-create-a-post.component.html',
  styleUrls: ['./page-create-a-post.component.css'],
  providers: [FirebaseService, ImageService]
})
export class PageCreateAPostComponent implements OnInit {

  selectedFile: any;

  constructor(private firebaseService: FirebaseService,
              private imageService: ImageService) {}


    //adding image

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      let name = imageInput.files[0].name;
      this.imageService.uploadImage(file, name);
    });

    reader.readAsDataURL(file);
  }

    //------------------


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
