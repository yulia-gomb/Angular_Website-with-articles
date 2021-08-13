import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ImageSnippet, PageCreateAPostComponent} from './page-create-a-post.component';
import {FirebaseService} from "../Services/firebase.service";
import {ImageService} from "../Services/image.service";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import { AngularFireDatabaseModule} from "@angular/fire/database";
import {StoreModule} from "@ngrx/store";
import * as fromReducer from "../Store/sending.reducer";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AppRoutingModule} from "../app-routing.module";
import {AbstractControl, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "../Common/header/header.component";
import {FooterComponent} from "../Common/footer/footer.component";

describe('PageCreateAPostComponent', () => {
  let component: PageCreateAPostComponent;
  let fixture: ComponentFixture<PageCreateAPostComponent>;
  let serviceFB: FirebaseService;
  let serviceImgFB: ImageService;
  let control: AbstractControl | null;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        StoreModule.forRoot( {sending: fromReducer.reducer}),
        AppRoutingModule,
        ReactiveFormsModule
      ],
      declarations: [
        PageCreateAPostComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        FirebaseService,
        ImageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreateAPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serviceFB = TestBed.inject(FirebaseService);
    serviceImgFB = TestBed.inject(ImageService);
    control = component.myForm.get('title');
  });

  it('should create Create-a-post Component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 3 controls', () => {
    expect(component.myForm.contains('title')).toBeTruthy();
    expect(component.myForm.contains('subtitles')).toBeTruthy();
    expect(component.myForm.contains('text')).toBeTruthy();
  });

  it('should validate required field Title if it is empty', () => {
    const value = '';
    control?.setValue(value);
    expect(control?.valid).toBeFalsy();
  });

  it('should validate field Title if it has value less than 5 characters', () => {
    const value = 'Web';
    control?.setValue(value);
    expect(control?.invalid).toBeTruthy();
  });

  it('should validate field Title if it has value more than 200 characters', () => {
    const value = 'Build features quickly with simple, declarative templates. Extend the template language with your own components and use a wide array of existing components. Get immediate Angular-specific help and feedback with nearly every IDE and editor. All this comes together so you can focus on building amazing apps rather than trying to make the code work.';
    control?.setValue(value);
    expect(control?.invalid).toBeTruthy();
  });

  it('should contain button "Add new block"', () => {
    const buttonEl: HTMLButtonElement = fixture.nativeElement;
    const button = buttonEl.querySelector('button')!;
    expect(button.textContent).toContain('Add');
  })

});

describe('ImageSnippet Class', () => {

  let imageClass = ImageSnippet;

  it('should create ImageSnippet Class', () => {
    expect(imageClass).toBeTruthy();
  })
})
