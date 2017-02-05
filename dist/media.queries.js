/**
*  jQuery mediaQueries
*  @name media.queries.js
*  @author Adrian Calvet (acalvetgonzalez@gmail.com)
*  @version 1.0
*  @date 21/01/2017
*  @category jQuery Plugin
*  @copyright (c) 2015 [Adrian Calvet] ([acalvet.com])
*  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.

*  Future Features:
*  · Include event to orientation change
*/

var mediaQueries = (function(document, window, jQuery) {

  // Resizer Module
  var resizer = (function(document, window, jQuery){

    var _this = this,
        _curr_width = 0,
        _curr_height = 0,
        _last_width = 0,
        _last_height = 0,
        _timer = null;

    var obj = function(){

        _this._curr_width = jQuery(window).width();
        _this._curr_height = jQuery(window).height();

        if( (_this._curr_width !== _this._last_width) || 
            (_this._curr_height !== _this._last_height) ) {

          window.clearTimeout(_this._timer);

          _this._timer = window.setTimeout(function() {

            var e = jQuery.Event("resolution.change");
                e.width = _this._curr_width;
                e.height = _this._curr_height;

            jQuery(document).trigger(e); // Lanzamos

            _this._last_width = _this._curr_width;
            _this._last_height = _this._curr_height;

          });

        }

    }

    jQuery(window).resize(obj);

  })(document, window, jQuery);

  // Media Queries Module

  var _mediaQueries = [];

  var _update = function(e){

    for(i = 0; i < _mediaQueries.length; i++){
      var mQ = _mediaQueries[i];

      if( (mQ.range[0] >= e.width) && (mQ.range[1] <= e.width) ){

        if(mQ.state === undefined || mQ.state === false){

          var c = jQuery.Event('event_' + mQ.range[0] + '_' + mQ.range[1]);
          jQuery(document).trigger(c);

          _mediaQueries[i].state = true;

        }else{

          if(mQ.state === true){

            var c = jQuery.Event('reset_' + mQ.range[0] + '_' + mQ.range[1]);
            jQuery(document).trigger(c);

            _mediaQueries[i].state = false;

          }

        }

      }

    }

  }

  var _define = function(mQ){
    _mediaQueries.push(mQ);
  }

  var _execute = function(w, h){

    var e = jQuery.Event("resolution.change");
        e.width = w;
        e.height = h;

    jQuery(document).trigger(e); // Lanzamos

  }

  jQuery(document).on('resolution.change', _update);

  return {
    define : _define,
    execute : _execute,
  };

})(document, window, jQuery);
