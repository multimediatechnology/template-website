(function () {
  if (window.lanyrdBadge) {
    return
  }
  window.lanyrd_badge_els = []
  window.lanyrdBadgeIframes = []
  window.lanyrdBadge = {}
  window.lanyrdBadges = {init: o}
  var c = 'http://cdn.lanyrd.net/'
  var n = 'http://badges.lanyrd.net/badges/embed/'
  if (location.protocol == 'https:') {
    c = 'https://s3.amazonaws.com/static.lanyrd.net/'
    n = 'https://lanyrd.com/badges/embed/'
  }
  var m = 'lanyrd-', k = document.getElementsByTagName('head')[0]

  function o() {
    var v = i(), p = 0, s, t, r = true, u = ''
    for (var q = v.length; q--;) {
      s = v[q]
      t = j(v[q])
      if (t) {
        r = r && !t.options.nostyles
        lanyrd_badge_els[p] = s
        u += 'b=' + encodeURIComponent(h(t)) + '&'
        p++
      }
    }
    if (r) {
      d()
    }
    a(u)
    e()
  }

  function b(r, p, q) {
    if (r.addEventListener) {
      r.addEventListener(p, q, false)
    } else {
      if (r.attachEvent) {
        r.attachEvent('on' + p, q)
      }
    }
  }

  function e() {
    if (e._executed) {
      return
    }
    e._executed = true
    b(window, 'message', function (q) {
      var r = q.data.split(':'), p = lanyrdBadgeIframes[r[0]]
      if (p && q.origin.indexOf('lanyrd.') != -1) {
        p.style.height = r[1] + 'px'
      }
    })
  }

  function d() {
    var p = document.createElement('link')
    p.href = c + 'badges/embed-v1.min.css'
    p.rel = 'stylesheet'
    k.appendChild(p)
  }

  function a(q) {
    var p = document.createElement('script')
    p.src = n + '?' + q
    k.appendChild(p)
  }

  function h(s) {
    var r = s.slug + '.' + s.type, p = s.options
    for (var q in p) {
      r += '.' + q
      if (p[q] !== true) {
        r += '-' + p[q].replace('-', '%2D').replace('.', '%2E')
      }
    }
    return r
  }

  var j = (function () {
    var p = /^https?:\/\/lanyrd\.com\/(?:\w+)\/([^\/]+)\/?/i,
      q = /^https?:\/\/lanyrd\.com\/((?:\d{3,4})\/(?:[^\/]+))\//i,
      t = /^https?:\/\/(?:dev\.)?lanyrd\.(?:com|org)\/((?:\d{3,4})\/(?:[^\/]+))\/(speakers|attendees|trackers)\//i,
      s = /^https?:\/\/(?:dev\.)?lanyrd\.(?:com|org)\/((?:\d{3,4})\/(?:[^\/]+))\/(s[a-z]+)/i

    function u(B, C) {
      var z = B.className.split(/\s+/), A, x = C.options, w
      for (var y = 0, v = z.length; y < v; y++) {
        A = z[y]
        if (A.indexOf(m) === 0) {
          if (!C.type) {
            C.type = A.slice(m.length)
          } else {
            w = A.split('-')
            x[w[1]] = w[2] || true
          }
        }
      }
    }

    function r(A, B) {
      var w = B.options, v = A.attributes, z = 'data-' + m, y
      for (var x = v.length; x--;) {
        y = v[x]
        if (y.nodeName.indexOf(z) === 0) {
          w[y.nodeName.slice(z.length)] = y.nodeValue || true
        }
      }
    }

    return function (w) {
      var v, x = {options: {}}
      u(w, x)
      switch (x.type) {
      case'sessiontrackers':
        v = s.exec(w.href)
        if (v) {
          x.options.sessionid = v[2]
        }
        break
      case'schedule':
        v = q.exec(w.href)
        break
      case'participants':
      case'speakers':
        v = t.exec(w.href)
        if (v) {
          x.options.usertype = v[2]
        }
        break
      default:
        v = p.exec(w.href)
        break
      }
      if (!v) {
        x.options.url = w.href
        x.slug = 'd'
      } else {
        x.slug = v[1]
      }
      r(w, x)
      return x
    }
  })()

  function i() {
    var p, r = []
    if (document.querySelectorAll) {
      p = document.querySelectorAll('a[class*="' + m + '"]')
    } else {
      p = document.getElementsByTagName('a')
    }
    for (var q = p.length; q--;) {
      if ((' ' + p[q].className + ' ').indexOf(' ' + m) != -1 && !p[q]._lanyrdEnhanced) {
        p[q]._lanyrdEnhanced = 1
        r.push(p[q])
      }
    }
    return r
  }

  var g = 0
  lanyrdBadge.jsonpCallbacks = {}

  function l(r, s) {
    var p = document.createElement('script'), q = 'c' + g
    lanyrdBadge.jsonpCallbacks[q] = function () {
      s.apply(null, arguments)
      p.parentNode.removeChild(p)
      p = null
      delete lanyrdBadge.jsonpCallbacks[q]
    }
    p.src = r + 'lanyrdBadge.jsonpCallbacks.' + q
    document.body.insertBefore(p, document.body.firstChild)
    g++
  }

  function f() {
    try {
      document.body.doScroll('up')
      return o()
    } catch (p) {
    }
    if (!executed) {
      setTimeout(f, 30)
    }
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', o, false)
    window.addEventListener('load', o, false)
  } else {
    if (document.attachEvent) {
      document.createElement('abbr')
      f()
    }
  }
  (function () {
    function p(r) {
      r.innerHTML = 'Loading...'
      l(r.href + 'x-json/?callback=', function (s) {
        if (s.ok) {
          r.parentNode.parentNode.innerHTML = s['abstract']
        }
        r = null
      })
    }

    function q(r) {
      r.innerHTML = 'Loading...'
      l(r.getAttribute('data-bio-url') + '?callback=', function (s) {
        if (s.ok) {
          r.parentNode.parentNode.innerHTML = s.bio
        }
        r = null
      })
    }

    b(document.body, 'click', function (s) {
      var u = s.target || s.srcElement, r, t
      if (u.nodeName.toLowerCase() == 'a') {
        t = u.getAttribute('data-lanyrd-action')
        switch (t) {
        case'expand-abstract':
          p(u)
          r = true
          break
        case'expand-bio':
          q(u)
          r = true
          break
        }
        if (r) {
          if (s.preventDefault) {
            s.preventDefault()
          }
          return false
        }
      }
    })
  })()
})()
