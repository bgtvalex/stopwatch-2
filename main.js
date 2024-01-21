var hEl = document.getElementById('hour'),
  mEl = document.getElementById('minute'),
  sEl = document.getElementById('second'),
  stop = document.getElementById('stop'),
  start = document.getElementById('start'),
  result = document.getElementById('result'),
  tStart = '',
  tStop = '',
  play = null,
  data = '',
  local = JSON.parse(localStorage.getItem('stopwatch'))


if ( local ) {
  data = local
} else {
  data = []
}

// если старт активен и браузер отключался
if (localStorage.getItem('start')) {
  start.disabled = true
  start.classList.add('noHover')
} else {
  stop.disabled = true
  stop.classList.add('noHover')
}


start.addEventListener('click', () => {
  // disabled
  start.disabled = true
  start.classList.add('noHover')
  stop.disabled = false
  stop.classList.remove('noHover')

  tStart = Date.now()
  console.log('start', tStart)
  localStorage.setItem('start', tStart)

  play = setInterval(function(){
    var time = Date.now()
    var num =  getTime(time - tStart)
    console.log('', num[3], num[4], num[5]);
    
    showTime(num[3], num[4], num[5])
  }, 1000)
})

stop.addEventListener('click', () => {
  start.disabled = false
  start.classList.remove('noHover')
  stop.disabled = true
  stop.classList.add('noHover')
  var time = +localStorage.getItem('start')
  localStorage.removeItem('start')
  clearInterval(play)
  tStop = Date.now()
  var num =  getTime(tStop - time)
  showTime(num[3], num[4], num[5])
  remember(Date.now(), time, tStop, tStop - time)
  showData()
})

function remember(date, start, finish, time) {
  data.push([date, start, finish, time])
  localStorage.setItem( 'stopwatch', JSON.stringify(data) );
}

function getTime(t) {
  var year = new Date(t).getFullYear(),
    month = new Date(t).getMonth()+1,
    day = new Date(t).getDate(),
    h = new Date(t).getHours() - 3,
    m = new Date(t).getMinutes(),
    s = new Date(t).getSeconds(),
    sec = s + m*60
    return [year, pad(month), pad(day), pad(h), pad(m), pad(s), sec]
}

function pad(val) {
  return val < 10 ? '0' + val : val
}

function showTime(h,m,s) {
  hEl.textContent = h
  mEl.textContent = m
  sEl.textContent = s
}

function showData() {
  result.innerHTML = ''
  var d = JSON.parse( localStorage.getItem('stopwatch') )
  for (let item of d) {
    var date = getTime(item[0]),
        time = getTime(item[3]),
        sec = Math.round(item[3]/1000)
    // console.log( item[3]/1000 );
    
    result.innerHTML += `[${date[2]}.${date[1]}.${date[0]}]  ${time[3]}:${time[4]}:${time[5]} - ${sec}s<br>` 
  }

  
}


