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
            animation = options.animation;

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
                    e.preventDefault();
                    $subMenu.slideDown();
                });
            }
        });
    }

    var touchMenu = new MenuController({
        $menu: $('.main-menu'),
        animation: 'slide'
    });


})(jQuery);