var map = new Datamap({
  element: document.getElementById('container'),
  geographyConfig: {
    dataJson: 'https://rawgit.com/markmarkoh/datamaps/master/src/js/data/prt.json'
  },
  scope: 'prt',
  setProjection: function(element, options) {
                  var projection, path;
                  projection = d3.geo.mercator()
                      .center([-8.80, 38.45])
                      .scale(3000)
                      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
                    path = d3.geo.path().projection( projection );
                    return {path: path, projection: projection};
                  }

});
