// app.js
class Cliente {
  constructor(id, nombre, apellido, dni, correo, password) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.correo = correo;
    this.password = password;
  }
}

class Cuenta {
  constructor(codigo, saldoInicial, clienteId) {
    this.codigo = codigo;
    this.saldo = saldoInicial;
    this.clienteId = clienteId;
    this.movimientos = [];
  }

  agregarMovimiento(tipo, monto) {
    if (tipo === 'retiro' && this.saldo < monto) {
      alert('Fondos insuficientes');
      return;
    }
    if (tipo === 'retiro') this.saldo -= monto;
    else this.saldo += monto;
    this.movimientos.push({ tipo, monto, fecha: new Date().toLocaleString() });
  }
}

const clientes = [];
const cuentas = [];

function crearCliente() {
  const id = clientes.length + 1;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const dni = document.getElementById('dni').value;
  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;
  const cliente = new Cliente(id, nombre, apellido, dni, correo, password);
  clientes.push(cliente);
  alert('Cliente registrado con ID: ' + id);
}

function crearCuenta() {
  const clienteId = parseInt(document.getElementById('clienteIdCuenta').value);
  const saldoInicial = parseFloat(document.getElementById('saldoInicial').value);
  const codigo = 'C' + (cuentas.length + 1);
  const cuenta = new Cuenta(codigo, saldoInicial, clienteId);
  cuentas.push(cuenta);
  alert('Cuenta creada con código: ' + codigo);
}

function realizarMovimiento() {
  const codigo = document.getElementById('codigoCuenta').value;
  const tipo = document.getElementById('tipoMovimiento').value;
  const monto = parseFloat(document.getElementById('monto').value);
  const cuenta = cuentas.find(c => c.codigo === codigo);
  if (cuenta) {
    cuenta.agregarMovimiento(tipo, monto);
    alert('Movimiento registrado. Nuevo saldo: $' + cuenta.saldo);
  } else {
    alert('Cuenta no encontrada.');
  }
}

function consultarSaldo() {
  const codigo = document.getElementById('consultaCuenta').value;
  const cuenta = cuentas.find(c => c.codigo === codigo);
  const resultado = document.getElementById('saldoResultado');
  if (cuenta) {
    resultado.innerText = 'Saldo actual: $' + cuenta.saldo;
  } else {
    resultado.innerText = 'Cuenta no encontrada.';
  }
}
