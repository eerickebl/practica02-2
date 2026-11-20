import test from 'node:test';
import assert from 'node:assert/strict';
import {datosValidos, validar, formularioVacio} from '../src/app/producto.ts';

const base = {nombre:'  Teclado  ', categoria:'  Accesorios ', precio:14.95, stock:3};
for (const [campo, valor] of [
  ['nombre',''], ['nombre','   '], ['categoria',''], ['categoria','  '],
  ['precio',null], ['precio',-1], ['precio',NaN], ['precio',Infinity], ['precio','a'],
  ['stock',null], ['stock',-1], ['stock',1.5], ['stock',Infinity], ['stock','3']
]) {
  test('Rechaza '+campo+' = '+JSON.stringify(valor)+' ('+String(valor)+')', () => {
    const f = {...base,[campo]:valor};
    assert.ok(validar(f)[campo]); assert.throws(() => datosValidos(f));
  });
}
test('Un formulario vacío tiene cuatro errores', () => assert.equal(Object.keys(validar(formularioVacio())).length,4));
test('Acepta precio decimal, limpia espacios y omite el ID de los campos', () =>
  assert.deepEqual(datosValidos({...base,id:'x'}),{nombre:'Teclado',categoria:'Accesorios',precio:14.95,stock:3}));
test('Acepta stock y precio cero', () => assert.deepEqual(validar({...base,stock:0,precio:0}),{}));
