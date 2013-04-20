/* RunCalculendar */

var $rcmax = 0.3988;  // XXX magic #, marathon in 2:10:00 (ish)
var $rcmin = 0.9260;  // XXX magic #, marathon in 6:30:00 (ish)

/* converter functions */
function mtomi ( $meters ) {
    $meters = parseInt( $meters );
	return( ( $meters / 1609.3 ).toFixed(2) );
}

function mitom ( $miles ) {
	$miles = parseFloat( $miles );
	return( ( $miles * 1609.3 ).toFixed(0) );
}

function Runcal ( $meters, $seconds ) {
	$a = runa( $meters, $seconds );
	return( convatorc( $a ) );
}

function Runtime ( $meters, $rc ) {
//
}

function runa( $meters, $seconds ) {
	$miles = mtomi( $meters );
	$mm = ( $seconds / 60 ) / $miles;

	console.log( " runa: $miles, $mm" );

	$min = 0; $max = 2; $tol = 0.0001, $done = 0;
	while( $done < 20 ) {
		$a = ($min + $max) / 2;
		$calcmm = $a * Math.log( $meters ) + ( ( 8.68 * $a ) - 2.9 );
		console.log( $done + ") " + $a + " = " + $calcmm );
		if( Math.abs( $mm - $calcmm ) < $tol ) {
			return( $a );
		} else if ( $calcmm < $mm ) {
			$min = $a;
		} else {
			$max = $a;
		}
		$done++;
	}
	return( 0 );
}

function convatorc( $a ) {
	return( 1 - ( ( $a - $rcmax ) / ( $rcmin - $rcmax ) ) );
}

function convrctoa( $rc ) {
	return( $rcmin - ( $rcmin * $rc ) + ( $rcmax * $rc ) );
}
