
d3.json('data.json', function (data) {
  // CSV section
    data.keys.shift() // remove the variable value


    //setup svg canvas
    d3.select("body")
        .append("svg:svg")
            .attr("width", 960)
            .attr("height", 450)
            .attr("id", "charts")
            .on("click", clickypie)
            .append("svg:rect")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("stroke", "#000")
                .attr("stroke-width", 3)
                .attr("fill", "none")
    function face_factory(classname, data, x, y)
    {
        //data format
        //{ "x": 0 - 1 , "y": 0 -1, "z": 0-1, "w":0-1 }

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
                .attr("r", r);

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
                .attr("d", mouth_line(mouth_x));

        console.log("create eyes")
        var eyer = r/10 + data.z * (r/3);
        console.log(eyer);
        var left_eye = face.append("svg:circle")
            .attr("class", "eyes")
            .attr("stroke", "#000")
            .attr("fill", "none")
            .attr("stroke-width", 4)
            .attr("transform", "translate(" + [-r/2.5, -r/3] + ")")
            .attr("r", eyer);

        //eyer = r/10 + data.w * (r/3);
        var right_eye = face.append("svg:circle")
            .attr("class", "eyes")
            .attr("stroke", "#000")
            .attr("fill", "none")
            .attr("stroke-width", 4)
            .attr("transform", "translate(" + [r/2.5, -r/3] + ")")
            .attr("r", eyer);


    }




    count = 0
    function clickypie()
    {
        count += 1;
        var xy = d3.svg.mouse(this);
        //var r = 20 + Math.random() * 50;
        //var r = 70;
        //var data = d3.range(10).map(Math.random)
        var data = { "x":data.Grades, "y":data.Sport, "z":data.Alcohol, "w":data.Gdp };
        face_factory("face"+count, data, xy[0], xy[1]);
    };
})
