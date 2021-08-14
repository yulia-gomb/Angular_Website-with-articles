import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AppRoutingModule} from "../app-routing.module";
import {FooterComponent} from "../Common/footer/footer.component";
import {FirebaseService} from "../Services/firebase.service";
import {EMPTY, of} from "rxjs";

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let service: FirebaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AppRoutingModule
      ],
      declarations: [
        MainPageComponent,
        FooterComponent
      ],
      providers: [
        FirebaseService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


    service = TestBed.inject(FirebaseService)
    component = new MainPageComponent(service)

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Firebase method getTags() when the component initializes', () => {
    const spy = spyOn(service, 'getTags').and.callFake( () => {
      return EMPTY;
      })
      component.ngOnInit()
      expect(spy).toHaveBeenCalled();
  });

  it('should get tags from Firebase when the component initializes', () => {
    const tags = ['angular','java'];
    spyOn(service, 'getTags').and.returnValue(of(tags))
    component.ngOnInit()
    expect(component.tags?.length).toBe(tags?.length);
  });

  it('should call Firebase method getArticles() when the component initializes', () => {
    const spy = spyOn(service, 'getArticles').and.callFake( () => {
      return EMPTY;
    })
    component.ngOnInit()
    expect(spy).toHaveBeenCalled();
  });


});
