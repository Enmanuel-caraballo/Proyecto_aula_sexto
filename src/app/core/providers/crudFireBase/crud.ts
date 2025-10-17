import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { IUserCreate } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class Crud {

  constructor(private readonly fireSt: Firestore){}

  async create(collectionName: string, data: any, uid:string){
    try {
      const docRef = doc(this.fireSt, collectionName, uid);
      await setDoc(docRef, data);
      console.log("Documento con", uid);

      // const reference = collection(this.fireSt, collectionName);
      // const res = await addDoc(reference, data);
      // console.log(res.toJSON());

    } catch (error) {
      throw error;
    }
  }

 async getById(collectionName: string, id: string){
  try {
    const ref = collection(this.fireSt, collectionName);
    const q = query(ref, where("uid", "==", id));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn("No existe documento con esa uid");
      return null;
    }

    return snapshot.docs.map(doc =>({
      id: doc.id,
      ...(doc.data() as IUserCreate)
    }));
  } catch (error) {
    console.log("Error en getById",error);
    return;
  }
 }

 async modify(collectionName: string, uid: string, data: any){
  try {
    const ref = doc(this.fireSt, collectionName, uid);
    await updateDoc(ref, data);
  } catch (error) {
    console.log("Error al modificar", error);
  }
 }

 async delete(collectionName:string, uid: string){
  try {
        const reference = doc(this.fireSt, collectionName, uid);
        const deleteSucces = await deleteDoc(reference);
        if (deleteSucces != null) {
          console.log('Delete ok');
        }
  } catch (error) {
    throw error;
  }
 }


}

