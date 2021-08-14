import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import {AngularFireModule, FirebaseApp} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/database";


describe('FirebaseService', () => {
  let service: FirebaseService;
  let app: FirebaseApp;
  let afdb: AngularFireDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
        ]
    });
    service = TestBed.inject(FirebaseService);
    app = TestBed.inject(FirebaseApp);
    afdb = TestBed.inject(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be an AngularFireDatabase type', () => {
     expect(afdb instanceof AngularFireDatabase).toEqual(true);
  });

  it('should have an initialized Firebase app', () => {
     expect(afdb.database.app).toBeDefined();
  });



});


