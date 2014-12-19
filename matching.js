var matcher = {

  results: {},

  lines: {},

  init: function() {
    this.listen();
    this.paper = Raphael(document.getElementById("bg"), $(window).width(), $(window).height());
  },

  listen: function() {
    var _this = this;

    $("ul").on("click", "li", function(e) {

      var $li = $(this),
          $ul = $(e.delegateTarget);

      if ($li.hasClass("linked")) {

        _this.unlink($li);

      } else if ($li.hasClass("alive")) {

        $li.removeClass("alive");

      } else {
        if ($ul.siblings("ul").find("li.alive").length > 0) {
          $li.addClass("alive");
          var $left = $("ul.left").find(".alive"),
              $right = $("ul.right").find(".alive");
          _this.linkUp($left, $right);
          $(".alive").addClass("linked").removeClass("alive");
        } else {
          $ul.find(".alive").removeClass("alive");
          $li.addClass("alive");
        }

      }

      console.log(_this.results);

    });

  },

  unlink: function($el) {
    $el.removeClass("linked");
    if ($el.data("side") === "left") {
      var partner = this.results[$el.data("name")];
      $("li[data-name=" + partner + "]").removeClass("linked");
      delete this.results[$el.data("name")];
      this.removeLine($el.index());
    } else {
      for( var name in this.results) {
        if (this.results[name] === $el.data("name")) {
          $("li[data-name=" + name + "]").removeClass("linked");
          delete this.results[name];
          this.removeLine($("li[data-name=" + name + "]").index());
        }
      }
    }
  },

  linkUp: function($left, $right) {
    // store values
    this.results[$left.data("name")] = $right.data("name");
    this.createLine($left, $right, $left.data("name"));
  },

  createLine: function($left, $right, name) {
    var start = this.getLineStartPoint($left),
        end = this.getLineEndPoint($right);

    var circle = this.paper.path("M" + start[0] + "," + start[1] + " L" + end[0] + "," + end[1]);

    circle.attr("stroke", "#fff");
    circle.node.setAttribute("id", name + "-line");
    // circle.animate({path:"M" + start[0] + "," + start[1] + "L " + (start[0]+25) + "," + (start[1]) + "L" + end[0] + "," + end[1]},200)
    circle.id = $left.index();

  },

  getLineStartPoint: function($left) {
    var x = $left.offset().left + $left.outerWidth(),
        y = $left.offset().top + ($left.outerHeight() / 2);
    return [x, y];
  },

  getLineEndPoint: function($right) {
    var x = $right.offset().left,
        y = $right.offset().top + ($right.outerHeight() / 2);
    return [x, y];
  },

  removeLine: function(id) {
    // a function to remove the line that connects the match
    var line = this.paper.getById(id);
    line.remove();
  }

};

matcher.init();