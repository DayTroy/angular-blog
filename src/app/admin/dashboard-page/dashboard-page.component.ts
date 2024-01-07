import { PostsService } from './../../shared/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Post } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})

export class DashboardPageComponent implements OnInit, OnDestroy{

  posts: Post[] = []

  pSub: Subscription = new Subscription()
  dSub: Subscription = new Subscription()
  searchStr = ''

  constructor(private postsService:PostsService, private alert: AlertService){}
  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string | null | undefined) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Пост был удален')
    })
  }

  ngOnDestroy() {
    if (this.pSub) this.pSub.unsubscribe()
    if (this.dSub) this.dSub.unsubscribe()
  }
}
