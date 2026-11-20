import { Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from './producto.service';
import { datosValidos, formularioVacio, Producto, validar } from './producto';

@Component({selector: 'app-root', standalone: true, imports: [FormsModule], templateUrl: './app.component.html'})
export class AppComponent implements OnInit, OnDestroy {
  private servicio = inject(ProductoService);
  private zona = inject(NgZone);
  private cancelar?: () => void;
  private destruido = false;
  filas: Producto[] = [];
  form = formularioVacio();
  seleccionado: string | null = null;
  listo = false;
  ocupado = false;
  intento = false;
  error = '';
  mensaje = '';
  get errores() { return validar(this.form); }

  async ngOnInit() {
    try {
      const cancelar = await this.servicio.consultar(filas => this.zona.run(() => {
        this.filas = filas;
        this.listo = true;
      }), e => this.zona.run(() => { this.listo = false; this.fallo(e); }));
      if (this.destruido) cancelar();
      else this.cancelar = cancelar;
    } catch (e) { this.fallo(e); }
  }
  ngOnDestroy() { this.destruido = true; this.cancelar?.(); }
  private fallo(e: unknown) {
    this.error = 'Operación fallida. ' + (e instanceof Error ? e.message : 'Comprueba la conexión.');
    this.mensaje = '';
  }
  limpiar() { this.seleccionado = null; this.form = formularioVacio(); this.intento = false; }
  editar(p: Producto) {
    this.form = {...p}; this.seleccionado = p.id; this.intento = false;
    this.mensaje = ''; this.error = '';
    document.getElementById('nombre')?.focus();
  }
  async guardar() {
    this.intento = true;
    this.error = ''; this.mensaje = '';
    if (this.ocupado || !this.listo || Object.keys(this.errores).length) return;
    this.ocupado = true;
    try {
      const datos = datosValidos(this.form);
      if (this.seleccionado) {
        await this.servicio.actualizar(this.seleccionado, datos);
        this.mensaje = 'Producto actualizado.';
      } else {
        await this.servicio.crear(datos);
        this.mensaje = 'Producto creado.';
      }
      this.limpiar();
    } catch (e) { this.fallo(e); }
    finally { this.ocupado = false; }
  }
  async eliminar(p: Producto) {
    if (this.ocupado || !this.listo || !window.confirm('¿Eliminar «' + p.nombre + '» del inventario?')) return;
    this.ocupado = true; this.error = ''; this.mensaje = '';
    try {
      await this.servicio.eliminar(p.id);
      if (this.seleccionado === p.id) this.limpiar();
      this.mensaje = 'Producto eliminado.';
    } catch (e) { this.fallo(e); }
    finally { this.ocupado = false; }
  }
}
