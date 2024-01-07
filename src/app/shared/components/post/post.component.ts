import { Component, Input } from '@angular/core';
import { Post } from '../../../admin/shared/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post: Post = <Post>{}
}
