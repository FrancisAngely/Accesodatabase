const select_tabla = document.getElementById("tabla");
const boton_buscar = document.getElementById("buscar");
const contenedorResultados = document.getElementById("resultados");
const tablaResultados = document.createElement("table");

boton_buscar.addEventListener("click", function (e) {
  e.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
  const seleccion = select_tabla.value;

  // Limpia el contenedor antes de mostrar nuevos resultados
  limpiarTabla();

  // Verifica que se haya sele    ccionado una tabla
  if (seleccion) {
    fetch(
      `http://localhost/ejercicio_accesoBD/acceso_bd.php?tabla=${seleccion}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la respuesta de la red");
      })
      .then((datos) => {
        console.log(datos);
        // Verifica si hay datos
        if (datos.length > 0) {
          // Crear una nueva tabla para los resultados

          const thead = document.createElement("thead");
          const tbody = document.createElement("tbody");

          // Crear encabezados según la tabla seleccionada
          // falta completar el codigo
          const encabezado = document.createElement("tr");
          if (seleccion === "centros") {
            encabezado.innerHTML =
              "<th>Numero</th><th>Nombre</th><th>Direccion</th>";
          } else if (seleccion === "departamentos") {
            encabezado.innerHTML =
              "<th>Numero</th><th>Nombre</th><th>Centro</th>";
          } else if (seleccion === "empleados") {
            encabezado.innerHTML =
              "<th>Cod</th><th>Nombre</th><th>Telefono</th>";
          }
          thead.appendChild(encabezado);
          tablaResultados.appendChild(thead);

          // Agregar filas de datos
          datos.forEach((dato) => {
            const fila = document.createElement("tr");

            if (seleccion === "centros") {
              fila.innerHTML = `<td>${dato.Numero}</td><td>${dato.Nombre}</td><td>${dato.Direccion}</td>`;
            } else if (seleccion === "departamentos") {
              fila.innerHTML = `<td>${dato.Numero}</td><td>${dato.Nombre}</td><td>${dato.Centro}</td>`;
            } else if (seleccion === "empleados") {
              fila.innerHTML = `<td>${dato.Cod}</td><td>${dato.Nombre}</td><td>${dato.Telefono}</td>`;
            }

            tbody.appendChild(fila);
          });

          tablaResultados.appendChild(tbody);
          contenedorResultados.appendChild(tablaResultados); // Agregar la tabla al contenedor
        } else {
          // Si no hay datos, muestra un mensaje
          const mensaje = document.createElement("p");
          mensaje.textContent = "No se encontraron resultados.";
          contenedorResultados.appendChild(mensaje);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Por favor, selecciona una tabla.");
  }
});

function limpiarTabla() {
  while (tablaResultados.rows.length > 0) {
    tablaResultados.deleteRow(0);
  }
}
