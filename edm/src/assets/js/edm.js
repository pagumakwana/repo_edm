$(document).ready(function () {
    $(".menu_navigation").click(function () {
        debugger
        $(".admin_base").toggleClass("admin_mini_menu");
        // $("body").toggleClass("menu_open");
    });

    $(".mobile_search").click(function () {
        $(".mobile_search_section").show();
    });

    $(".search_section > img").click(function () {
        $(".mobile_search_section").hide();
    });

    // if (window.matchMedia("(max-width: 850px)").matches) {
    //     $(".admin_base").removeClass("admin_mini_menu");
    //     $("body").removeClass("menu_open");
    // } else {
    //     $(".admin_base").addClass("admin_mini_menu");
    //     $("body").addClass("menu_open");
    // }

    $(".open_mobile_menu").click(function () {
        $(".mobile_menu").show();
    });
});