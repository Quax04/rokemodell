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
