function InitChart() {
    // THE DATA
    var data = 
    [
        {
            "sale": "202",
            "year": "2000"
        }, {
            "sale": "215",
            "year": "2001"
        }, {
            "sale": "179",
            "year": "2002"
        }, {
            "sale": "199",
            "year": "2003"
        }, {
            "sale": "134",
            "year": "2003"
        }, {
            "sale": "176",
            "year": "2010"
        }
    ];


    // INITIALISATION
    var vis         = d3.select( "#visualisation" ),
        WIDTH       = 1000,
        HEIGHT      = 500,
        MARGINS     = 
        {
            top     : 20,
            right   : 20,
            bottom  : 20,
            left    : 50
        },

        // Set the axes
        xScale = d3.scale.linear().range( [MARGINS.left, WIDTH - MARGINS.right] ).domain( [2000,2010] ),
        yScale = d3.scale.linear().range( [HEIGHT - MARGINS.top, MARGINS.bottom] ).domain( [134,215] ),

        // Create the axes
        xAxis = d3.svg.axis().scale( xScale ),
        yAxis = d3.svg.axis().scale( yScale ).orient("left");

    // APPEND X AXIS
    vis.append("svg:g")
        .attr( "transform", "translate(0," + ( HEIGHT - MARGINS.bottom ) + ")" )
        .call( xAxis );

    // APPEND Y AXIS
    vis.append("svg:g")
        .attr( "transform", "translate(" + ( MARGINS.left ) + ",0)" )
        .call( yAxis );

    }

InitChart();