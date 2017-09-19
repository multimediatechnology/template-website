import $ from 'jquery'

// global
import 'bootstrap'
import 'styles/main.scss'

$('a.page-scroll').bind('click', function (event) {
  let href = $(this).attr('href')
  $('html, body').stop().animate({
    scrollTop: $(href).offset().top
  }, 1500, 'easeInOutExpo')
  history.pushState({}, '', href)
  event.preventDefault()
})

let $study = $('#study')
let $studyInfo = $('.study-info')
let selectedId

$study.on('change', function () {
  $('.study').addClass('hide')
  selectedId = $study.val()
  if (selectedId) {
    $studyInfo.addClass('hide')
  } else {
    $studyInfo.removeClass('hide')
  }
  let $selectedStudy = $('#' + selectedId)
  $selectedStudy.removeClass('hide')
})

selectedId = $study.val() || undefined
if (selectedId) {
  $studyInfo.addClass('hide')
  $study.trigger('change')
} else {
  $studyInfo.addClass('hide')
}

// Highlight the top nav as scrolling occurs
$('body')
  .scrollspy({
    target: '.navbar.fixed-top'
  })

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
  $('.navbar-toggle:visible').click()
})

window.addEventListener('updateready', window.location.reload)

if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
  window.location.reload()
}

// Map
let map
if (!google) {
  throw new Error('No Google :(')
}
let $map = $('#map').show()

let setScroll = function (option) {
  if (!map) {
    return
  }
  map.setOptions({scrollwheel: option})
}

let initialize = function () {
  map = new google.maps.Map($map[0], {
    zoom: 11,
    scrollwheel: false,
    center: new google.maps.LatLng(47.761026, 13.069313)
  })

  let uni = [
    {
      name: 'Fachhochschule Salzburg',
      marker: new google.maps.Marker({
        position: new google.maps.LatLng(47.723379, 13.087777),
        map: map,
        title: 'Fachhochschule Salzburg'
      }),
      infowindow: new google.maps.InfoWindow({
        content: '<h2 class="section-heading">Dein Studienort</h2>' +
        '<h3 class="section-subheading text-muted">' +
        'Fachhochschule Salzburg' +
        ' <a href="https://www.google.com/maps/place/Fachhochschule+Salzburg/" title="In Google Maps öffnen">' +
        '<i class="fa fa-external-link"></i>' +
        '</a>' +
        '</h3>'
      })
    }, {
      name: 'Universität Salzburg',
      marker: new google.maps.Marker({
        position: new google.maps.LatLng(47.8221456, 13.0385173),
        map: map,
        title: 'Universität Salzburg'
      }),
      infowindow: new google.maps.InfoWindow({
        content: '<h2 class="section-heading">Dein Studienort</h2>' +
        '<h3 class="section-subheading text-muted">' +
        'Universität Salzburg' +
        ' <a href="https://www.google.com/maps/place/Fachbereich+Computerwissenschaften+-+Universität+Salzburg" title="In Google Maps öffnen">' +
        '<i class="fa fa-external-link"></i>' +
        '</a>' +
        '</h3>'
      })
    }
  ]

  for (let i = 0; i < uni.length; i += 1) {
    let u = uni[i]
    u.infowindow.open(map, u.marker)
    /*jshint -W083 */
    google.maps.event.addListener(u.marker, 'click', function () {
      u.infowindow.open(map, u.marker)
    })
  }

  google.maps.event.addListener(map, 'mousedown', function () {
    setScroll(true)
  })
}

$('body').on('mousedown', function (event) {
  let insideMap = $(event.target).parents('#map').length > 0

  if (!insideMap) {
    setScroll(false)
  }
})

$(window).scroll(function () {
  setScroll(false)
})

google.maps.event.addDomListener(window, 'load', initialize)
