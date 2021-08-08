import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from "../Services/firebase.service";
import {ImageService} from "../Services/image.service";
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {SendingActions} from "../Store/sending.actions";


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


  public items: any[] = [''];
  count: number = 1;

  tags!: string[];
  tagsForForm: string[] = [];

  selectedFile: any;
  file: any;

  myForm: FormGroup;
  article: any;
  //***author of article
  author: string | null | undefined = localStorage.getItem("author");
  //***date of article
  date: string = new Date().toLocaleDateString("en", {year: "numeric", day: "2-digit", month: "long"});


  //button "Add new block"

  constructor(private firebaseService: FirebaseService,
              private imageService: ImageService,
              private router: Router,
              private store$: Store) {

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

  //collection of data for form (reactive)

  ngOnInit(): void {

    // getting data for page from Firebase (tags)

    this.firebaseService.getTags().subscribe(tags =>
      this.tags = tags)
  }

  public addNewBlock(e: Event) {
    e.preventDefault();
    this.items = [...this.items, this.items.length];
    this.count++;
    (<FormArray>this.myForm.controls["subtitles"]).push(new FormControl(""));
    (<FormArray>this.myForm.controls["text"]).push(new FormControl(""));
  }

  //***subtitles
  getFormsControls(): FormArray {
    return this.myForm.controls['subtitles'] as FormArray;
  }

  //function of adding tags to article
  //***tags
  addTags(e: any) {
    let newTag = e.target.innerHTML.trim();
    if (!this.tagsForForm.includes(newTag)) {
      this.tagsForForm.push(newTag)
    } else {
      this.tagsForForm = this.tagsForForm.filter(item => item !== newTag);
    }
  }


  //adding image
  //***image

  processFile(imageInput: any) {

    this.file = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, this.file);
      this.selectedFile.pending = true;


    });

    reader.readAsDataURL(this.file);

  }

  //------------button "Publish" (sending form`s data on server)-----------

  onSubmit(imageInput: any) {

    console.log('publish');
    console.log(this.myForm.controls);

    //download image
    let name = imageInput.files[0].name;
    this.imageService.uploadImage(this.file, name)


    //data from Form

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

  //--------------button "Preview" (sending form`s data for previewing)--------------

    previewArticle() {
      this.store$.dispatch(SendingActions.sendingFormDataForPreview({
        title: this.myForm.controls.title.value,
        img: this.selectedFile.src,
        subtitles: this.myForm.controls.subtitles.value,
        text: this.myForm.controls.text.value,
        author: this.author,
        date: this.date,
        tags: this.tagsForForm
      }));
      this.router.navigate(['preview-a-post']);
    }


}
