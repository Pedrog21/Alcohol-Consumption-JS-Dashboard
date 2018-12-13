
//setup svg canvas
/*d3.select("body")
    .append("svg:svg")
        .attr("width", 400)
        .attr("height", 200)
        .attr("id", "charts")
        .append("svg:rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("stroke", "ghostwhite")
            .attr("stroke-width", 1)
            .attr("fill", "none") */




function face_factory(classname, data, x, y)
{
    //data format
    //{ "x": 0 - 1 , "y": 0 -1, "z": 0-1, "w":0-1 }

    var tooltipmouth = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color","black")
        //.text("Mouth: " + data.y);
        .text(function(){if (data.y >= 0.5) {return "Mouth: High number of Faillures"} else {return "Mouth: Low number of Faillures"}});

        var tooltipeye= d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("color","black")
            .style("visibility", "hidden")
            //.text("Eyes: " + data.z)
            .text(function(){if (data.z >= 0.5) {return "Eyes: > 18 years old"} else {return "Eyes:  < 18 years old"}});


            var tooltiphead= d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("color","black")
                .style("visibility", "hidden")
                //.text("Head: " + data.x);
                .text(function(){if (data.x >= 0.5) {return "Head: High Gdp"} else {return "Head: Low Gdp"}});


    var r = 20 + data.w * 50;

    var face = d3.select("#charts")
        .append("svg:g")
            //.data([data.sort(d3.descending)])
            //.data([data])
            .attr("class", classname)
            .attr("transform", "translate(" + x + "," + y + ")");



    console.log("make head");
    var head_color = d3.scale.linear()
        .domain([0, 1])
        .interpolate(d3.interpolateRgb)
        .range(["#ff0000", "#0000ff"]);


    var head = face.append("svg:circle")
            .attr("class", "head")
            .attr("fill", function(d){ return head_color(data.x); })
            .attr("fill-opacity", .8)
            .attr("stroke", "#000")
            .attr("stroke-width", 4)
            .attr("r", r)
            .on("mouseover", function(){return tooltiphead.style("visibility", "visible");})
            .on("mousemove", function(){return tooltiphead.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
            .on("mouseout", function(){return tooltiphead.style("visibility", "hidden");});

    console.log("make mouth");
    var mouth_x = [0, .5, 1];

    var mouth_x_range = d3.scale.linear()
        .domain([0, 1])
        .range([-r/2, r/2]);


    var mouth_y_range = d3.scale.linear()
        .domain([0, 1])
        .range([-r/2, r/2]);

    var mouth_y = [.5, data.y, .5];
    console.log(mouth_y)

    var mouth_line = d3.svg.line()
        .x(function(d,i) {
            return mouth_x_range(mouth_x[i]);
        })
        .y(function(d,i) {
            return mouth_y_range(mouth_y[i]);
        })
        .interpolate("basis");

    var mouth = face.append("svg:path")
            .attr("class", "mouth")
            .attr("stroke", "#000")
            .attr("stroke-width", 4)
            .attr("fill", "none")
            .attr("transform", "translate(" + [0, r/3] + ")")
            .attr("d", mouth_line(mouth_x))
            .on("mouseover", function(){return tooltipmouth.style("visibility", "visible");})
            .on("mousemove", function(){return tooltipmouth.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
            .on("mouseout", function(){return tooltipmouth.style("visibility", "hidden");});

    console.log("create eyes")
    var eyer = r/10 + data.z * (r/3);
    console.log(eyer);
    var left_eye = face.append("svg:circle")
        .attr("class", "eyes")
        .attr("stroke", "#000")
        .attr("fill", "none")
        .attr("stroke-width", 4)
        .attr("transform", "translate(" + [-r/2.5, -r/3] + ")")
        .attr("r", eyer)
        .on("mouseover", function(){return tooltipeye.style("visibility", "visible");})
        .on("mousemove", function(){return tooltipeye.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltipeye.style("visibility", "hidden");});

    //eyer = r/10 + data.w * (r/3);
    var right_eye = face.append("svg:circle")
        .attr("class", "eyes")
        .attr("stroke", "#000")
        .attr("fill", "none")
        .attr("stroke-width", 4)
        .attr("transform", "translate(" + [r/2.5, -r/3] + ")")
        .attr("r", eyer)
        .on("mouseover", function(){return tooltipeye.style("visibility", "visible");})
        .on("mousemove", function(){return tooltipeye.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltipeye.style("visibility", "hidden");});



}

d3.select("body")
        .append("svg:svg")
            .attr("width", 400)
            .attr("height", 200)
            .attr("id", "charts")
            .append("svg:rect")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("stroke", "ghostwhite")
                .attr("stroke-width", 1)
                .attr("fill", "ghostwhite")

var toggleSelected = true;
count = 0
function clickypieNorte()
{
    count += 1;

    var svg = d3.select("svg");
    var xy;


    svg.on("click", function (d){
        xy = d3.mouse(this);
           if(toggleSelected == true) {
                 d3.select("#charts").remove()
                 d3.select("body")
                         .append("svg:svg")
                             .attr("width", 400)
                             .attr("height", 200)
                             .attr("id", "charts")
                             .append("svg:rect")
                                 .attr("width", "100%")
                                 .attr("height", "100%")
                                 .attr("stroke", "ghostwhite")
                                 .attr("stroke-width", 1)
                                 .attr("fill", "ghostwhite")
              var data = { "x":0, "y":0.33, "z":0, "w":0.67 }
              face_factory("face"+count, data, 100, 100)
              toggleSelected = false;

           } else {
            //  xy = d3.mouse(this)
              var data = { "x":0, "y":0.33, "z":0, "w":0.67 }
              face_factory("face"+count, data, 300, 100)
              toggleSelected = true;

           }
    });

};



function clickypieCentro()
{
    count += 1;

    var svg = d3.select("svg");
    var xy;


    svg.on("click", function (d){
        xy = d3.mouse(this);
           if(toggleSelected == true) {
                 d3.select("#charts").remove()
                 d3.select("body")
                         .append("svg:svg")
                             .attr("width", 400)
                             .attr("height", 200)
                             .attr("id", "charts")
                             .append("svg:rect")
                                 .attr("width", "100%")
                                 .attr("height", "100%")
                                 .attr("stroke", "ghostwhite")
                                 .attr("stroke-width", 1)
                                 .attr("fill", "ghostwhite")
              var data = { "x":0.13, "y":0, "z":0.33, "w":0.67 }
              face_factory("face"+count, data, 100, 100)
              toggleSelected = false;

           } else {
            //  xy = d3.mouse(this)
              var data = { "x":0.13, "y":0, "z":0.33, "w":0.67 }
              face_factory("face"+count, data, 300, 100)
              toggleSelected = true;

           }
    });

};


function clickypieAlgarve()
{
    count += 1;

    var svg = d3.select("svg");
    var xy;


    svg.on("click", function (d){
        xy = d3.mouse(this);
           if(toggleSelected == true) {
                 d3.select("#charts").remove()
                 d3.select("body")
                         .append("svg:svg")
                             .attr("width", 400)
                             .attr("height", 200)
                             .attr("id", "charts")
                             .append("svg:rect")
                                 .attr("width", "100%")
                                 .attr("height", "100%")
                                 .attr("stroke", "ghostwhite")
                                 .attr("stroke-width", 1)
                                 .attr("fill", "ghostwhite")
              var data = { "x":0.5, "y":0.33, "z":1, "w":0.33 }
              face_factory("face"+count, data, 100, 100)
              toggleSelected = false;

           } else {
            //  xy = d3.mouse(this)
              var data = { "x":0.5, "y":0.33, "z":1, "w":0.33 }
              face_factory("face"+count, data, 300, 100)
              toggleSelected = true;

           }
    });

};

function clickypieAlentejo()
{
    count += 1;

    var svg = d3.select("svg");
    var xy;


    svg.on("click", function (d){
        xy = d3.mouse(this);
           if(toggleSelected == true) {
                 d3.select("#charts").remove()
                 d3.select("body")
                         .append("svg:svg")
                             .attr("width", 400)
                             .attr("height", 200)
                             .attr("id", "charts")
                             .append("svg:rect")
                                 .attr("width", "100%")
                                 .attr("height", "100%")
                                 .attr("stroke", "ghostwhite")
                                 .attr("stroke-width", 1)
                                 .attr("fill", "ghostwhite")
              var data = { "x":0.25, "y":0, "z":0.67, "w":1 }
              face_factory("face"+count, data, 100, 100)
              toggleSelected = false;

           } else {
            //  xy = d3.mouse(this)
              var data = { "x":0.25, "y":0, "z":0.67, "w":1 }
              face_factory("face"+count, data, 300, 100)
              toggleSelected = true;

           }
    });

};
function clickypieLisboa()
{
    count += 1;

    var svg = d3.select("svg");
    var xy;


    svg.on("click", function (d){
        xy = d3.mouse(this);
           if(toggleSelected == true) {
                 d3.select("#charts").remove()
                 d3.select("body")
                         .append("svg:svg")
                             .attr("width", 400)
                             .attr("height", 200)
                             .attr("id", "charts")
                             .append("svg:rect")
                                 .attr("width", "100%")
                                 .attr("height", "100%")
                                 .attr("stroke", "ghostwhite")
                                 .attr("stroke-width", 1)
                                 .attr("fill", "ghostwhite")
              var data = { "x":1, "y":0, "z":0.67, "w":0.33 }
              face_factory("face"+count, data, 100, 100)
              toggleSelected = false;

           } else {
            //  xy = d3.mouse(this)
              var data = { "x":1, "y":0, "z":0.67, "w":0.33 }
              face_factory("face"+count, data, 300, 100)
              toggleSelected = true;

           }
    });

};
