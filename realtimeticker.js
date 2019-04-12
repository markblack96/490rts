var speed = 16;


var margin = {top: 32, right: 16, bottom: 32, left: 16},
    width = 240 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;
    
var svg = d3.select('#svg-holder').append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var y = d3.scaleLinear().domain([0, 32]).range([height, 0]);

var y_axis = d3.axisRight().scale(y)
                .ticks(20, "s");

// var gY = svg.append("g").attr("transform", "translate(0, height)").call(y_axis);

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
        
    var gY = svg.append("g").call(y_axis);
    
    /*
    var location_text = svg.selectAll('#location_text')
                            .data([location])
                            .enter()
                            .append('text')
                            .attr('x', 64)
                            .attr('y', 48)
                            .attr('id', 'location_text')
                            .text( function(d) { return "GPS location: " + location.latitude; });
    */
}

function redraw(datum) {
    var bar = svg.selectAll('rect').data([datum]);

    bar.transition()
        .duration(950)
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d);});
        
    var text = svg.selectAll('text').data([datum]).transition()
        .duration(50)
//        .enter().append('text')
        .text(function(d) { return "Speed: " + d + "km/h"; } );
}


var xhttp = new XMLHttpRequest();

// setInterval(function(), time_ms);
d3.interval(function(){   
            // add or subtract based on value of Math.random()
            // if < 0.5 then -1, else 1
            // ds = Math.random() < 0.5 ? -1 : 1;
            xhttp.onreadystatechange = function() {
                if (!isNaN(parseInt(xhttp.responseText)) ) { 
                    ds = parseInt(xhttp.responseText);
                    speed += ds;
                }   
            }
                
            xhttp.open("GET", "http://127.0.0.1:5000/random", true);
            xhttp.send();
            redraw(speed);
         }, 1000);
