const pcTotalArea = document.getElementById('pcTotalArea');
const pcFloorsArea = document.getElementById('pcFloorsArea');
const pcStratum = document.getElementById('pcStratum');
const pcTotal = document.getElementById('pcTotal');


const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });


const getTotal = async () => {
    if (pcTotalArea.value && pcFloorsArea.value && pcStratum.value) {
        try {
            const response = await fetch(`https://api.plai.gov.co/blockchain/procedure/taxCalculator/${pcStratum.value}/${pcTotalArea.value}/${pcFloorsArea.value}`)
            const data = await response.json();
            const total = parseFloat(data.body.batchTotalPrice) + parseFloat(data.body.totalAreaPrice);
            pcTotal.innerText = formatter.format(total);
        } catch (error) {
            pcTotal.innerText = '$ --';
        }
    } else {
        pcTotal.innerText = '$ --';
    }
}


pcTotal.innerText = '$ --';


pcTotalArea.addEventListener('keyup', () => {getTotal()});
pcFloorsArea.addEventListener('keyup', () => {getTotal()});
pcStratum.addEventListener('change', () => {getTotal()});