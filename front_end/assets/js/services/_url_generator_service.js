;(function(app) {
  // This code is largely copied from jquery's "params" function.
  app.service('UrlGeneratorService', function() {

    function buildParams( prefix, obj, traditional, add ) {
      if ( _.isArray(obj) ) {
	// Serialize array item.
	jQuery.each( obj, function( i, v ) {
	  if ( traditional || /\[\]$/.test( prefix ) ) {
	    // Treat each array item as a scalar.
	    add( prefix, v );

	  } else {
	    // If array item is non-scalar (array or object), encode its
	    // numeric index to resolve deserialization ambiguity issues.
	    // Note that rack (as of 1.0.0) can't currently deserialize
	    // nested arrays properly, and attempting to do so may cause
	    // a server error. Possible fixes are to modify rack's
	    // deserialization algorithm or to provide an option or flag
	    // to force array serialization to be shallow.
	    buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
	  }
	});

      } else if ( !traditional && obj != null && typeof obj === "object" ) {
	// Serialize object item.
	jQuery.each( obj, function( k, v ) {
	  buildParams( prefix + "[" + k + "]", v, traditional, add );
	});

      } else {
	// Serialize scalar item.
	add( prefix, obj );
      }
    }

    return {
      // Serialize an array of form elements or a set of
      // key/values into a query string
      toParams: function( a, traditional ) {
        var s = [], add = function( key, value ) {
	  // If value is a function, invoke it and return its value
	  value = _.isFunction(value) ? value() : value;
	  s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        for ( var prefix in a ) {
	  buildParams( prefix, a[prefix], true, add );
        }
        // Return the resulting serialization
        return s.join("&");
      }
    }
  });
})(window.bunsen);
