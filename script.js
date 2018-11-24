d3.select('head').append('title').text('Scatterplot')
 d3.json('data.json', function (data) {
 // CSV section
   data.keys.shift() // remove the variable value
   var body = d3.select('body')
   // Select X-axis Variable
   var span = body.append('span')
     .text('Select a comparison variable: ')
   var yInput = body.append('select')
       .attr('id','xSelect')
       .on('change',xChange)
     .selectAll('option')
       .data(data.keys)
       .enter()
     .append('option')
       .attr('value', function (d) { return d })
       .text(function (d) { return d ;})
   body.append('br')

   // Select Y-axis Variable
  /* var span = body.append('span')
       .text('Select a variable for the Y-axis: ')
   var yInput = body.append('select')
       .attr('id','ySelect')
       .on('change',yChange)
     .selectAll('option')
       .data(data.keys)
       .enter()
     .append('option')
       .attr('value', function (d) { return d })
       .text(function (d) { return d ;})
   body.append('br') */ //Está comentado porque não é suposto poder alterar a variável no Y-axis

   // Variables
   var body = d3.select('body')
   var margin = { top: 50, right: 50, bottom: 50, left: 50 }
   var h = 250 - margin.top - margin.bottom
   var w = 400 - margin.left - margin.right
   var formatPercent = d3.format('.2%')
   // Scales
   var colorScale = d3.scale.category20()
   var xScale = d3.scale.linear()
     .domain([
       d3.min([0,d3.min(data.values,function (d) { return d['Sport'] })]),
       d3.max([0,d3.max(data.values,function (d) { return d['Sport'] })])
       ])
     .range([0,w])
   var yScale = d3.scale.linear()
     .domain([
       d3.min([0,d3.min(data.values,function (d) { return d['Alcohol'] })]),
       d3.max([0,d3.max(data.values,function (d) { return d['Alcohol'] })])
       ])
     .range([h,0])
   // SVG
   var svg = body.append('svg')
       .attr('height',h + margin.top + margin.bottom)
       .attr('width',w + margin.left + margin.right)
     .append('g')
       .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
   // X-axis
   var xAxis = d3.svg.axis()
     .scale(xScale)
     //.tickFormat(formatPercent) //Pus como comentário para tirar as percentagens dos eixos
     .ticks(5)
     .orient('bottom')
   // Y-axis
   var yAxis = d3.svg.axis()
     .scale(yScale)
     //.tickFormat(formatPercent) //Pus como comentário para tirar as percentagens dos eixos
     .ticks(5)
     .orient('left')
   // Circles
   var circles = svg.selectAll('circle')
       .data(data.values)
       .enter()
     .append('circle')
       .attr('cx',function (d) { return xScale(d['Sport']) })
       .attr('cy',function (d) { return yScale(d['Alcohol']) })
       .attr('r','5')
       .attr('stroke','black')
       .attr('stroke-width',0.5)
       .attr('fill','LightGreen')
       .on('mouseover', function () {
         d3.select(this)
           .transition()
           .duration(500)
           .attr('r',10)
           .attr('stroke-width',2)
       })
       .on('mouseout', function () {
         d3.select(this)
           .transition()
           .duration(500)
           .attr('r',5)
           .attr('stroke-width',0.5)
       })
     .append('title') // Tooltip
       .text(function (d) { return d.variable })
   // X-axis
   svg.append('g')
       .attr('class','axis')
       .attr('id','xAxis')
       .attr('transform', 'translate(0,' + h + ')')
       .call(xAxis)
     .append('text') // X-axis Label
       .attr('id','xAxisLabel')
       .attr('y',-10)
       .attr('x',w)
       .attr('dy','.71em')
       .style('text-anchor','end')
       .text('Sport')
   // Y-axis
   svg.append('g')
       .attr('class','axis')
       .attr('id','yAxis')
       .call(yAxis)
     .append('text') // y-axis Label
       .attr('id', 'yAxisLabel')
       .attr('transform','rotate(-90)')
       .attr('x',0)
       .attr('y',5)
       .attr('dy','.71em')
       .style('text-anchor','end')
       .text('Alcohol')

   function yChange() {
     var value = this.value // get the new y value
     yScale // change the yScale
       .domain([
         d3.min([0,d3.min(data.values,function (d) { return d[value] })]),
         d3.max([0,d3.max(data.values,function (d) { return d[value] })])
         ])
     yAxis.scale(yScale) // change the yScale
     d3.select('#yAxis') // redraw the yAxis
       .transition().duration(0.2)
       .call(yAxis)
     d3.select('#yAxisLabel') // change the yAxisLabel
       .text(value)
     d3.selectAll('circle') // move the circles
       .transition().duration(0.2)
       .delay(function (d,i) { return i*1})
         .attr('cy',function (d) { return yScale(d[value]) })
   }

   function xChange() {
     var value = this.value // get the new x value
     xScale // change the xScale
       .domain([
         d3.min([0,d3.min(data.values,function (d) { return d[value] })]),
         d3.max([0,d3.max(data.values,function (d) { return d[value] })])
         ])
     xAxis.scale(xScale) // change the xScale
     d3.select('#xAxis') // redraw the xAxis
       .transition().duration(0.2)
       .call(xAxis)
     d3.select('#xAxisLabel') // change the xAxisLabel
       .transition().duration(0.2)
       .text(value)
     d3.selectAll('circle') // move the circles
       .transition().duration(0.2)
       .delay(function (d,i) { return i*1})
         .attr('cx',function (d) { return xScale(d[value]) })
   }
 })
