import { Observable } from 'rxjs';
import { PostsService } from './../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../admin/shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  posts$: Observable<Post[]> = new Observable<Post[]>()

  constructor(private postsService: PostsService) {}
  ngOnInit() {
    this.posts$ = this.postsService.getAll()
  }
}
