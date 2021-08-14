import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import {AngularFireModule, FirebaseApp} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/storage";
import {ChangeDetectorRef} from "@angular/core";


describe('ImageService', () => {
  let service: ImageService;

  let app: FirebaseApp;
  let afStorage: AngularFireStorage;
  let cdr: ChangeDetectorRef;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        ],
      providers: [
        ChangeDetectorRef
      ]
    });
    service = TestBed.inject(ImageService);

    app = TestBed.inject(FirebaseApp);
    afStorage = TestBed.inject(AngularFireStorage);
    cdr = TestBed.inject(ChangeDetectorRef);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should exist', () => {
    expect(afStorage instanceof AngularFireStorage).toBe(true);
  });

  it('should have the Firebase storage instance', () => {
    expect(afStorage.storage).toBeDefined();
  });

  it('should have an initialized Firebase app', () => {
    expect(afStorage.storage.app).toBeDefined();
  });


});






