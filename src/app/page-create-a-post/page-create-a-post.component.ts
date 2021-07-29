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



  constructor(private firebaseService: FirebaseService,
              private imageService: ImageService) {}


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

  //adding image

  selectedFile: any;

  file: any;

  processFile(imageInput: any) {

    this.file = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, this.file);
      this.selectedFile.pending = true;


    });

    reader.readAsDataURL(this.file);

  }


    //submit form

    onSubmit(myForm: NgForm, imageInput: any){

      console.log(myForm.value);

      //get values for article object

      //***image
      let name = imageInput.files[0].name;
      this.imageService.uploadImage(this.file, name)


      let url = this.imageService.uploadImage(this.file, name)
      /*let url = this.imageService.getURLimage('web1.png');*/
      console.log(url)

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
        /*img: url,*/
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
