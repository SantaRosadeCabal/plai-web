const input = document.querySelector('#buscaNumero')
const licenciaList = document.querySelector('#licencias')

let licencias = []

window.addEventListener('DOMContentLoaded', async () => {
  licenciaList.innerHTML = "<h1>Loading</h1>"
  const data = await loadlicencias()
  licencias = data.body
  console.log(licencias)
  renderlicencias(licencias)
})

function filtrarResolucion(){
  const newlicencias = licencias.filter((licencia) => licencia.code == input.value)
  renderlicencias(newlicencias)
  console.log
}

input.addEventListener('keyup', e => {
  const newlicencias = licencias.filter((licencia) => licencia.code == input.value)
  renderlicencias(newlicencias)
})


async function loadlicencias() {
  const response = await fetch('https://api.plai.gov.co/blockchain/procedure/')
  return await response.json()

}


const createlicenciaItems = licencias => licencias.map(licencia => `<li class="grid-item wow animate__fadeInUp" data-wow-delay="0.2s"><div class="blog-post blog-post-style7 border border-color-light-gray padding-fourteen-all lg-padding-ten-all sm-padding-30px-all bg-light-gray"><div class="post-details"><span class="text-large alt-font margin-50px-bottom md-margin-30px-bottom d-block">  ${licencia.code} </span><span class="text-extra-small text-uppercase d-block margin-four-bottom md-margin-two-bottom">${licencia.lastUpdate}</br>Estrato:  ${licencia.stratum}</br> Tipo de vivienda: ${licencia.housing}</br> N° pisos: ${licencia.floors} </br>Tipo de suelo: ${licencia.ground} </span</div></div></div></li>`).join(' ')

function renderlicencias(licencias) {
  const itemsString = createlicenciaItems(licencias)
  licenciaList.innerHTML = itemsString
}