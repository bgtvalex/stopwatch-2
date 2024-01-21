// вывод
var hEl = document.getElementById('hour'),
  mEl = document.getElementById('minute'),
  sEl = document.getElementById('second'),
  // ввод, выбор
  inp = document.getElementById('inp'),
  btn = document.getElementById('btn'),
  select = document.getElementById('select'),
  title = '',
  arrTitles = []

// старт, стоп
;(stop = document.getElementById('stop')),
  (start = document.getElementById('start')),
  (result = document.getElementById('result')),
  (tStart = ''),
  (tStop = ''),
  (play = null),
  (data = ''),
  (local = JSON.parse(localStorage.getItem('stopwatch')))
  // console.log('local', local);
  

if (local) {
  data = local
  // arrTitles = data.titles
} else {
  data = {d:[], titles: []}
}
console.log('data.titles', data.titles);

getArrayTitles(data.titles)
getSelect()

// если старт активен и браузер отключался
if (localStorage.getItem(`start-${title}`)) {
  setDisabled(3)
} else {
  setDisabled(4)
}

// Старт
start.addEventListener('click', () => {
  setDisabled(3)
  setTitle()
  console.log('title', title);

  tStart = Date.now()
  localStorage.setItem(`start-${title}`, tStart)

  play = setInterval(function () {
    var time = Date.now()
    var num = getTime(time - tStart)
    console.log('play', num[3], num[4], num[5])
    showTime(num[3], num[4], num[5])
  }, 1000)
  inp.value = ''
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
  getSelect(data)
})

inp.addEventListener('click', function(){
  select.value = ''
})

select.addEventListener('change', function(){
  console.log('select: change')
  inp.value = ''
  title = select.value
  if (localStorage.getItem(`start-${title}`)) {
    setDisabled(3)
  } else { setDisabled(4) }
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
  data.d.push({ date, start, finish, time, title })
  if (!data.titles.includes(title)) {
    data.titles.push(title)
  }
  localStorage.setItem('stopwatch', JSON.stringify(data))
}

function getArrayTitles (d) {
  
  if (!d == '') {
    console.log('getArrayTitles: d', d);
    for (let item of d) {
      if (!arrTitles.includes(item) && item.title !== '') {
        console.log('getArrayTitles: item', item);
        
        arrTitles.push(item)
      }
    }
  }
  return arrTitles
}

function getSelect() {
  select.innerHTML = "<option value=''></option>"
  for (let item of arrTitles) {
    console.log('getSelect: item', item);
    
      select.innerHTML += `<option value='${item}'>${item}</option>`
  }
}

function setTitle(){
  if (select.value) title = select.value
  if (inp.value) {
    title = inp.value
    arrTitles.push(title)
    getSelect()
  }
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
  console.log('showData: d', d);
  
  for (let item of d.d) {
    var date = getTime(item.date),
      time = getTime(item.time),
      sec = Math.round(item.time / 1000)
    result.innerHTML += `${item.title}: [${date[2]}.${date[1]}.${date[0]}] -   ${time[3]}:${time[4]}:${time[5]} - ${sec}s<br>`
  }
}
