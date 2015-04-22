function InitChart() {
/** THE DATA */
    var data = 
    [
        {
            "Client": "ABC",
            "sale": "202",
            "year": "2000"
        },
        {
            "Client": "ABC",
            "sale": "215",
            "year": "2002"
        },
        {
            "Client": "ABC",
            "sale": "179",
            "year": "2004"
        },
        {
            "Client": "ABC",
            "sale": "199",
            "year": "2006"
        },
        {
            "Client": "ABC",
            "sale": "134",
            "year": "2008"
        },
        {
            "Client": "ABC",
            "sale": "176",
            "year": "2010"
        },
        {
            "Client": "XYZ",
            "sale": "100",
            "year": "2000"
        },
        {
            "Client": "XYZ",
            "sale": "215",
            "year": "2002"
        },
        {
            "Client": "XYZ",
            "sale": "179",
            "year": "2004"
        },
        {
            "Client": "XYZ",
            "sale": "199",
            "year": "2006"
        },
        {
            "Client": "XYZ",
            "sale": "134",
            "year": "2008"
        },
        {
            "Client": "XYZ",
            "sale": "176",
            "year": "2013"
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

        // Split up the big data array into groups using the key
        dataGroup = SplitDataByKey( data, 'Client' ),

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
                        GetMin( dataGroup[1].values, 'year' ),
                        GetMax( dataGroup[1].values, 'year' )
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
                        GetMin( dataGroup[1].values, 'sale' ),
                        GetMax( dataGroup[1].values, 'sale' )
                    ] ),

        // Create the x axis
        xAxis = d3.svg
                .axis()
                .scale( xScale ),
        
        // Create the y axis
        yAxis = d3.svg
                .axis()
                .scale( yScale )
                .orient("left");

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

    // PLOT LINES
    var lineGen = d3.svg.line()

    .x(function( d ) {
        return xScale( d.year );
    })

    .y(function( d ) {
        return yScale( d.sale );
    })
    .interpolate("basis"); // make line smooth

/** END PLOT AREA */   

/** DRAW LINES */
    dataGroup.forEach( function( done, index ) {
        vis.append( 'svg:path' )
            .attr( 'd', lineGen( done.values ) )
            .attr( 'stroke', GetRandomColour() )
            .attr( 'stroke-width', 2 )
            .attr( 'fill', 'none' );
    });
/** END LINES */
}

/**
 * Get Minimum value of column from data set
 *
 * @todo how to get min from multidimensional data set?
 */
function GetMin( data, column ) {
    // min gets the minimum data value from a range
    var min = d3.min( data, function( done ) {
        return done[column]; // same as done.year
    })

    return min;
}

/**
 * Get Maximum value of column from data set
 * 
 * @todo how to get max from multidimensional data set?
 */
function GetMax( data, column ) {
    // max gets the maximum data value from a range
    var max = d3.max( data, function( done ) {
        return done[column]; // same as done.year
    })

    return max;
}

/**
 * Function to split data by key
 * Saves having two data arrays in the code
 * Keeps messy anonymous functions out of the code
 *
 */
function SplitDataByKey( data, key ){
    // nest splits the data by a given key
    var dataGroup = d3.nest().key( function( done ) {
        return done[key];
    } )
    .entries( data );

    return dataGroup;
}

/**
 * Get random colour for lines of the graph
 *
 * @todo pass parameter to ensure the same colour is not used twice
 */
function GetRandomColour(){

    var colour = function() {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
    }

    return colour;
}

InitChart();