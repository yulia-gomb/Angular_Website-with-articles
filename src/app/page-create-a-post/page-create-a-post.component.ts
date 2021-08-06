import { Component, OnInit } from '@angular/core';
import { NgForm} from "@angular/forms";
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService} from "../Services/firebase.service";
import { ImageService } from "../Services/image.service";
import {Router} from '@angular/router';


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

    //button "Add new block"

    public items: any[] = [''];
    count: number = 1;

    public addNewBlock(e: Event) {
      e.preventDefault();
      this.items = [...this.items, this.items.length];
      this.count++;
      (<FormArray>this.myForm.controls["subtitles"]).push(new FormControl(""));
      (<FormArray>this.myForm.controls["text"]).push(new FormControl(""));
    }

    getFormsControls() : FormArray{
      return this.myForm.controls['subtitles'] as FormArray;
    }

    //function of adding tags to article

    tags!: string[];
    tagsForForm: string[] = [];

    addTags(e: any) {
      let newTag = e.target.innerHTML.trim();
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

  //collection of data for form (reactive)

  myForm : FormGroup;
  article: any;

  //***author of article
  author: string | null | undefined = localStorage.getItem("author");
  //***date of article
  date: string = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"long"});


  constructor(private firebaseService: FirebaseService,
              private imageService: ImageService,
              private router: Router) {

    this.myForm = new FormGroup({

      "title": new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200),
        Validators.pattern("^(?!.*@).*$")
      ]),
      "subtitles": new FormArray([
        new FormControl("")
      ]),
      "text": new FormArray([
        new FormControl("")
      ])
    });

  }

  onSubmit(imageInput: any){

    console.log('publish');
    console.log(this.myForm.controls);

    //download image
    let name = imageInput.files[0].name;
    this.imageService.uploadImage(this.file, name)


    //data from form

    this.article = {
      img: this.selectedFile.src,
      title: this.myForm.controls.title.value,
      description: this.myForm.controls.subtitles.value,
      subtitles: this.myForm.controls.subtitles.value,
      text: this.myForm.controls.text.value,
      author: this.author,
      date: this.date,
      tags: this.tagsForForm
    }

    //save (send) article on server

    this.firebaseService.sendArticle(this.article)

  }

  previewArticle(){
    this.router.navigate(['preview-a-post']);
  }








}
