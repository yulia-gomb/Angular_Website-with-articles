import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from "../Services/firebase.service";
import {ImageService} from "../Services/image.service";
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {SendingActions} from "../Store/sending.actions";
import {SendingSelectors} from "../Store/sending.selectors";


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

  tags!: string[];
  tagsForForm: string[] = [];

  selectedFile: any;
  file: any;
  imageSrc?: string = "";
  showImage: boolean = false;

  myForm: FormGroup;
  article: any;


  //checking store for form`s data
  formWasFilled?: boolean;
  title?: string;
  tagsForFormFromStore?: string[];
  imageSrcFromStore?: string;
  subtitles?: string[];
  text?: string[];

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

    this.store$.select(SendingSelectors.formWasFilled).subscribe(formWasFilled => this.formWasFilled = formWasFilled);
    this.store$.select(SendingSelectors.title).subscribe(title => this.title = title);
    this.store$.select(SendingSelectors.tags).subscribe(tags => this.tagsForFormFromStore = tags);
    this.store$.select(SendingSelectors.img).subscribe(img => this.imageSrcFromStore = img);
    this.store$.select(SendingSelectors.subtitles).subscribe(subtitles => this.subtitles = subtitles);
    this.store$.select(SendingSelectors.text).subscribe(text => this.text = text);

  }

  ngOnInit(): void {

    // getting data for page from Firebase (tags)

    this.firebaseService.getTags().subscribe(tags =>
      this.tags = tags)

    //--------filling the form with data from store

    if(this.formWasFilled){
      if(this.subtitles!==undefined){
        this.getFormsControls()['controls'].length = this.subtitles.length;

      }
      this.myForm.patchValue({
        title: this.title,
        /*subtitles: this.subtitles,
        text: this.text,*/

      });
      /*this.myForm.controls.text[](this.text[1]);*/

      if(this.tagsForFormFromStore!==undefined){this.tagsForForm = this.tagsForFormFromStore;}
        this.showImage = true;
        this.imageSrc = this.imageSrcFromStore;
    }
  }


  //button "Add new block"

  public addNewBlock(e: Event) {
    e.preventDefault();
    (<FormArray>this.myForm.controls["subtitles"]).push(new FormControl(""));
    (<FormArray>this.myForm.controls["text"]).push(new FormControl(""));
  }

  //collection of data for form (reactive)
  //***author of article
  author?: string | null = localStorage.getItem("author");
  //***date of article
  date: string = new Date().toLocaleDateString("en", {year: "numeric", day: "2-digit", month: "long"});
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
      this.showImage = true;
      this.imageSrc = this.selectedFile.src;
    });
    reader.readAsDataURL(this.file);
  }

  //------------button "Publish" (sending form`s data on server)-----------

  onSubmit(imageInput: any) {

    console.log(this.myForm.controls);

    //download image
    if(imageInput.files[0]!==undefined){
      let name = imageInput.files[0].name;
      this.imageService.uploadImage(this.file, name);
    }

    //data from Form
    this.article = {
      img: this.imageSrc,
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
    //send action to clear state and reset form
    this.store$.dispatch(SendingActions.clearState());
    this.tagsForForm = [];
    this.myForm.reset();
    this.imageSrc = '';
    this.getFormsControls()['controls'].length = 1;
  }

  //--------------button "Preview" (sending form`s data for previewing)--------------

    previewArticle() {
      this.store$.dispatch(SendingActions.sendingFormDataForPreview({
        title: this.myForm.controls.title.value,
        img: this.imageSrc,
        subtitles: this.myForm.controls.subtitles.value,
        text: this.myForm.controls.text.value,
        author: this.author,
        date: this.date,
        tags: this.tagsForForm,
      }));
      this.router.navigate(['preview-a-post']).then();
    }

}
