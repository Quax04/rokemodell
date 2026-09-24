(function () {
  "use strict";

  var html = document.documentElement;
  html.classList.remove("no-js");
  html.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {

    var schalter = document.querySelector(".menue-schalter");
    var nav = document.getElementById("navigation");
    if (schalter && nav) {
      schalter.addEventListener("click", function () {
        var offen = nav.classList.toggle("offen");
        schalter.setAttribute("aria-expanded", offen ? "true" : "false");
        schalter.textContent = offen ? "Schließen" : "Menü";
      });
    }

    document.querySelectorAll(".mit-untermenue").forEach(function (m) {
      var knopf = m.querySelector(".untermenue-schalter");
      if (!knopf) { return; }
      knopf.addEventListener("click", function (e) {
        e.stopPropagation();
        var offen = m.classList.toggle("offen");
        knopf.setAttribute("aria-expanded", offen ? "true" : "false");
      });
      document.addEventListener("click", function (e) {
        if (!m.contains(e.target)) {
          m.classList.remove("offen");
          knopf.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          m.classList.remove("offen");
          knopf.setAttribute("aria-expanded", "false");
        }
      });
    });

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
