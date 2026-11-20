# Práctica 02.2 | Inventario de productos

En esta práctica de Programación y Plataformas Web hice un inventario con Angular y Cloud Firestore. Desde el formulario puedo registrar un producto o editar los datos de uno que ya está en la tabla. Para eliminarlo, la aplicación pide confirmación.

**Aplicación en Vercel:** pendiente de publicación.

## Cómo funciona

Cada documento de la colección `productos` tiene cuatro campos: `nombre` y `categoria` son textos obligatorios, `precio` admite decimales y `stock` debe ser entero. Tanto el precio como el stock pueden valer cero.

Las cuatro operaciones están en `src/app/producto.service.ts`. Al consultar los productos se recupera el ID de cada documento. Así, si cambio el stock desde el formulario, se actualiza el mismo producto. La tabla escucha los cambios de Firestore y al recargar vuelve a consultar la colección.

## Configuración de Firebase

1. Registra una aplicación web en Firebase y copia su objeto `firebaseConfig` en `src/app/firebase.config.ts`.
2. En Authentication activa el método **Anónimo** para que se pueda usar el formulario sin crear una cuenta.
3. Crea la base de Cloud Firestore con el identificador `(default)`. En la pestaña **Reglas** pega el contenido de `firestore.rules` y publícalo. La colección `productos` se crea al guardar el primer registro.

## Ejecución local

Usa Node.js 22.12 o una versión posterior de la rama 22. Desde la carpeta donde está `package.json`, ejecuta:

```sh
npm ci
npm start
```

Abre **http://localhost:4200**. En Windows también puedes escribir `npm.cmd` en lugar de `npm` si usas PowerShell.

## Pruebas y despliegue

Con `npm test` se revisan las validaciones del formulario. Para comprobar la persistencia, registra un producto, recarga la página y cambia su stock. Recarga otra vez para comprobar el valor. Al probar la eliminación, cancela primero para verificar que la fila sigue en la tabla y después confirma para eliminarla.

Para publicar en Vercel, importa el repositorio como proyecto Angular. El comando de compilación es `npm run build` y la carpeta de salida es `dist/inventario/browser`.

