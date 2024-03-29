import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FbCreateResponse, Post } from '../admin/shared/interfaces';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post).pipe(
      map((response: FbCreateResponse) => {
        return { ...post, id: response.name, date: new Date(post.date) };
      })
    );
  }

  

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`).pipe(
      map((post: Post) => {
        return { ...post, id, date: new Date(post.date) };
      })
    );
  }

  remove(id: string | null | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<any>(`${environment.fbDbUrl}/posts/${post.id}.json`, post).pipe(
      map((response: FbCreateResponse) => {
        return { ...post, id: response.name, date: new Date(post.date) };
      })
    );
  }
}
