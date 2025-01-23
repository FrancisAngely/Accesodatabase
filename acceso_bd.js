const select_tabla = document.getElementById("tabla");
const boton_buscar = document.getElementById("buscar");
const contenedorResultados = document.getElementById("resultados");
const tablaResultados = document.createElement("table");

boton_buscar.addEventListener("click", function (e) {
  e.preventDefault(); 
  const seleccion = select_tabla.value;

  limpiarTabla();

  if (seleccion) {
    fetch(
      `http://localhost/Accesodatabase/acceso_bd.php?tabla=${seleccion}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la respuesta de la red");
      })
      .then((datos) => {
        console.log(datos);
        if (datos.length > 0) {

          const thead = document.createElement("thead");
          const tbody = document.createElement("tbody");

          const encabezado = document.createElement("tr");
          if (seleccion === "centros") {
            encabezado.innerHTML =
              "<th>Numero</th><th>Nombre</th><th>Direccion</th>";
          } else if (seleccion === "departamentos") {
            encabezado.innerHTML =
              "<th>Numero</th><th>Centro</th><th>Director</th><th>Tipo_dir</th><th>Presupuesto</th><th>Depto_jefe</th><th>Nombre</th>";
          } else if (seleccion === "empleados") {
            encabezado.innerHTML =
              "<th>Cod</th><th>Departamento</th><th>Telefono</th><th>Fecha_nacimiento</th><th>Fecha_ingreso</th><th>Salario</th><th>Comision</th><th>Num_hijos</th><th>Nombre</th>";
          }
          thead.appendChild(encabezado);
          tablaResultados.appendChild(thead);

          datos.forEach((dato) => {
            const fila = document.createElement("tr");

            if (seleccion === "centros") {
              fila.innerHTML = `<td>${dato.Numero}</td><td>${dato.Nombre}</td><td>${dato.Direccion}</td>`;
            } else if (seleccion === "departamentos") {
              fila.innerHTML = `<td>${dato.Numero}</td><td>${dato.Centro}</td><td>${dato.Director}</td><td>${dato.Tipo_dir}</td><td>${dato.Presupuesto}</td><td>${dato.Depto_jefe}</td><td>${dato.Nombre}</td>`;
            } else if (seleccion === "empleados") {
              fila.innerHTML = `<td>${dato.Cod}</td><td>${dato.Departamento}</td><td>${dato.Telefono}</td><td>${dato.Fecha_nacimiento}</td><td>${dato.Fecha_ingreso}</td><td>${dato.Salario}</td><td>${dato.Comision}</td><td>${dato.Num_hijos}</td><td>${dato.Nombre}</td>`;
            }

            tbody.appendChild(fila);
          });

          tablaResultados.appendChild(tbody);
          contenedorResultados.appendChild(tablaResultados); 
        } else {
          const mensaje = document.createElement("p");
          mensaje.textContent = "No se encontraron resultados.";
          contenedorResultados.appendChild(mensaje);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Por favor, selecciona una tabla.");}
});

function limpiarTabla() {
  while (tablaResultados.rows.length > 0) {
    tablaResultados.deleteRow(0);
  }
}
