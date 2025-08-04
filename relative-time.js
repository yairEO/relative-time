;(function(root, factory){
  var define = define || {};
  if( typeof define === 'function' && define.amd )
      define([], factory);
  else if( typeof exports === 'object' && typeof module === 'object' )
      module.exports = factory();
  else if(typeof exports === 'object')
      exports["RelativeTime"] = factory()
  else
      root.RelativeTime = factory()
}(this, function(){
  // in miliseconds
  const UNITS = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365/12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
  }

  const DEFAULTS = {
    locale: 'en',
    options: { numeric: 'auto' }
  }

  function rtfFromSettings(settings) {
    settings = settings || {}
    settings = {
      locale: settings.locale || DEFAULTS.locale,
      options: {...DEFAULTS.options, ...settings.options}
    }

    return new Intl.RelativeTimeFormat(settings.locale, settings.options)
  }

  function from(rtf, d1, d2) {
    const elapsed = d1 - (d2 || new Date())

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (let u in UNITS)
      if (Math.abs(elapsed) > UNITS[u] || u == 'second')
        return rtf.format(Math.round(elapsed/UNITS[u]), u)
  }

  function RelativeTime( settings ){
    this.rtf = rtfFromSettings(settings)
  }

  RelativeTime.prototype = {
    // returns d1 relative to d2 time string in locale format
    from(d1, d2){
      return from(this.rtf, d1, d2)
    }
  }

  RelativeTime.from = function(d1, d2, settings){
    return from(rtfFromSettings(settings), d1, d2)
  }

  return RelativeTime
}));