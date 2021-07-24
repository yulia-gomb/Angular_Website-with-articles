import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticleBlockComponent } from './new-article-block.component';

describe('NewArticleBlockComponent', () => {
  let component: NewArticleBlockComponent;
  let fixture: ComponentFixture<NewArticleBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewArticleBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArticleBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
