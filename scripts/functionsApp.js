$(document).ready(function () {

    //Función para calcular el mes y año actual
    var fechaActual = new Date();
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    var mesActual = meses[fechaActual.getMonth()];
    var anioActual = fechaActual.getFullYear();
    document.getElementById("tituloPresupuesto").innerHTML = "Presupuesto de " + mesActual + " " + anioActual;

    //Inicializamos la pantalla
    document.getElementById('ganancia').textContent = '$0.00';
    document.getElementById('ingresos').textContent = 'INGRESOS: $0.00';
    document.getElementById('egresos').textContent = 'EGRESOS: $0.00';

    // Variables para almacenar los ingresos y egresos
    let ingresos = [];
    let egresos = [];

    // Función para calcular el monto total disponible
    function calcularMontoTotal() {
        const totalIngresos = ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
        const totalEgresos = egresos.reduce((total, egreso) => total + egreso.monto, 0);
        return totalIngresos - totalEgresos;
    }

    // Función para calcular el porcentaje de gastos
    function calcularPorcentajeGastos() {
        const totalEgresos = egresos.reduce((total, egreso) => total + egreso.monto, 0);
        const porcentajeGastos = (totalEgresos * 100) / ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
        return porcentajeGastos.toFixed(2);
    }

    // Función para actualizar los cuadros de ingresos y egresos
    function actualizarCuadros() {
        const totalIngresos = ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
        const totalEgresos = egresos.reduce((total, egreso) => total + egreso.monto, 0);
        document.getElementById('ganancia').textContent = "$"+(totalIngresos-totalEgresos);
        document.getElementById('ingresos').textContent = "INGRESOS: $"+totalIngresos.toFixed(2);
        document.getElementById('egresos').textContent = "EGRESOS: $"+totalEgresos.toFixed(2);
        document.getElementById('porcentajeGastos').textContent = `Porcentaje de gastos: ${calcularPorcentajeGastos()}%`;
    }

    // Función para agregar una nueva transacción
    function agregarTransaccion(event) {
    event.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const descripcion = document.getElementById('descripcion').value;
        const monto = parseFloat(document.getElementById('monto').value);
        const transaccion = { tipo, descripcion, monto };

        if (tipo === 'ingreso') {
            ingresos.push(transaccion);
            const listaIngresos = document.getElementById('listaIngresos');
            const li = document.createElement('li');
            li.textContent = `${descripcion}: $${monto.toFixed(2)}`;
            listaIngresos.appendChild(li);
        } else {
            egresos.push(transaccion);
            const listaEgresos = document.getElementById('listaEgresos');
            const li = document.createElement('li');
            li.textContent = `${descripcion}: $${monto.toFixed(2)} (${(monto * 100 / calcularMontoTotal()).toFixed(2)}%)`;
            listaEgresos.appendChild(li);
        }

        actualizarCuadros();
        document.getElementById('formulario').reset();
    }

    // Evento para agregar una nueva transacción
    document.getElementById('formulario').addEventListener('submit', agregarTransaccion);

});