const stockProductos = [
  {
    id: 1,
    nombre: "jeans",
    cantidad: 1,
    desc: "jeans de mujer",
    precio: 12000,
    img: "img/jeans.jfif"
  },
  {
    id: 2,
    nombre: "botas",
    cantidad: 1,
    desc: "botas mujer talle 35 36 37",
    precio: 5500,
    img: "img/botas.jfif",
  },
  {
    id: 3,
    nombre: "cinturo",
    cantidad: 1,
    desc: "cinturon para hombre",
    precio: 1570,
    img: "img/cinturon.jfif",
  },
  {
    id: 4,
    nombre: "camisa",
    cantidad: 1,
    desc: "camisa para hombre talle L",
    precio: 8000,
    img: "img/camisa.jpg",
  },
  {
    id: 5,
    nombre: "medias",
    cantidad: 1,
    desc: "medias",
    precio: 1000,
    img: "img/medias.jfif",
  },
  {
    id: 6,
    nombre: "reloj",
    cantidad: 1,
    desc: "reloj metalico de mujer.",
    precio: 18000,
    img: "img/relojes.jfif",
  },
  {
    id: 7,
    nombre: "remera",
    cantidad: 1,
    desc: "remera mujer talle s",
    precio: 3000,
    img: "img/remera mujer.jfif",
  },
  {
    id: 8,
    nombre: "jeans",
    cantidad: 1,
    desc: "jean hombre talle 42",
    precio: 11000,
    img: "img/jeanhombre.jfif",
  },
  {
    id: 9,
    nombre: "polera",
    cantidad: 1,
    desc: "polera mujer talle unico",
    precio: 5000,
    img: "img/poleramujer.jfif",
  },
  {
    id: 10,
    nombre: "buzo",
    cantidad: 1,
    desc: "buzo deportivo talle L",
    precio: 12000,
    img: "img/buzo.jfif",
  },
];


const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago');


let carrito = [];




if (activarFuncion) {
  activarFuncion.onclick = procesarPedido
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});

if (formulario) {
  formulario.onsubmit = enviarCompra
}

if (vaciarCarrito) {
  vaciarCarrito.onclick = () => {
    carrito.length = [];
    mostrarCarrito();
  }

  if (procesarCompra) {
    procesarCompra.onclick = () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "No hay nada en carrito",
          text: "Agrega al carrito continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "compra.html";
      }
    }
  }
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Agregar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)
  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++
        alert()
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()
};

const alert = () => {
  Swal.fire({
    text: 'comprobante de pago enviado',
    icon: 'success',
    timer: 1000
  })
}

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡No agregaste nada al carrito!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;
  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}

function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e) {
  e.preventDefault()
  const cliente = document.querySelector('#cliente').value
  const email = document.querySelector('#correo').value
  if (email === '' || cliente == '') {
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    })
  } else {

    const btn = document.getElementById('button');

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_qxwi0jn';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        alert('Correo enviado!');
      }, (err) => {
        btn.value = 'Finalizar compra';
        alert(JSON.stringify(err));
      });

    const spinner = document.querySelector('#spinner')
    spinner.classList.add('d-flex')
    spinner.classList.remove('d-none')

    setTimeout(() => {
      spinner.classList.remove('d-flex')
      spinner.classList.add('d-none')
      formulario.reset()

      const alertExito = document.createElement('p')
      alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
      alertExito.textContent = 'Compra realizada correctamente'
      formulario.appendChild(alertExito)

      setTimeout(() => {
        alertExito.remove()
      }, 3000)


    }, 3000)
  }
  localStorage.clear()

}