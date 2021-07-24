import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-create-a-post',
  templateUrl: './page-create-a-post.component.html',
  styleUrls: ['./page-create-a-post.component.css']
})
export class PageCreateAPostComponent implements OnInit {

  public items: any = ['']

  public addNewBlock(e: Event) {
    e.preventDefault();
    console.log(e)
    this.items = [...this.items, this.items.length]
  }

  constructor() { }

  ngOnInit(): void {
  }


}
