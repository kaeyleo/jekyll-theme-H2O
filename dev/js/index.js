$(document).ready(function(){
    
    /**
     * Responsive Navigation
     */ 
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
    *  Header Bar
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
    * Post Cover Resize
    */
    function postCover(img, container) {
        var imgWidth = img.width(),
            containerWidth = container.width(),
            imgHeight = img.height(),
            containerHeight = container.height();
        var isOk = false;
        if(imgHeight < containerHeight) {
            img.css({
                'width': 'auto',
                'height': '100%'
            });
            imgWidth = img.width(),
            containerWidth = container.width();
            var marginLeft = (imgWidth - containerWidth) / 2;
            img.css('margin-left', '-' + marginLeft + 'px');
            isOk = true;
        } else {
            var marginTop = (containerHeight - imgHeight) / 2;
            img.css('margin-top', marginTop + 'px');
            isOk = true;
        }

        if(isOk) {
            img.fadeIn();
            isOk = false;
        }
    }

    /**
     * The Post Navigator
     */
    $('.read-next-item section').each(function(){
        var _this = $(this),
            n = _this.height(),
            rn = $('.read-next-item').height();
        _this.css('margin-top', (rn-n)/2 + 'px');
        _this.fadeIn();
    });

    $('.read-next-item img').each(function(){
        var _this = $(this);
        postCover(_this, $('.read-next-item'));
    });

    /**
     * Pagination
     */
    function pagination() {
        var total = parseInt($('#total_pages').val()),
            current = parseInt($('#current_pages').val()),
            baseUrl = $('#base_url').val(),
            limit = 3;

        var link_html = '';

        for(var i = current - limit; i<current; i++) { 
            if(i>0 && i!==1) {
                link_html += '<a href="' + baseUrl + 'page' + i + '" class="page-link page-num">' + i + '</a>';
            }else if(i===1) {
                link_html += '<a href="' + baseUrl + '" class="page-link page-num">' + i + '</a>';
            }
        }

        link_html += '<span class="page-link page-num active">' + current + '</span>';

        for(var j = current + 1; j<=current + limit; j++) { 
            if(j<=total) {
                link_html += '<a href="' + baseUrl + 'page' + j + '" class="page-link page-num">' + j + '</a>';
            }
        }
        
        $('#page-link-container').html(link_html);
    }
    pagination();

    /**
     * Search
     */  
    function Search() {
        var self = this,
            input = $('#search_input'),
            result = $('.search_result');
        
        input.focus(function() {
            $('.icon-search').css('color', '#3199DB');
            result.show();
        });

        input.keyup(debounce(this.autoComplete));

        $(document).click(function(e) {
            if(e.target.id === 'search_input' || e.target.className === 'search_result' || e.target.className === 'search_item') {
                return;
            }
            $('.icon-search').css('color', '#CAD3DC');
            result.hide();
        });
    }

    Search.prototype.autoComplete = function() {
        var keywords = this.value.toLowerCase();
        
        if(keywords.length) {
            $('.icon-search').css('color', '#3199DB');
        }else{
            $('.icon-search').css('color', '#CAD3DC');
        }

        $.getJSON('../../search.json').done(function(data) {
            var html = '';
            for (var i in data) {
                var item = data[i],
                    title = item.title,
                    tags = item.tags,
                    url = item.url;

                var k = title + tags;
                if(keywords !== '' && k.toLowerCase().indexOf(keywords) >= 0) {
                    html += '<a class="search_item" href="' + item.url + '">' + item.title + '</a>';
                }
            }
            $('.search_result').html(html);
        });
    };

    function debounce(fn, delay) {
        var timer;
        delay = delay || 120;

        return function() {
            var ctx = this,
                args = arguments,
                later = function() {
                    fn.apply(ctx, args);
                };
            clearTimeout(timer);
            timer = setTimeout(later, delay);
        };
    }

    new Search();

    /**
     * Night mode
     */
    function nightMode() {
        var el = $('body'),
            className = 'night-mode';

        var date = new Date(),
            hour = date.getHours();

        if((hour >= 0 && hour <= 6) || hour === 23) {
            el.addClass(className);
        }
    }
    
    if($('#nm-switch').val() === 'true') {
        nightMode();
    }

    /**
     * Copy and copyright
     */
    function setClipboardData(str) {
        str += '\n\n著作权归作者所有。\n商业转载请联系作者获得授权,非商业转载请注明出处。\n原文: ' + location.href;
        $('.post-content').on('copy', function(e) {
            var data = window.clipboardData || e.originalEvent.clipboardData;
            data.setData('text/plain', str);
            e.preventDefault();
        }); 
    }
    $('.post-content').on('mouseup', function(e) {
        var txt = window.getSelection();
        if(txt.toString().length >= 30) {
            setClipboardData(txt);
        }
    });
    
});