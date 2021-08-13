import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogInComponent } from './page-log-in.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AppRoutingModule} from "../app-routing.module";

describe('PageLogInComponent', () => {
  let component: PageLogInComponent;
  let fixture: ComponentFixture<PageLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        ],
      declarations: [ PageLogInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
