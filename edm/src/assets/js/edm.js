$(document).ready(function () {
    $(".menu_navigation").click(function () {
        $(".admin_base").toggleClass("admin_mini_menu");
        $("appadmin-body").toggleClass("mini_menu_body");
    });

    $(".mobile_search").click(function () {
        $(".mobile_search_section").show();
    });

    $(".search_section > img").click(function () {
        $(".mobile_search_section").hide();
    });

    $(".open_mobile_menu").click(function () {
        $(".mobile_menu").show();
    });

    if (window.matchMedia("(max-width: 850px)").matches) {
        $(".admin_base").removeClass("admin_mini_menu");
    } else {
        $(".admin_base").removeClass("admin_mini_menu");
    }
    
});