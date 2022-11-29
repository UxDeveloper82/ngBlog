import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { PostI } from 'src/app/shared/models/post.interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<PostI[]>

  constructor(private afs: AngularFirestore,
     private storage: AngularFireStorage) {

  }

  public getAllPosts(): Observable<PostI[]> {
    return this.afs
       .collection('posts')
       .snapshotChanges()
       .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
            return {id, ...data};
          }))
       )
  }

  public getOnePost(id: PostI): Observable<PostI> {
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
  }
}
