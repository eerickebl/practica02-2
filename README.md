# Práctica 02.2 · Inventario de productos

Aplicación Angular para registrar, consultar, editar y eliminar productos en Cloud Firestore. La tabla escucha cambios confirmados por el servidor y conserva el identificador de cada fila. El formulario permite editar en el mismo documento y pide confirmación antes de eliminar.

**URL pública de Vercel** — Pendiente. Después del despliegue, reemplaza esta frase por tu enlace de producción.

**Repositorio público** — Pendiente. Reemplaza esta frase por la URL de tu repositorio.

## Fase 1 · Preparar Windows

1. Instala Node.js de la rama 22, versión 22.12 o posterior dentro de esa rama, Git para Windows y un editor como Visual Studio Code. Cierra y vuelve a abrir la terminal después de instalar.
2. Extrae el ZIP. Abre en VS Code la carpeta que contiene directamente `package.json`, `angular.json` y este README.
3. Abre Terminal → Nueva terminal. Ejecuta cada línea por separado. En Windows, `npm.cmd` también funciona cuando PowerShell bloquea `npm.ps1`.

```powershell
node -v
git --version
npm.cmd install
npm.cmd test
```

Deben pasar 17 pruebas. Conserva el archivo `package-lock.json` que genera la instalación y súbelo con el código. En instalaciones posteriores puedes usar `npm.cmd ci`.

## Fase 2 · Crear Firebase y registrar la aplicación web

