var result = document.getElementById('result')
var data = JSON.parse(localStorage.getItem('stopwatch'))

// canvas

const WIDTH = 500
const HEIGHT = 250
const PADDING = 40
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const ROWS_COUNT = 5
const VIEW_HEIGH = DPI_HEIGHT - PADDING * 2



showData(data.d)
drawGraph(document.getElementById('canvas'), data.d)




function drawGraph(canvas, d) {
	var c = canvas.getContext('2d')
	canvas.style.width = WIDTH + 'px'
	canvas.style.height = HEIGHT + 'px'
	canvas.width = DPI_WIDTH
	canvas.height = DPI_HEIGHT

	var co = coords(d)
  c.fillStyle = 'Blue'
  c.fillRect(0, 0, 5000, 2500)

	// yAxes
	const [yMin, yMax] = countBoundaries(d)
	const yRatio = VIEW_HEIGH / (yMax - yMin)
	console.log('yRatio', yRatio);
	console.log('yMin', yMin);
	console.log('yMax', yMax);
	
	
	c.beginPath()
	const step = VIEW_HEIGH / ROWS_COUNT
	const textStep = (yMax - yMin) / ROWS_COUNT
	// c.strokeStyle = '#bbb'
	c.fillStyle = 'orange'
	c.font = 'normal 20px Helvetica, sans-serif'
	for (let i = 1; i <= ROWS_COUNT; i++) {
		const y = step * i
		const text = Math.round(yMax - textStep * i)
		console.log('text', text);
		console.log('textStep', textStep);
		
		c.fillText(text.toString(), 0, y + PADDING -5)
		c.moveTo(0, y + PADDING)
		c.lineTo(DPI_WIDTH, y + PADDING)
	}
	c.stroke()
	c.closePath()
	// yAxes
	
	const points = DPI_HEIGHT / co.length * 2
	c.beginPath()
	c.strokeStyle = 'yellow'
	c.lineWidth = 4
  for (let i = 0; i < co.length; i++) {
		console.log('co', co[i][1]);
		c.lineTo(i * points, DPI_HEIGHT - PADDING - co[i][1] * yRatio)
  }
	c.stroke()
	c.closePath()
}

function countBoundaries(d) {
	let min, max

	for (let item of d) {
		var y = Math.round(item.time/1000)
		
		if (typeof min !== 'number') min = y
		if (typeof max !== 'number') max = y

		if (min > y) min = y
		if (max < y) max = y
	}
	return [min, max]
}

function showData(d) {
  result.innerHTML = ''
  for (let item of d) {
    var date = getTime(item.date),
      time = getTime(item.time)
      // sec = Math.round(item.time / 1000)
    result.innerHTML += `[${date[2]}.${date[1]}.${date[0]}]  ${time[3]}:${time[4]}:${time[5]}<br>`
  }
}

function coords(d) {
  var arr = []
	
  for (let item of d) {
		var date = getTime(item.date),
		sec = Math.round(item.time / 1000)
    arr.push([`${date[0]}.${date[1]}.${date[0]}`, sec])
  }
	console.log('coords: arr', arr);
  return arr
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
