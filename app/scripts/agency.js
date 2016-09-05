/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
'use strict';
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var href = $(this).attr('href');
    $('html, body').stop().animate({
      scrollTop: $(href).offset().top
    }, 1500, 'easeInOutExpo')
    history.pushState({}, '', href)
    event.preventDefault()
  })

  var $study = $('#study')
  var $studyInfo = $('.study-info')
  var selectedId

  $study.on('change', function() {
    $('.study').addClass('hide')
    selectedId = $study.val()
    if (selectedId) {
      $studyInfo.addClass('hide')
    } else {
      $studyInfo.removeClass('hide')
    }
    var $selectedStudy = $('#' + selectedId)
    $selectedStudy.removeClass('hide')
  })

  selectedId = $study.val() || undefined
  if (selectedId) {
    $studyInfo.addClass('hide')
    $study.trigger('change')
  } else {
    $studyInfo.addClass('hide')
  }
})

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
  target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  $('.navbar-toggle:visible').click()
})

window.addEventListener('updateready', window.location.reload)

if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
  window.location.reload()
}

// Map
/*global google:false */
$(function() {
  var map
  if (!google) {
    return
  }
  var $map = $('#map').show()

  var setScroll = function(option) {
    if (!map) {
      return
    }
    map.setOptions({scrollwheel: option})
  }

  var initialize = function() {
    map = new google.maps.Map($map[0], {
      zoom: 11,
      scrollwheel: false,
      center: new google.maps.LatLng(47.761026, 13.069313)
    })

    var uni = [
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

    for (var i = 0; i < uni.length; i += 1) {
      var u = uni[i]
      u.infowindow.open(map, u.marker)
      /*jshint -W083 */
      google.maps.event.addListener(u.marker, 'click', function() {
        u.infowindow.open(map, u.marker)
      })
    }

    google.maps.event.addListener(map, 'mousedown', function() {
      setScroll(true)
    })
  }

  $('body').on('mousedown', function(event) {
    var insideMap = $(event.target).parents('#map').length > 0

    if (!insideMap) {
      setScroll(false)
    }
  })

  $(window).scroll(function() {
    setScroll(false)
  })

  google.maps.event.addDomListener(window, 'load', initialize)
})
