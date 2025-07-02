// Blockchain.js
class Bloque {
  constructor(indice, timestamp, datos, hashAnterior = '') {
    this.indice = indice;
    this.timestamp = timestamp;
    this.datos = datos; // Por ejemplo: { tipo: 'retiro', monto: 50 }
    this.hashAnterior = hashAnterior;
    this.hash = this.calcularHash();
  }

  calcularHash() {
    return CryptoJS.SHA256(this.indice + this.timestamp + JSON.stringify(this.datos) + this.hashAnterior).toString();
  }
}

class Blockchain {
  constructor() {
    this.cadena = [this.crearBloqueGenesis()];
  }

  crearBloqueGenesis() {
    return new Bloque(0, new Date().toLocaleString(), "Bloque Génesis", "0");
  }

  obtenerUltimoBloque() {
    return this.cadena[this.cadena.length - 1];
  }

  agregarBloque(nuevoBloque) {
    nuevoBloque.hashAnterior = this.obtenerUltimoBloque().hash;
    nuevoBloque.hash = nuevoBloque.calcularHash();
    this.cadena.push(nuevoBloque);
  }

  esValida() {
    for (let i = 1; i < this.cadena.length; i++) {
      const actual = this.cadena[i];
      const anterior = this.cadena[i - 1];
      if (actual.hash !== actual.calcularHash()) return false;
      if (actual.hashAnterior !== anterior.hash) return false;
    }
    return true;
  }
}
