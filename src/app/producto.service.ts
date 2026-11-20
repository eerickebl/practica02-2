import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { obtenerFirestore } from './firebase.config';
import { DatosProducto, Producto } from './producto';

@Injectable({providedIn: 'root'})
export class ProductoService {
  private async productos() { return collection(await obtenerFirestore(), 'productos'); }

  async consultar(recibir: (filas: Producto[]) => void, fallo: (e: Error) => void) {
    return onSnapshot(await this.productos(), {includeMetadataChanges: true}, snapshot => {
      if (snapshot.metadata.fromCache || snapshot.metadata.hasPendingWrites) return;
      recibir(snapshot.docs.map(d => ({...(d.data() as DatosProducto), id: d.id}))
        .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')));
    }, fallo);
  }
  async crear(datos: DatosProducto) { await addDoc(await this.productos(), datos); }
  async actualizar(id: string, datos: DatosProducto) {
    await updateDoc(doc(await this.productos(), id), {...datos});
  }
  async eliminar(id: string) { await deleteDoc(doc(await this.productos(), id)); }
}
