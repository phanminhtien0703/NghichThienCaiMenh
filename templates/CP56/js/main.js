$(document).ready(function() {
    var $loadnews = $('ul#9pay-news');
    if ($loadnews.length) {
        load9pay();
    }
    if ($(window).width() <= 1024) {
        $(".videoBg").remove();
    }
    // checkScreen();
    // $(window).resize(function() {
    //     checkScreen();
    // });

    // art page3
    $('.hasIco--ds').click(function() {
        $("#cms").modal("show");
    });
    $('.icon_play').click(function() {
        revealVideo('video', 'z3PNkNs_lPU');
    });
    $('.pVideo').click(function() {
        var dataVideo = $('.active .spanVideo').data('video');
        revealVideo('video', dataVideo);
    });



    $('.btn_nextPage').click(function() {
        var dataTo = $(this).data('to');
        $('html, body').animate({
            scrollTop: $(".page" + dataTo).offset().top
        }, 500);
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if ($(window).innerWidth() > 1023) {
            if (scroll >= 450) {
                $(".pageNew .box_wrap ").addClass("fixLeft");
            } else {
                $(".pageNew .box_wrap ").removeClass("fixLeft");
            }
        }
    });




    $('.tab-link').click(function() {
        $(this).parents('.tabs').find('.tab-link').removeClass('current');
        $(this).addClass('current');
        var dataTab = $(this).data('tab');
        $('.tab-content').removeClass('current');
        $('.tab-content#' + dataTab).addClass('current');
    });


    new Swiper(".swiper_banner", {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        }
    });
    new Swiper(".swiper_feature", {
        loop: true,
        speed: 800,
        slidesPerView: 'auto',
        spaceBetween: -350,
        centeredSlides: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 20,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        grabCursor: true,
        parallax: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            640: {
                spaceBetween: -320,
            },
            320: {
                spaceBetween: -100
            }
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        }
    });

    $(".toggle").click(function() {
        if ($(".toggle").hasClass("open")) {
            $(".fixbox").animate({ "left": "-170px" }, 100);
            $(".toggle").removeClass("open");
        } else {
            $(".fixbox").stop().animate({ "left": "0" }, 100);
            $(".toggle").addClass("open");
        }
    });
    $('.toggle').click(function() {
        $('.fixbox').toggleClass('closed');
    });



    //download
    window.public_download = true;
    if ($(".controlDownload").length > 0) {
        $(".controlDownload").on("click", function(e) {
            var href = $(this).data("href");
            if (href == "" || href == "#") {
                e.preventDefault();
                $("#cms").modal("show");
            } else {
                $(this).attr({ href: href });
            }
        });
    }
});

function videoArt(id) {
    $('.iframe_video  iframe').remove();
    $('.iframe_video').append('<iframe width="800" height="450"  src="https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0" frameborder="0" allowfullscreen></iframe>');

}

function revealVideo(div, id) {
    $('#f-video').append('<iframe width="800" height="450"  src="https://www.youtube.com/embed/' + id + '?rel=0&amp&autoplay=1;showinfo=0" frameborder="0" allowfullscreen allow="autoplay"></iframe>');
    document.getElementById(div).style.display = 'block';

    $('.iframe_video  iframe').remove();
    var idVideo = $('.ava_item.active').data('video');
    $('.iframe_video').append('<iframe width="800" height="450"  src="https://www.youtube.com/embed/' + idVideo + '?rel=0&showinfo=0" frameborder="0" allowfullscreen></iframe>');


}

function hideVideo(div) {
    $('#f-video  iframe').remove();
    document.getElementById(div).style.display = 'none';
}


var forEach = function(t, o, r) {
    if ("[object Object]" === Object.prototype.toString.call(t))
        for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
    else
        for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t)
};
var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
    forEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
            this.classList.toggle("is-active");
        }, false);
    });
}
$('.hamburger').click(function() {
    $('.header-menu').toggleClass('show');
    // $('.header').toggleClass('fixed');
    $('body').toggleClass('open');
});

var ignoreClickOnMeElement = document.getElementsByClassName('header')[0];

document.addEventListener('click', function(event) {
    var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
    if (!isClickInsideElement) {
        $('.header-menu').removeClass('show');
        $('.hamburger').removeClass('is-active');
        // $('.header').removeClass('fixed');
        $('body').removeClass('open');
    }
});





function load9pay() {
    $.ajax({
        url: "https://portal-cmsapi.smobgame.com/Api9Pay/getNew9pay",
        type: "get",
        success: function(result) {
            dataResult = parseJson(result);
            var html = $.map(dataResult.data.data, function(item) {
                return `<li> <a rel="noopener" href="${item.url}" target="_blank"><span class="title-news">${item.title}</span><span class="date"></span></a></li>`
            });
            $('#9pay-news').html(html);
        }
    });
}

function parseJson(result) {
    data = (typeof result === "object") ? result : JSON.parse(result);
    return data;
}