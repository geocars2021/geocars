const chart0 = document.getElementById('chart0').getContext("2d");

const gradientStroke = chart0.createLinearGradient(0, 0, 0, 500);
gradientStroke.addColorStop(0, '#80b6f4');
gradientStroke.addColorStop(1, '#f49080');

const gradientFill = chart0.createLinearGradient(0, 0, 0, 500);
gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");

export const myChart0 = new Chart(chart0, {
    type: 'bar',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"],
        datasets: [{
            label: "Profit",
            borderColor: gradientStroke,
            barThickness: 18,  
            maxBarThickness: 20,
            fill: true,
            backgroundColor: gradientFill,
            // make all 0 as default | loading value
            data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0],
            
        }]
    },
    options: {
        tension: 0.36,
        responsive: true,
        plugins:{
          legend: {
            display: false,
            position: "bottom"
          },
        },
    }
});



const chart1 = document.getElementById("chart1");
export const myChart1 = new Chart(chart1, {
  type: 'doughnut',
  data: {
    labels: ['inactive', 'active'],
    datasets: [{
      label: 'Data of unknow',
       // -1 : -1 as default value | or still loading 
      data: [-1, -1],
      backgroundColor: [
        'rgb(196, 2, 255)',
        '#4CAF50',
      ],
      borderColor: [
        'rgb(196, 2, 255)',
        '#4CAF50',
      ],
      borderWidth: 1
    }]
  },
  options: {
    cutout: '80%',
    responsive: true,
    plugins:{
        title: {
            display: false,
            text: 'Dont know tally',
            align : 'middle',
            position: 'top',
        },
        legend: {
            display: false,
            align: "middle",
            position:'right',
            labels: {
                usePointStyle: true,
            },
        },
    }
  }
});

const chart2 = document.getElementById("chart2");
export const myChart2 = new Chart(chart2, {
  type: 'doughnut',
  data: {
    labels: ['available', 'unavailable'],
    datasets: [{
      label: 'Data of unknow',
      // -1 : -1 as default value | or still loading 
      data: [-1, -1],
      backgroundColor: [
        'rgb(196, 2, 255)',
        '#4CAF50',
      ],
      borderColor: [
        'rgb(196, 2, 255)',
        '#4CAF50',
      ],
      borderWidth: 1
    }]
  },
  options: {
   	cutout: '80%',
    responsive: true,
    plugins:{
        title: {
            display: false,
            text: 'Dont know tally',
            align : 'middle',
            position: 'top',
        },
        legend: {
            display: false,
            align: "middle",
            position:'right',
            labels: {
                usePointStyle: true,
            },
        },
    }
  }
});

const lg_tile_3 = document.getElementById('lg-tile-3');
const lg_tile_4 = document.getElementById('lg-tile-4');

function maintain_ratio(){
  let perc = lg_tile_3.offsetWidth+20;
  lg_tile_4.style.height = `calc(calc(95% - ${perc}px) - 20px)`;
}

maintain_ratio();
window.addEventListener('resize',(e)=>{
  maintain_ratio();
});



