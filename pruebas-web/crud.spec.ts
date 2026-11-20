import { expect, test } from '@playwright/test';

test('validaciones y CRUD con recargas sobre Firestore', async ({page}) => {
  const nombre = 'Prueba ' + crypto.randomUUID();
  const fila = page.getByRole('row').filter({hasText:nombre});
  const crear = page.getByRole('button',{name:'Crear producto'});
  const listo = async () => { await expect(crear).toBeEnabled(); };
  await page.goto('/'); await listo();
  await page.getByLabel('Precio (USD)').fill('-1');
  await page.getByLabel('Stock',{exact:true}).fill('1.5');
  await crear.click();
  for (const error of ['Escribe el nombre.','Escribe la categoría.','Ingresa un precio numérico mayor o igual a cero.','Ingresa un stock entero mayor o igual a cero.'])
    await expect(page.getByText(error,{exact:true})).toBeVisible();
  await page.getByLabel('Nombre',{exact:true}).fill(nombre);
  await page.getByLabel('Categoría',{exact:true}).fill('Pruebas');
  await page.getByLabel('Precio (USD)').fill('12.5');
  await page.getByLabel('Stock',{exact:true}).fill('3');
  await crear.click(); await expect(fila).toBeVisible();
  await page.reload(); await expect(fila.getByRole('cell',{name:'12.5',exact:true})).toBeVisible();
  await fila.getByRole('button',{name:'Editar'}).click();
  await expect(page.getByLabel('Nombre',{exact:true})).toHaveValue(nombre);
  await page.getByLabel('Stock',{exact:true}).fill('7');
  await page.getByRole('button',{name:'Guardar cambios'}).click();
  await expect(fila.getByRole('cell',{name:'7',exact:true})).toBeVisible();
  await page.reload(); await expect(fila.getByRole('cell',{name:'7',exact:true})).toBeVisible();
  page.once('dialog', d => d.dismiss());
  await fila.getByRole('button',{name:'Eliminar'}).click();
  await page.reload(); await expect(fila).toBeVisible();
  page.once('dialog', d => d.accept());
  await fila.getByRole('button',{name:'Eliminar'}).click();
  await expect(page.getByText('Producto eliminado.',{exact:true})).toBeVisible();
  await expect(fila).toHaveCount(0);
  await page.reload(); await listo(); await expect(fila).toHaveCount(0);
});
