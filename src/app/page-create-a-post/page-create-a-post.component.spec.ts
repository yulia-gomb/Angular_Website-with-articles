import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreateAPostComponent } from './page-create-a-post.component';

describe('PageCreateAPostComponent', () => {
  let component: PageCreateAPostComponent;
  let fixture: ComponentFixture<PageCreateAPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCreateAPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreateAPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
