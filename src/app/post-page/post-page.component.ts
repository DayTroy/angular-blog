import { PostsService } from './../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import {switchMap} from 'rxjs/operators'
import { Post } from '../admin/shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent implements OnInit{
  post$: Observable<Post> = new Observable<Post>()
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}
  ngOnInit(){
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      }))
  }
}
