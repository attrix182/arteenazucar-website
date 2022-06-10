import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public loadedImage: any;

  public fotoCargada: any;
  public foto: any;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;


  constructor(private cloudFireStore: AngularFirestore, private storage: AngularFireStorage) {}

  Insert(collectionName: string, data: any) {
    data.id = this.cloudFireStore.createId();
    return this.cloudFireStore.collection(collectionName).doc(data.id).set(data);
  }

  ReturnFirestore() {
    return this.cloudFireStore;
  }

  InsertCustomID(collectionName: string, idCustom: any, data: any) {
    return this.cloudFireStore.collection(collectionName).doc(idCustom).set(data);
  }

  GetAll(collectionName: string) {
    return this.cloudFireStore
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          })
        )
      );
  }
  GetByParameter(collection: string, parametro: string, value: any) {
    return this.cloudFireStore.collection<any>(collection, (ref) => ref.where(parametro, '==', value));
  }

  Update(id: string, collectionName: string, data: any) {
    return this.cloudFireStore
      .collection(collectionName)
      .doc(id)
      .update({ ...data });
  }

  DeleteColecction(collectionName: string): any {
    return this.cloudFireStore
      .collection(collectionName)
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  }

  Delete(collectionName: string, id: string) {
    return this.cloudFireStore.collection(collectionName).doc(id).delete();
  }

  InsertWithImage(collectionName: string, post: any) {

    post.id = this.cloudFireStore.createId();

    if (post.image) {
      const filePath = `/products/${post.id}/image.jpeg`;
      const ref = this.storage
        .ref(filePath)
        .putString(post.image, 'base64', { contentType: 'image/jpeg' })
        .then(() => {
          let storages = firebase.default.storage();
          let storageRef = storages.ref();
          let spaceRef = storageRef.child(filePath);

          spaceRef.getDownloadURL().then((url) => {
            this.fotoCargada = url;
            this.fotoCargada = `${this.fotoCargada}`;

            post.image = this.fotoCargada;

            return this.InsertCustomID(collectionName, post.id, post);
          });
        });
    }
  }
}
