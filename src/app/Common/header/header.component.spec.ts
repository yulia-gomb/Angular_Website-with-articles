import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AppRoutingModule} from "../../app-routing.module";
import {By} from "@angular/platform-browser";


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
