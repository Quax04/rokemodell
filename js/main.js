// Rokemodelle – kleine Helfer, keine externen Bibliotheken
(function () {
  "use strict";

  var html = document.documentElement;
  html.classList.remove("no-js");
  html.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {

    // Mobiles Menü
    var schalter = document.querySelector(".menue-schalter");
    var nav = document.getElementById("navigation");
    if (schalter && nav) {
      schalter.addEventListener("click", function () {
        var offen = nav.classList.toggle("offen");
        schalter.setAttribute("aria-expanded", offen ? "true" : "false");
        schalter.textContent = offen ? "Schließen" : "Menü";
      });
    }

    // Aktuelles Jahr in der Fußzeile
    var jahr = document.querySelector("[data-jahr]");
    if (jahr) { jahr.textContent = new Date().getFullYear(); }

    // E-Mail-Links erst im Browser zusammensetzen (etwas Schutz vor Spam-Sammlern)
    document.querySelectorAll("a[data-user][data-domain]").forEach(function (a) {
      var adresse = a.getAttribute("data-user") + "@" + a.getAttribute("data-domain");
      a.href = "mailto:" + adresse;
      a.textContent = adresse;
    });
  });
})();
