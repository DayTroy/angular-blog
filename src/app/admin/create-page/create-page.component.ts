import { AlertService } from './../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../shared/interfaces';
import { PostsService } from '../../shared/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
})
export class CreatePageComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.form.invalid) return;
    const post: Post = {
      title: this.form.value.title!,
      author: this.form.value.author!,
      text: this.form.value.text!,
      date: new Date(),
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.alert.success('Пост был создан')
    });

    console.log(post);
  }

  ngOnInit() {}
}
