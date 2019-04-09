var speed = 16;
var width = 240;
var height = 480;

var svg = d3.select('#svg-holder').append('svg')
            .attr("width", width)
            .attr("height", height);


var y = d3.scaleLinear().domain([0, 32]).range([height, 0]);

draw();

function draw() {
    var bar = svg.selectAll('rect')
            .data([speed])
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', function(d) { return y(d); })
            .attr('width', 25)
            .attr('height', function(d) { return height - y(d); })
            .attr("fill", "red");
            
    var text = svg.selectAll('text')
        .data([speed])
        .enter().append('text')
        .attr('x', 64)
        .attr('y', 32)
        .text(function(d) { return "Speed: " + d + "km/h"; });
}

function redraw(datum) {
    var bar = svg.selectAll('rect').data([datum]);

    bar.transition()
        .duration(1000)
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d);});
        
    var text = svg.selectAll('text').data([datum]).transition()
//        .enter().append('text')
        .text(function(d) { return "Speed: " + d + "km/h"; } );
        
}



// setInterval(function(), time_ms);
d3.interval(function(){   
            // add or subtract based on value of Math.random()
            // if < 0.5 then -1, else 1
            speed += Math.random() < 0.5 ? -1 : 1;
            console.log(speed);
            redraw(speed);
         }, 1000);
