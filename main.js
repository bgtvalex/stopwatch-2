// вывод
var hEl = document.getElementById('hour'),
  mEl = document.getElementById('minute'),
  sEl = document.getElementById('second'),
  // ввод, выбор
  inp = document.getElementById('inp'),
  btn = document.getElementById('btn'),
  select = document.getElementById('select'),
  title = ''

// старт, стоп
;(stop = document.getElementById('stop')),
  (start = document.getElementById('start')),
  (result = document.getElementById('result')),
  (tStart = ''),
  (tStop = ''),
  (play = null),
  (data = ''),
  (local = JSON.parse(localStorage.getItem('stopwatch')))

if (local) {
  data = local
} else {
  data = []
}

getSelect(data)

// если старт активен и браузер отключался
if (localStorage.getItem(`start-${title}`)) {
  setDisabled(1)
} else {
  setDisabled(2)
}

// Старт
start.addEventListener('click', () => {
  setDisabled(3)
  setTitle()
  console.log('title', title);
  

  // title = inp.value
  tStart = Date.now()
  console.log('start', tStart)
  localStorage.setItem(`start-${title}`, tStart)
  console.log('localS', `start-${title}`)

  play = setInterval(function () {
    var time = Date.now()
    var num = getTime(time - tStart)
    console.log('', num[3], num[4], num[5])

    showTime(num[3], num[4], num[5])
  }, 1000)
})

// Стоп
stop.addEventListener('click', () => {
  setDisabled(4)
  localStorage.removeItem(`start-${title}`)

  var time = +localStorage.getItem(`start-${title}`)
  clearInterval(play)
  tStop = Date.now()
  var num = getTime(tStop - time)
  showTime(num[3], num[4], num[5])
  remember(Date.now(), time, tStop, tStop - time, title)
  showData()
})

function setDisabled(n) {
  if (n == 1) {
    start.disabled = true
    start.classList.add('noHover')
  }
  if (n == 2) {
    stop.disabled = true
    stop.classList.add('noHover')
  }
  if (n == 3) {
    start.disabled = true
    start.classList.add('noHover')
    stop.disabled = false
    stop.classList.remove('noHover')
  }
  if (n == 4) {
    start.disabled = false
    start.classList.remove('noHover')
    stop.disabled = true
    stop.classList.add('noHover')
  }
}

function remember(date, start, finish, time, title) {
  data.push({ date, start, finish, time, title })
  localStorage.setItem('stopwatch', JSON.stringify(data))
}
function getSelect(d) {
  var arr = []
  for (let item of d) {
    if (!arr.includes(item.title) && item.title !== '') {
      arr.push(item.title)
    }
  }
  for (let item of arr) {
      select.innerHTML += `<option value='${item}'>${item}</option>`
  }
}

function setTitle(){
  if (select.value) title = select.value
  if (inp.value) title = inp.value
}

function getTime(t) {
  var year = new Date(t).getFullYear(),
    month = new Date(t).getMonth() + 1,
    day = new Date(t).getDate(),
    h = new Date(t).getHours() - 3,
    m = new Date(t).getMinutes(),
    s = new Date(t).getSeconds(),
    sec = s + m * 60
  return [year, pad(month), pad(day), pad(h), pad(m), pad(s), sec]
}

function pad(val) {
  return val < 10 ? '0' + val : val
}

function showTime(h, m, s) {
  hEl.textContent = h
  mEl.textContent = m
  sEl.textContent = s
}

function showData() {
  result.innerHTML = ''
  var d = JSON.parse(localStorage.getItem('stopwatch'))
  for (let item of d) {
    var date = getTime(item.date),
      time = getTime(item.time),
      sec = Math.round(item.time / 1000)
    result.innerHTML += `${item.title}: [${date[2]}.${date[1]}.${date[0]}] -   ${time[3]}:${time[4]}:${time[5]} - ${sec}s<br>`
  }
}
