const divDetails = document.getElementById('hotelDetails')
const buttonSearch = document.getElementById('buttonSearch')

//Fechas
const dateControl = document.getElementById('inputDate1')
const hoy = new Date()
const dateMin = `${hoy.getFullYear()}-0${hoy.getMonth() + 1}-${hoy.getDate()}`
dateControl.setAttribute('min', dateMin)

const Single = {id: 1, nombre: "Single", precio: 2500, info: "Habitación para dos personas, con camas simples.", imagen: "img/single.jpg"}
const Doble = {id: 2, nombre: "Doble", precio: 3500, info: "Habitación para dos personas con cama matrimonial tamaño Queen.", imagen: "img/doble.jpeg"}
const Triple = {id: 3, nombre: "Triple", precio: 4500, info: "Habitación para tres personas con camas individuales.", imagen: "img/triple.jpeg"}
const Cuádruple = {id: 4, nombre: "Cuádruple", precio: 5500, info:"Habitación cuádruple con cuatro camas simples, vista a la ciudad.", imagen:"img/cuadruple.jpeg"}
const Múltiple = {id: 5, nombre: "Múltiple", precio: 6500, info: "Habitación ideal para un grupo de amigos, hasta seis personas.", imagen: "img/multiple.jpeg"}

const habitaciones = [Single, Doble, Triple, Cuádruple, Múltiple]

const idForm = document.getElementById('idForm')
const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
document.getElementById("usuario").innerHTML = usuarioStorage;

//Muestro la búsqueda
idForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    
//mostrar seleccion
const select = document.getElementById('seleccionHotel')
const hotelEncontrado = habitaciones.find((element) => element.id == select.value);

fetch('https://criptoya.com/api/dolar')
.then(response => response.json())
.then(({blue}) => {

hotelEncontrado.dolar = parseFloat(hotelEncontrado.precio / blue)
hotelDetails.innerHTML=`
 
<div class="card" style="width:16rem">
  <img src="${hotelEncontrado.imagen}" class="card-img-top" alt="...">
  <div class="card-body">
    <h6 class="card-title">Habitación ${hotelEncontrado.nombre}</h6>
    <h6 class="card-title">Precio $${hotelEncontrado.precio}</h6>
    <h6 class="card-title">Precio USD ${hotelEncontrado.dolar.toFixed(2)}</h6>
    

    <p class="card-text">${hotelEncontrado.info}</p>
    <a href="javascript:void(0)" onclick="reservarHotel('${hotelEncontrado}','${hotelEncontrado.id}','${select.value}','${hotelEncontrado.nombre}','${hotelEncontrado.precio}','${hotelEncontrado.dolar.toFixed(2)}')" class="btn btn-primary">Reserva</a>
  </div>
</div>

    `    
})

    })
    function reservarHotel(hotelEncontrado,hotelReservadoId,seleccion,nombre,precio,dolar){
    let date1=  document.getElementById("inputDate1").value
    let date2=  document.getElementById("inputDate2").value
    let hotelReservado={
      idReserva:hotelReservadoId,
      dateStart:date1,
      dateEnd:date2,
      select:seleccion
    }
    
    document.getElementById("datosReserva").innerHTML=`
     
    <div class="card" style="width:16rem">
      <div class="card-body">
      <h6 class="card-title">Listo ${usuarioStorage}, ha reservado</h6>
        <h6 class="card-title">una habitación ${nombre}</h6>
        <h6 class="card-title">con fecha de entrada ${moment(date1).format('DD-MM-YYYY')}</h6>
        <h6 class="card-title">y fecha de salida ${moment(date2).format('DD-MM-YYYY')}</h6>
        <h6 class="card-title">El precio es de $${precio}</h6>
        <h6 class="card-title">El precio en dólares es USD ${dolar}</h6>
        
      </div>
    </div>
    
        `    
      document.getElementById("hotelDetails").innerHTML=''
      localStorage.setItem('hotelReservado', JSON.stringify(hotelReservado))
    }
    
    localStorage.setItem('eleccion', JSON.stringify(habitaciones))
    
    buttonSearch.addEventListener('click', () => {
        const eleccionStorage = JSON.parse(localStorage.getItem('eleccion','habitaciones'))


//Borrar la búsqueda
    buttonSearch.addEventListener('click',()=>{
        Swal.fire({
            title: '¿Seguro que querés limpiar la búsqueda?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Listo',
                'Podés comenzar nuevamente la búsqueda',
                'success'
                )
                divDetails.innerHTML=''
                datosReserva.innerHTML=''
            }
           
        })
})

    const inputText = document.getElementById('inputText')
  
   
})