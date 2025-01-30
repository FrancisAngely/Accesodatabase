document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const formularioTabla = document.getElementById("formulario");
  const botonBuscar = document.getElementById("buscar");
  const contenedorResultados = document.getElementById("resultados");
  const formularioDepartamento = document.getElementById("form2");
  const formularioBuscarEmpleados = document.getElementById("form3");
  const empleadosResultados = document.getElementById("empleadosResultados");

  cargarDesplegables();

  // Evento para buscar datos de tablas
  formularioTabla.addEventListener("submit", function (e) {
    e.preventDefault();
    const tablaSeleccionada = document.getElementById("tabla").value;

    if (tablaSeleccionada) {
      buscarTabla(tablaSeleccionada);
    } else {
      alert("Por favor selecciona una tabla.");
    }
  });

  // Evento para añadir un departamento
  formularioDepartamento.addEventListener("submit", function (e) {
    e.preventDefault();
    const datosFormulario = new FormData(formularioDepartamento);
    datosFormulario.append("accion", "add_department");

    fetch("http://localhost/prueba1/acceso_bd.php", {
      method: "POST",
      body: datosFormulario,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert("Departamento añadido exitosamente");
          cargarDesplegables(); // Actualiza los desplegables
          formularioDepartamento.reset(); // Limpia el formulario
        } else {
          alert("Error al añadir departamento: " + result.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  // Evento para buscar empleados por departamento
  formularioBuscarEmpleados.addEventListener("submit", function (e) {
    e.preventDefault();
    const deptId = document.getElementById("searchDept").value;

    if (deptId) {
      fetch("http://localhost/prueba1/acceso_bd.php", {
        method: "POST",
        body: new URLSearchParams({
          accion: "search_employees",
          search_dept: deptId,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            empleadosResultados.innerHTML = `<p>${result.error}</p>`;
          } else if (result.length > 0) {
            mostrarEmpleados(result);
          } else {
            empleadosResultados.innerHTML =
              "<p>No se encontraron empleados.</p>";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          empleadosResultados.innerHTML = "<p>Ocurrió un error inesperado.</p>";
        });
    } else {
      alert("Por favor selecciona un departamento.");
    }
  });

  // Función para cargar desplegables dinámicos
  function cargarDesplegables() {
    fetch("http://localhost/prueba1/acceso_bd.php?tabla=centros")
      .then((response) => response.json())
      .then((centros) => {
        const centroSelect = document.getElementById("tipoCentro");
        centroSelect.innerHTML = centros
          .map(
            (centro) =>
              `<option value="${centro.Numero}">${centro.Nombre}</option>`
          )
          .join("");
      });

    fetch("http://localhost/prueba1/acceso_bd.php?tabla=empleados")
      .then((response) => response.json())
      .then((empleados) => {
        const directorSelect = document.getElementById("Director");
        directorSelect.innerHTML = empleados
          .map(
            (director) =>
              `<option value="${director.Cod}">${director.Nombre}</option>`
          )
          .join("");
      });

    fetch("http://localhost/prueba1/acceso_bd.php?tabla=departamentos")
      .then((response) => response.json())
      .then((departamentos) => {
        const deptoTipo_dirSelect = document.getElementById("Tipo_dir");

        const uniqueTipos = new Set();
        departamentos.forEach((dept) => {
          if (dept.Numero && (dept.Tipo_dir === "P" || dept.Tipo_dir === "F")) {
            uniqueTipos.add(dept.Tipo_dir);
          }
        });

        const opciones = Array.from(uniqueTipos)
          .map((tipo) => `<option value="${tipo}">${tipo}</option>`)
          .join("");

        deptoTipo_dirSelect.innerHTML = opciones;

        const numeroDepartamento = document.getElementById("Numero");
        const lastElement = departamentos[departamentos.length - 1];
        const lastElementNum = lastElement.Numero + 1;
        console.log(lastElementNum);

        const deptoSelect = document.getElementById("Depto_jefe");

        const dptojefe = departamentos.filter(
          (departamento) => departamento.Numero
        );

        const uniqueDeptoJefe = new Set();
        dptojefe.forEach((dept) => {
          uniqueDeptoJefe.add(dept.Depto_jefe);
        });

        const opciones1 = Array.from(uniqueDeptoJefe)
          .map((num) => `<option value="${num}">${num}</option>`)
          .join("");
        deptoSelect.innerHTML = opciones1;

        numeroDepartamento.value = lastElementNum;

        const depsSelect = document.getElementById("searchDept");
        depsSelect.innerHTML = departamentos
          .map(
            (departamento) =>
              `<option value="${departamento.Numero}">${departamento.Nombre}</option>`
          )
          .join("");
      });
  }

  // Función para buscar datos de tablas
  function buscarTabla(tabla) {
    limpiarResultados();
    fetch(`http://localhost/prueba1/acceso_bd.php?tabla=${tabla}`)
      .then((response) => response.json())
      .then((datos) => {
        if (datos.length > 0) {
          mostrarTabla(tabla, datos);
        } else {
          contenedorResultados.innerHTML =
            "<p>No se encontraron resultados.</p>";
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // Función para mostrar datos en tabla
  function mostrarTabla(tabla, datos) {
    const tablaResultados = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const encabezado = document.createElement("tr");
    if (tabla === "centros") {
      encabezado.innerHTML = "<th>Numero</th><th>Nombre</th><th>Direccion</th>";
    } else if (tabla === "departamentos") {
      encabezado.innerHTML =
        "<th>Numero</th><th>Centro</th><th>Director</th><th>Tipo_dir</th><th>Presupuesto</th><th>Depto_jefe</th><th>Nombre</th>";
    } else if (tabla === "empleados") {
      encabezado.innerHTML =
        "<th>Cod</th><th>Departamento</th><th>Telefono</th><th>Fecha_nacimiento</th><th>Fecha_ingreso</th><th>Salario</th><th>Comision</th><th>Num_hijos</th><th>Nombre</th>";
    }
    thead.appendChild(encabezado);
    tablaResultados.appendChild(thead);

    datos.forEach((dato) => {
      const fila = document.createElement("tr");
      for (const clave in dato) {
        const celda = document.createElement("td");
        celda.textContent = dato[clave];
        fila.appendChild(celda);
      }
      tbody.appendChild(fila);
    });

    tablaResultados.appendChild(tbody);
    contenedorResultados.appendChild(tablaResultados);
  }

  // Función para mostrar empleados
  function mostrarEmpleados(empleados) {
    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    thead.innerHTML =
      "<tr><th>Nombre</th><th>Teléfono</th><th>Salario</th></tr>";
    empleados.forEach((empleado) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${empleado.Nombre}</td>
        <td>${empleado.Telefono || "N/A"}</td>
        <td>${empleado.Salario || "N/A"}</td>`;
      tbody.appendChild(fila);
    });

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    empleadosResultados.innerHTML = "";
    empleadosResultados.appendChild(tabla);
  }

  // Limpia el contenedor de resultados
  function limpiarResultados() {
    contenedorResultados.innerHTML = "";
  }
});