1. Entra en [Firebase Console](https://console.firebase.google.com/) con Google. Pulsa **Crear un proyecto**. Usa como nombre visible **practica02-2-erick**. Acepta el identificador único que Firebase proponga, aunque agregue un sufijo. Google Analytics es opcional para esta práctica.
2. En la página principal del proyecto, elige **Agregar app → Web** (icono `</>`). Usa el apodo **inventario-web** y pulsa **Registrar app**. El alojamiento de este proyecto será Vercel.
3. En el ejemplo del SDK, ubica `const firebaseConfig = { ... };`. Copia ese objeto completo. En VS Code abre `src/app/firebase.config.ts` y sustituye la declaración que tiene valores vacíos por la tuya. Guarda con Ctrl+S. Las importaciones y la función inferior ya inicializan Firebase. Puedes volver a consultar los valores en Configuración del proyecto → General → Tus apps → Configuración del SDK.
4. En **Authentication → Comenzar → Método de acceso**, activa **Anónimo** y guarda. Cada visitante recibe una sesión automática y puede trabajar en el inventario compartido.
5. En **Firestore Database → Crear base de datos**, elige edición **Standard**, identificador **(default)**, una región disponible cercana y modo de producción si aparece esa opción. Confirma la creación.
6. Abre la pestaña **Reglas** de esa base. Reemplaza el contenido del editor con el archivo completo `firestore.rules` y pulsa **Publicar**. Estas reglas permiten a los visitantes autenticados por la app leer y modificar la colección académica compartida. Usa datos de práctica. Las reglas comprueban los campos y los tipos de los documentos.
7. La app crea la colección `productos` en la primera escritura. Utiliza únicamente la configuración del SDK web en el repositorio público. Las cuentas de servicio, claves privadas y tokens personales deben quedar fuera.

## Fase 3 · Ejecutar localmente

1. Desde la carpeta del proyecto ejecuta `npm.cmd run build`. Al terminar comprueba que existe `dist/inventario/browser/index.html`.
2. Ejecuta `npm.cmd start` y deja abierta esa terminal. Abre **http://localhost:4200**. Al conectar por primera vez con una base vacía verás **No hay productos registrados** y se habilitará el formulario.
3. Crea **Mouse USB**, categoría **Accesorios**, precio **12.50**, stock **4**. Comprueba la fila y recarga con Ctrl+R. En Firebase → Firestore Database → Datos abre `productos` y anota el ID del documento. Edita el stock a **7** y vuelve a revisar el mismo ID. Puedes dejar ese producto como ejemplo para el docente.
4. En una segunda terminal, sin cerrar Angular, ejecuta la prueba de navegador de la fase 6 para verificar localmente el ciclo completo.

## Fase 4 · Publicar el código en GitHub

1. En [GitHub](https://github.com/new), crea el repositorio **practica02-2**, selecciona **Public** y créalo vacío. Ya tienes el README y el .gitignore.
2. En una terminal de VS Code, desde la carpeta del proyecto, ejecuta estas líneas. En la URL sustituye TU-USUARIO por tu usuario real. Si Git solicita identidad para el primer commit, configura `git config user.name "Tu nombre"` y `git config user.email "Tu correo de GitHub"` en esta carpeta y repite el commit.
   
```powershell
git init
git add .
git status
git commit -m "Implementa el CRUD de productos con Angular y Firestore"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/practica02-2.git
git push -u origin main
```

3. Completa el inicio de sesión si Git lo pide. En GitHub abre el repositorio y verifica que en la portada se vean README.md, package.json, package-lock.json, firestore.rules, src y vercel.json. El repositorio contiene los archivos extraídos, no el ZIP.

## Fase 5 · Desplegar en Vercel

1. Entra en [Vercel](https://vercel.com/) con GitHub. Selecciona **Add New → Project**. Autoriza acceso al repositorio **practica02-2** e impórtalo.
2. Usa **practica02-2-erick** como nombre en Vercel, o añade un sufijo si ya está ocupado. Comprueba estos valores en la configuración de importación:

| Ajuste | Valor |
|---|---|
| Framework Preset | Angular |
| Root Directory | Raíz del repositorio, donde está package.json |
| Node.js Version | 22.x |
| Build Command | npm run build |
| Output Directory | dist/inventario/browser |
| Install Command | Automático |

3. Pulsa **Deploy**. Al aparecer **Ready**, abre el dominio de producción indicado en el proyecto. La configuración web de Firebase ya está en el archivo del código. En Firebase → Authentication → Configuración → Dominios autorizados, puedes añadir el dominio de producción si Firebase indica que el dominio no está autorizado. Escribe solo el host, sin https ni barras.
4. Abre ese enlace en una ventana de incógnito. Debe mostrar los productos y habilitar el formulario. Si pide iniciar sesión en Vercel, revisa **Deployment Protection** y elige el dominio público de producción.
5. Sustituye los dos pendientes al principio de este README por los enlaces reales. Desde la carpeta del proyecto:

```powershell
git add README.md
git commit -m "Documenta los enlaces de entrega"
git push
```

## Fase 6 · Verificar el puntaje desde el dominio público

Para lanzar la prueba automática en Windows, ejecuta desde la carpeta del proyecto:

```powershell
npx.cmd playwright install chromium
$env:APP_URL = "https://TU-DOMINIO-REAL.vercel.app"
npm.cmd run test:e2e
```

Para probar contra Angular local sustituye el valor de APP_URL por `http://localhost:4200` y mantén el servidor local abierto. La prueba usa un producto con nombre único, comprueba los cuatro errores de validación y ejecuta creación, lectura, edición, cancelación y eliminación con recargas. Al finalizar con éxito elimina el producto de prueba. Si falla a mitad del recorrido, puede quedar una fila cuyo nombre empieza por «Prueba». El resultado esperado es **1 passed**.

| Rúbrica | Comprobación manual en la URL pública | Evidencia esperada |
|---|---|---|
| CRUD · 2,00 | Crea «Cable USB», categoría «Accesorios», precio 5.75 y stock 3. Consulta, edita el stock a 8 y elimina al final. | Cuatro operaciones correctas. Al editar, Firestore mantiene el ID original. |
| Tabla y persistencia · 1,00 | Tras crear, editar y eliminar, observa primero la tabla y luego recarga. | La fila aparece, cambia y desaparece de inmediato al confirmarse cada escritura. El resultado permanece tras las tres recargas. |
| Firebase y servicio · 0,75 | Revisa la colección en la consola y abre src/app/firebase.config.ts y src/app/producto.service.ts en GitHub. | Configuración central y cuatro operaciones en ProductoService. |
| Validación y mensajes · 0,50 | Intenta crear con nombre de espacios, categoría vacía, precio -1 y stock 1.5. Luego prueba precio y stock 0. Al eliminar, cancela primero y recarga antes de confirmar. | Cuatro mensajes y ninguna escritura inválida. Los ceros se aceptan. Cancelar conserva la fila. Una colección vacía muestra su mensaje. |
| Publicación · 0,75 | Abre GitHub y Vercel en incógnito. Revisa el README y repite el CRUD sobre producción. | Ambos enlaces públicos y funcionales. |

**Probar el mensaje de error sin cambiar las reglas públicas.** Solo en la copia local, guarda temporalmente el valor de projectId, déjalo vacío y recarga localhost. La app mostrará un mensaje de operación fallida. Restablece el valor antes de guardar cambios en Git. Para comprobar el estado vacío sin borrar datos ajenos, obsérvalo al iniciar la práctica, antes del primer registro.

## Modelo y estructura

| Campo | Tipo | Uso |
|---|---|---|
| id | string | Identificador generado por Firestore y recuperado al consultar. Se usa para actualizar y eliminar. |
| nombre | string | Texto obligatorio, limpio de espacios exteriores. |
| precio | number | Número finito mayor o igual a cero, en USD. |
| stock | number | Entero seguro mayor o igual a cero. |
| categoria | string | Texto obligatorio, limpio de espacios exteriores. |

- `src/app/producto.ts` define el modelo y las validaciones compartidas con las pruebas.
- `src/app/firebase.config.ts` inicializa Firebase, la sesión anónima y Firestore.
- `src/app/producto.service.ts` concentra crear, consultar en tiempo real, actualizar y eliminar.
- `src/app/app.component.*` contiene el formulario y la tabla.
- `tests/` y `pruebas-web/` contienen las pruebas de validación y navegador, respectivamente.

## Si aparece un problema

| Síntoma | Qué revisar |
|---|---|
| La aplicación pide completar firebaseConfig | Guarda los datos reales de la app web. Si ya publicaste, sube la corrección a GitHub y espera el nuevo despliegue. |
| auth/operation-not-allowed o auth/admin-restricted-operation | Habilita el proveedor Anónimo en Authentication del mismo proyecto. |
| Missing or insufficient permissions | Verifica que publicaste firestore.rules en la base (default) del mismo projectId y que Anónimo está habilitado. |
| No aparece la base o aparece not-found | Crea Cloud Firestore en modo nativo, edición Standard, con el identificador (default). |
| Vercel no encuentra index.html | Revisa Root Directory, el registro del build y la carpeta dist/inventario/browser. |
| npm no encuentra package.json | Abre la carpeta extraída que contiene ese archivo y vuelve a ejecutar el comando. |

## Entrega en AVAC

Pega únicamente la URL pública de producción de Vercel y la URL pública del repositorio GitHub. El ZIP sirve para preparar el proyecto y conservar una copia.

## Documentación oficial

[Configuración web de Firebase](https://firebase.google.com/docs/web/setup) · [Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart) · [Autenticación anónima](https://firebase.google.com/docs/auth/web/anonymous-auth) · [Angular](https://angular.dev/) · [Despliegues en Vercel](https://vercel.com/docs/deployments)

