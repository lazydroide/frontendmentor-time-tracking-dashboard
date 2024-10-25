const dailyBtn = document.getElementById('daily');
const weeklyBtn = document.getElementById('weekly');
const monthlyBtn = document.getElementById('monthly');

const loadData = (periodicity) => {
    fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        const data = document.getElementById('data');
        data.innerHTML = '';

        let period = '';
        if (periodicity === 'daily') {
            period = 'day';
        } else if (periodicity === 'weekly') {
            period = 'week';
        } else {
            period = 'month';
        }

        json.forEach(element => {
            let cardType = element.title.toLowerCase();
            if (element.title === "Self Care") { cardType = "self-care"}
            data.innerHTML += `<article class="card ${cardType}">
    <div class="card__bg"></div>
    <a href="#${cardType}">
        <div class="card-data">
            <div class="card-data__title text-card-title">
                <h2>${cardType}</h2>
                <img src="./images/icon-ellipsis.svg" alt="">
            </div>
            <div class="card-data__time text-card-time">${element.timeframes[periodicity].current}hrs</div>
            <div class="card-data__last-period text-body">Last ${period} - ${element.timeframes[periodicity].previous}hrs</div>
        </div>
    </a>
  </article>`
        });
    
    });
}

loadData('daily');


dailyBtn.addEventListener('click', () => {
    loadData('daily');
});
weeklyBtn.addEventListener('click', () => {loadData('weekly')});
monthlyBtn.addEventListener('click', () => {loadData('monthly')});

