$(document).ready(function() {

  var current = 0,
      $pages = $(".question"),
      pageCount = $pages.length;

  var Slider = {
    
    init: function() {

      this.listen();

      $pages.each(function() {
        $d = $(this);
        $d.attr("data-originalClasses", $d.attr("class"));
      });

      $pages.eq(current).addClass("current");

    },

    listen: function() {
      var _this = this;
      $(".button-area").on("click", "a", function(e) {
        e.preventDefault();
        _this.nextPage();
      });
    },

    nextPage: function() {
      var $currentPage = $pages.eq(current);
      ++current;
      var $nextPage = $pages.eq(current).addClass("current");
      console.log($currentPage);
      $currentPage.addClass("flipOutLeft");
      $nextPage.addClass("flipInRight");

      // this.resetClasses($currentPage, $nextPage);
    },

    resetClasses: function($outPage, $inPage) {
      $outPage.attr("class", $outPage.data("originalClasses"));
      $inPage.attr("class", $inPage.data("originalClasses") + " current" );
    }

  };

  Slider.init();

});