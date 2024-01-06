import { PostsService } from './../../shared/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Post } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})

export class DashboardPageComponent implements OnInit, OnDestroy{

  posts: Post[] = []

  pSub: Subscription = new Subscription()

  constructor(private postsService:PostsService, ){}
  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string | undefined | null) {
    
  }

  ngOnDestroy() {
    if (this.pSub) this.pSub.unsubscribe()
  }
}
