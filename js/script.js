(function($){

    //touch menu:

    $('.touch-menu-control').click(function(e){
        e.preventDefault();

        var $mainWrap = $('html');

        if($mainWrap.hasClass('open-touch-menu')) {
            $mainWrap.removeClass('open-touch-menu');
        } else {
            $mainWrap.addClass('open-touch-menu');
        }
    });

    function MenuController(options) {
        var $menuItem = options.$menu.find('li'),
            animation = options.animation,
            $body = $('body'),
            touchMenuWidth = options.touchMenuWidth;

        $menuItem.each(function(){
            var $subMenu = $(this).children('ul');
            if(!$subMenu[0]) return;

            if(animation == 'fade') {
                $(this).hover(
                    function(e){
                        if($subMenu[0].offsetWidth) return;
                        $subMenu.fadeIn(200);
                    },
                    function(e){
                        $subMenu.fadeOut(200);
                    }
                );
            }
            if(animation == 'slide') {
                $(this).on('click',function(e){
                    if($subMenu[0].offsetWidth) return;
                    if($body.width() > touchMenuWidth) {
                        return;
                    }
                    e.preventDefault();
                    $subMenu.slideDown();
                });
            }
        });
    }

    var touchMenu = new MenuController({
        $menu: $('.main-menu'),
        animation: 'slide',
        touchMenuWidth: 1023
    });


    //contacts map:
    function ContactsMap(options) {
        var mapWrap = options.mapWrap || document.getElementById('map'),
            mLat = options.centerCoords.lat || 59.921947,
            mLon = options.centerCoords.lon || 30.333273,
            zoom = options.zoom || 13,
            marker = options.marker,
            routePicture = options.routePicture,
            routeCoords = options.routeCoords,
            map;

        var styles = [{
            stylers: [
                { saturation: -100 },
                { lightness: 15 }
            ]},
            {
                featureType: "administrative.locality",
                elementType: "all",
                stylers: [
                    { visibility: "off" }
                ]
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: [
                    { visibility: "off" }
                ]
            },
            {
                featureType: "water",
                stylers: [
                    { hue: "#adc9fd" },
                    { saturation: 0 },
                    { lightness: 5 }
                ]

            }];

        function initialize() {

            // Create a new StyledMapType object, passing it the array of styles,
            // as well as the name to be displayed on the map type control.
            var styledMap = new google.maps.StyledMapType(styles,
                {name: "Styled Map"});

            // Create a map object, and include the MapTypeId to add
            // to the map type control.
            var mapOptions = {
                zoom: zoom,
                center: new google.maps.LatLng(mLat, mLon),
                mapTypeControl: false,
                streetViewControl:false,
                panControl:false,
                scrollwheel:false
            };
            map = new google.maps.Map(mapWrap, mapOptions);

            //Associate the styled map with the MapTypeId and set it to display.
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
        }

        initialize();

        var markerCoords = new google.maps.LatLng(marker.coords.lat, marker.coords.lon);
        var settedMarker = new google.maps.Marker({
            position: markerCoords,
            map: map,
            icon: marker.markerImg,
            title: marker.title
        });

        if(routePicture) {
            var layerplace = new google.maps.LatLngBounds(
                new google.maps.LatLng(routeCoords.bottomLeftCorner.lat,routeCoords.bottomLeftCorner.lng),
                new google.maps.LatLng(routeCoords.topRightCorner.lat,routeCoords.topRightCorner.lng)
            );
            var layer = new google.maps.GroundOverlay(
                routePicture,
                layerplace);
            layer.setMap(map);
        }


    }

    window.ContactsMap = ContactsMap;


})(jQuery);