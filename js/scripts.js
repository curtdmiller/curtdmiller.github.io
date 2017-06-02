$(document).ready(function(){
    // avoid jump at affix and prevent headers from being covered by nav
    $('.sticky-nav').on('affix.bs.affix',function(){
        $('body').css('margin-top', '30px');
    }).on('affix-top.bs.affix', function() {
        $('body').css('margin-top', '0px');
    })
})
