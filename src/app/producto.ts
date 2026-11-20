export interface DatosProducto {
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}
export interface Producto extends DatosProducto { id: string }
export interface Formulario {
  nombre: string;
  precio: number | null;
  stock: number | null;
  categoria: string;
}
export const formularioVacio = (): Formulario => ({nombre: '', precio: null, stock: null, categoria: ''});

export function validar(f: Formulario) {
  const errores: Partial<Record<keyof Formulario, string>> = {};
  if (!f.nombre.trim()) errores.nombre = 'Escribe el nombre.';
  if (!f.categoria.trim()) errores.categoria = 'Escribe la categoría.';
  if (f.precio === null || !Number.isFinite(f.precio) || f.precio < 0)
    errores.precio = 'Ingresa un precio numérico mayor o igual a cero.';
  if (f.stock === null || !Number.isSafeInteger(f.stock) || f.stock < 0)
    errores.stock = 'Ingresa un stock entero mayor o igual a cero.';
  return errores;
}
export function datosValidos(f: Formulario): DatosProducto {
  if (Object.keys(validar(f)).length) throw new Error('Revisa los campos del formulario.');
  return {nombre: f.nombre.trim(), categoria: f.categoria.trim(), precio: f.precio!, stock: f.stock!};
}
