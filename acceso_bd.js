// const form= document.getElementById('formulario');
const select_nombre = document.getElementById("nombre");
const tabla = document.getElementById("tabla");
const boton_buscar = document.getElementById("buscar");

fetch("http://localhost/accesodatabase/acceso_bd.php")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((datos) => {
    console.log(datos);
    datos.forEach((element) => {
      const option = document.createElement("option");
      option.textContent = element.Nombre;
      option.value = element.Nombre;
      select_nombre.appendChild(option);
    });
    boton_buscar.addEventListener("click", function (e) {
      e.preventDefault();
      const seleccion = select_nombre.value;
      console.log(seleccion);

      limpiarTabla();


      const filtrado = datos.filter(
        (departamentos) => departamentos.Nombre === seleccion);
      
      filtrado.forEach((dato) => {
        const fila = document.createElement("tr");

        const celdaNumero = document.createElement("td");
        celdaNumero.textContent = dato.Numero;
        fila.appendChild(celdaNumero);

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = dato.Nombre;
        fila.appendChild(celdaNombre);

        const celdaCentro = document.createElement("td");
        celdaCentro.textContent = dato.Centro;
        fila.appendChild(celdaCentro);

        tabla.appendChild(fila);
      });
    })
  });

  function limpiarTabla() {
    const tabla = document.getElementById("tabla");
    while (tabla.rows.length > 1) {
      tabla.deleteRow(1);
    }
  }

  