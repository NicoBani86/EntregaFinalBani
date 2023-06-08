
//SERVICIOS

class servicio {
    constructor (id, nombre, precio, descripcion){
        this.id = id
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.descripcion = descripcion;
    }
    
    
}

const serv1 = new servicio(1, "Pack básico", 22500,"4 POSTEOS - 3 REELS CON EDICIÓN - STORYS 2 VECES POR SEMANA (CADA DÍA SE SUBEN ENTRE 3 Y 5 PLACAS.) " );
const serv2 = new servicio(2, "Pack intermedio",27500,"6 POSTEOS - 3 REELS CON EDICIÓN - STORYS 3 VECES POR SEMANA (CADA DÍA SE SUBEN ENTRE 3 Y 5 PLACAS.) ");
const serv3 = new servicio(3, "Pack pro", 35000,"8 POSTEOS - 4 REELS CON EDICIÓN - STORYS 3 VECES POR SEMANA (CADA DÍA SE SUBEN ENTRE 3 Y 5 PLACAS.) ");
const serv4 = new servicio(4, "Fotografía Redes", 20000,"Sesión de dos horas de fotografía de producto con 10 fotografías editadas a elección.");

//ARRAY SERVICIOS

const servicios = [serv1,serv2,serv3,serv4];

let carritoCompras = JSON.parse(localStorage.getItem("carritoCompras")) || [];

const ventaServ = document.getElementById("serv1")

const verCarrito = document.getElementById("carrito")

const contendorCompra = document.getElementById("totalCompra")


servicios.forEach((serv) => {
    let contenido = document.createElement("div");
    contenido.innerHTML =`
    
    <h2>${serv.nombre}: <h2/>
    <h3>Incluye: ${serv.descripcion}<h3/>
    <h3>Precio: $${serv.precio}.-<h3/>
`
ventaServ.append(contenido);   

let comprar= document.createElement("button");
comprar.innerText="Adquirir servicio";
contenido.append(comprar)
comprar.className = "comprar";

comprar.addEventListener("click", () => {
    carritoCompras.push({
        id: serv.id,
        nombre: serv.nombre,
        precio: serv.precio
    })
    local();

    Swal.fire({
        icon: 'success',
        iconColor: '#2cdba2',
        title: '<h2 class="ms-3">Servicio contratado! <h2/>',
        text: 'Agregado al carrito con éxito!',
        confirmButtonColor: '#5a605e'  ,
        background: '#8da49c',
        
      })
})


});



verCarrito.addEventListener("click", ()=> {
    contendorCompra.className = "totalCompra";
    contendorCompra.innerHTML = ``
    contendorCompra.style.display = "block";
    const compra = document.createElement("div");
    compra.innerHTML =`
    <h2 class="ms-3">Servicios contratados: <h2/>
    <p><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
  </svg></p>
    `
    contendorCompra.append(compra)

    carritoCompras.forEach((serv)=>{
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.innerHTML = `
        <h3 class="ms-5">${serv.nombre}</h3>
        <h3 class="ms-5">$${serv.precio}.-</h3>
        
        `;
    contendorCompra.append(contenidoCarrito);
    
    })

    const total = carritoCompras.reduce((acumulador, precio) => acumulador + precio.precio, 0);
    let totalFinal = document.createElement("div")
    totalFinal.innerHTML = `
    <h3 class="ms-5">Total a pagar: $ ${total}.-<h3/>
    
    `
    contendorCompra.append(totalFinal)

    const cerrarCompra = document.createElement("button")
    
    cerrarCompra.className = "comprar ms-5"
    cerrarCompra.innerText = "Cerrar carrito"
    cerrarCompra.addEventListener("click", ()=>{
        contendorCompra.style.display = "none";
    })


    contendorCompra.append(cerrarCompra);

});


const local = () => {

localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
};






document.addEventListener('DOMContentLoaded', traerProgramas);

const programas = document.getElementById("programas");

const tituloProgramas = document.createElement("div")
tituloProgramas.innerHTML = `
<h2> Programas utilizados: <h2/>`;
programas.append(tituloProgramas);

async function traerProgramas() {
  const url = "data.json"


try {
  const resultado = await fetch(url);
  const respuesta = await resultado.json();
  programasUsados(respuesta)

} catch (error) {
  console.log(error)
}
}

function programasUsados(data) {
    data.forEach((prog) => {
      const {nombre, img} = prog;
      programas.innerHTML +=`
      <div id:"program">
      <h3>${nombre}<h3/>
      <img src="${img}" alt="${nombre}" width="100" height="100">
      <img/>
      <div/>
      `
      
    });
  };



