function InitChart() {
/** THE DATA */
    var data1 = 
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

    var data2 = 
    [
        {
            "sale": "152",
            "year": "2000"
        }, {
            "sale": "189",
            "year": "2002"
        }, {
            "sale": "179",
            "year": "2004"
        }, {
            "sale": "199",
            "year": "2006"
        }, {
            "sale": "134",
            "year": "2008"
        }, {
            "sale": "176",
            "year": "2010"
        }
    ];
/** END DATA */

/** INITIALISE PLOT AREA */
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

        // Set the x axis
        xScale = d3.scale
                .linear()
                .range( 
                    [
                        MARGINS.left,
                        WIDTH - MARGINS.right
                    ] )
                .domain( 
                    [
                        GetMin( data1, 'year' ),
                        GetMax( data1, 'year' )
                    ] ),
        
        // Set the y axis
        yScale = d3.scale
                .linear()
                .range( 
                    [
                        HEIGHT - MARGINS.top,
                        MARGINS.bottom
                    ] )
                .domain( 
                    [
                        GetMin( data1, 'sale' ),
                        GetMax( data1, 'sale' )
                    ] ),

        // Create the axes
        xAxis = d3.svg.axis().scale( xScale ),
        yAxis = d3.svg.axis().scale( yScale ).orient("left");

    // APPEND X AXIS
    vis.append("svg:g")
        .attr( "class","axis" ) //add class for css
        .attr( "transform", "translate(0," + ( HEIGHT - MARGINS.bottom ) + ")" )
        .call( xAxis );

    // APPEND Y AXIS
    vis.append("svg:g")
        .attr( "class","axis" ) //add class for css
        .attr( "transform", "translate(" + ( MARGINS.left ) + ",0)" )
        .call( yAxis );

    // PLOT LINE
    var lineGen = d3.svg.line()

    .x(function( d ) {
        return xScale( d.year );
    })

    .y(function( d ) {
        return yScale( d.sale );
    })
    .interpolate("basis"); // make line smooth

/** END PLOT AREA */   

/** DRAW LINE (1) */
    vis.append( 'svg:path' )
        .attr( 'd', lineGen( data1 ) )
        .attr( 'stroke', 'green' )
        .attr( 'stroke-width', 2 )
        .attr( 'fill', 'none' );
/** END LINE (1) */

/** DRAW LINE (2) */
    vis.append('svg:path')
        .attr( 'd', lineGen( data2 ) )
        .attr( 'stroke', 'blue' )
        .attr( 'stroke-width', 2 )
        .attr( 'fill', 'none' );
/** END LINE (2) */
}

/**
 * Get Minimum value of column from data set
 *
 */
function GetMin( data, column ) {
    min = d3.min( data, function( done ) {
        return done[column]; // same as done.year
    })
    return min;
}

/**
 * Get Maximum value of column from data set
 */
function GetMax( data, column ) {
    max = d3.max( data, function( done ) {
        return done[column]; // same as done.year
    })
    return max;
}

InitChart();