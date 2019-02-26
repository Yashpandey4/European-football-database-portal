var api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';


document.addEventListener("DOMContentLoaded", function(event) {
	   fetch(api)
	     .then(function(response) { return response.json(); })
	     .then(function(data) { 
	          var parsedData = parseData(data);
	          drawChart(parsedData);

	     })
	});



function(xTitle,yTitle,chartTitle,data){
	

	function parseData(data) {
	   var arr = [];
	   for (var i in data.bpi) {
	      arr.push(
	         {
	            date: new Date(i),
	            value: +data.bpi[i]
	         });
	   }
	   return arr;
	}

	function drawChart(data) {
	   var svgWidth = 600, svgHeight = 450;
	   var margin = { top: 20, right: 30, bottom: 30, left: 50 };
	   var width = svgWidth - margin.left - margin.right;
	   var height = svgHeight - margin.top - margin.bottom - 50;
	   var svgElem = $('svg');
	   svgElem.css('background-color','#fff');
	   svgElem.css('border','2px gray solid');
	   svgElem.css('margin','1.2rem');

	   var svg = d3.select('svg')
	     .attr("width", svgWidth)
	     .attr("height", svgHeight);
	   var g = svg.append("g")
	   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	   var x = d3.scaleTime().rangeRound([0, width]);
	   var y = d3.scaleLinear().rangeRound([height, 0]);
	   //  create line
	   var line = d3.line()
	   .x(function(d) { return x(d.date)})
	   .y(function(d) { return y(d.value)})
	   x.domain(d3.extent(data, function(d) { return d.date }));
	   y.domain(d3.extent(data, function(d) { return d.value }));

	   g.append("g")
	   .attr("transform", "translate(0," + height + ")")
	   .call(d3.axisBottom(x))
	   .append("text")
	   .attr("fill", "#000")
	   .remove();


	   // X-axis title
	   g.append("g")
	   .attr("transform", "translate("+250+"," + (height+30) + ")")
	   .append("text")
	   .attr("fill", "#000")
	   .text(xTitle)
	   .style("font-size", 10)
	   .style("font-family", "verdana");

	   g.append("g")
	   .attr("transform", "translate("+120+"," + (height+60) + ")")
	   .append("text")
	   .attr("fill", "#000")
	   .text(chartTitle)
	   .style("font-size", 20)
	   .style("font-family", "verdana");



	   g.append("g")
	   .call(d3.axisLeft(y))
	   .append("text")
	   .attr("fill", "#000")
	   .attr("transform", "rotate(-90)")
	   .attr("y", 6)
	   .attr("dy", "0.71em")
	   .attr("text-anchor", "end")
	   .text(yTitle);//y-axis title

	   // path filling according to data 
	   g.append("path")
	   .datum(data)
	   .attr("fill", "none")
	   .attr("stroke", "steelblue")
	   .attr("stroke-linejoin", "round")
	   .attr("stroke-linecap", "round")
	   .attr("stroke-width", 1.5)
	   .attr("d", line);

	}
}
