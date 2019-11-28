$(document).ready(function($) {

    // Toggle global search
    $('a.static-search').on('click', function(e) {
        $('.header-search').removeClass("o_hidden");
        var $header_affix = $('header.sct_header_disp.o_header_affix')
        if ($header_affix) {
            $header_affix.find('div.header-search').replaceWith();
        }
    });
    $('a#user_account').on('click', function(e) {
        $('div.toggle-config').toggleClass("o_hidden");
    });

});
$(document).click(function(e) {
    if (e.target.id !== 'user_account_icon') {
        if (!$('div.toggle-config').hasClass('o_hidden')) {
            $('div.toggle-config').addClass('o_hidden');
        }

    }
    $('span#close_search_bar').on('click', function(e) {
        $('.header-search').addClass("o_hidden");
    });
});