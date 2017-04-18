$(document).ready(function(){
    // responsive navigation 
    $('#menu-toggle').on('click', function(e){

        $('.g-nav').slideToggle(200);

        $(document).one('click', function(){
            $('.g-nav').slideUp(200);
        });

        e.stopPropagation();
    });

    $('.g-nav').on('click', function(e){
        e.stopPropagation();
    });
    
    /*
    *  navbar
    */
    if($(window).width() > 695) {

        var header = $('.g-header');
        var header_h = header.outerHeight();
        var appLogo = $('.g-logo');
        var navText = $('.g-nav a');

        var themeColorFlag = $('.g-banner').attr('data-theme');

        var scFlag = $(document).scrollTop();

        $(document).scroll(function(){

            var scrollTop = $(this).scrollTop();

            if(scrollTop > header_h) {

                if(scrollTop > 3*header_h) {
                    header.addClass('headerUp');
                }
                header.css({
                    'background-color': 'rgba(255, 255, 255, .98)',
                    'box-shadow': '0 1px 12px rgba(0, 0, 0, .08)'
                });
                appLogo.css({
                    'background': 'url(/assets/icons/logo_' + themeColorFlag + '.svg) no-repeat center',
                    'background-size': '100% 100%'
                });
                navText.css('color', '#666');
                $('.g-nav').addClass('nav-' + themeColorFlag);

            }else{

                header.removeClass('headerUp');
                header.css({
                    'background-color': 'transparent',
                    'box-shadow': 'none'
                });
                appLogo.css({
                    'background': 'url(/assets/icons/logo.svg) no-repeat center',
                    'background-size': '100% 100%'
                });
                navText.css('color', '#fff');
                $('.g-nav').removeClass('nav-' + themeColorFlag);

            }
            // scroll action
            if(scFlag > scrollTop) {
                header.addClass('headerDown');
            }else{
                header.removeClass('headerDown');
            }
            scFlag = scrollTop;
        });
    }

    /*
    * Post cover resize
    */

    function postCover(img, container) {
        var imgWidth = img.width(),
            containerWidth = container.width(),
            imgHeight = img.height(),
            containerHeight = container.height();
        
        if(imgHeight < containerHeight) {
            img.css({
                'width': 'auto',
                'height': '100%'
            });
            imgWidth = img.width(),
            containerWidth = container.width();
            var marginLeft = (imgWidth - containerWidth) / 2;
            img.css('margin-left', '-' + marginLeft + 'px');
        } else {
            var marginTop = (containerHeight - imgHeight) / 2;
            img.css('margin-top', marginTop + 'px');
        }
    }

    postCover($('#postCover'), $('.g-banner'));
    
    $('.read-next-item section').each(function(){
        var _this = $(this),
            n = _this.height(),
            rn = $('.read-next-item').height();
        _this.css('margin-top', (rn-n)/2 + 'px');
    });

    $('.read-next-item img').each(function(){
        var _this = $(this);
        postCover(_this, $('.read-next-item'));
    });
    
});