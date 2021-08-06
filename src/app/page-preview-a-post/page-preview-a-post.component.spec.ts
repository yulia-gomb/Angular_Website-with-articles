import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePreviewAPostComponent } from './page-preview-a-post.component';

describe('PagePreviewAPostComponent', () => {
  let component: PagePreviewAPostComponent;
  let fixture: ComponentFixture<PagePreviewAPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePreviewAPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePreviewAPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
