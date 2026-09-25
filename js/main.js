(function () {
  "use strict";

  var html = document.documentElement;
  html.classList.remove("no-js");
  html.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {

    var header = document.querySelector(".site-header");
    if (header) {
      var pruefeScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 20);
      };
      pruefeScroll();
      window.addEventListener("scroll", pruefeScroll, { passive: true });
    }

    var nav = document.querySelector(".main-nav");
    if (nav) {
      var toggle = nav.querySelector(".nav-toggle");
      var alleSchliessen = function () {
        nav.querySelectorAll("li.has-children.is-open").forEach(function (li) {
          li.classList.remove("is-open");
          var link = li.querySelector("a[data-menu-parent]");
          if (link) { link.setAttribute("aria-expanded", "false"); }
        });
      };

      if (toggle) {
        toggle.addEventListener("click", function () {
          var offen = document.body.classList.toggle("nav-open");
          toggle.setAttribute("aria-expanded", offen ? "true" : "false");
        });
      }

      var mitMaus = window.matchMedia("(hover: hover) and (min-width: 951px)");

      nav.querySelectorAll("a[data-menu-parent]").forEach(function (link) {
        link.addEventListener("click", function (e) {
          if (mitMaus.matches) { return; }
          e.preventDefault();
          var li = link.closest("li.has-children");
          var warOffen = li.classList.contains("is-open");
          alleSchliessen();
          if (!warOffen) {
            li.classList.add("is-open");
            link.setAttribute("aria-expanded", "true");
          }
        });
      });

      document.addEventListener("click", function (e) {
        if (!nav.contains(e.target)) {
          alleSchliessen();
          document.body.classList.remove("nav-open");
          if (toggle) { toggle.setAttribute("aria-expanded", "false"); }
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          alleSchliessen();
          document.body.classList.remove("nav-open");
          if (toggle) { toggle.setAttribute("aria-expanded", "false"); }
        }
      });
    }

    var jahr = document.querySelector("[data-jahr]");
    if (jahr) { jahr.textContent = new Date().getFullYear(); }

    document.querySelectorAll("a[data-m]").forEach(function (a) {
      try {
        var adresse = atob(a.getAttribute("data-m")).split("").reverse().join("");
        a.href = "mailto:" + adresse;
        a.textContent = adresse;
      } catch (e) {}
    });
  });
})();
