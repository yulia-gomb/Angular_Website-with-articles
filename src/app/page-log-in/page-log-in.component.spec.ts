import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogInComponent } from './page-log-in.component';

describe('PageLogInComponent', () => {
  let component: PageLogInComponent;
  let fixture: ComponentFixture<PageLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLogInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
