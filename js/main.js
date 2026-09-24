// rokemodell – kleine Helfer, keine externen Bibliotheken
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
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          nav.classList.remove("offen");
          schalter.setAttribute("aria-expanded", "false");
          schalter.textContent = "Menü";
        }
      });
    }

    // Bauplan einmalig zeichnen
    var plan = document.querySelector(".plan");
    if (plan) {
      requestAnimationFrame(function () { plan.classList.add("gezeichnet"); });
    }

    // Aktuelles Jahr in der Fußzeile
    var jahr = document.querySelector("[data-jahr]");
    if (jahr) { jahr.textContent = new Date().getFullYear(); }

    // E-Mail-Link erst im Browser zusammensetzen (etwas Schutz vor Spam-Sammlern)
    document.querySelectorAll("a[data-user][data-domain]").forEach(function (a) {
      var user = a.getAttribute("data-user");
      var domain = a.getAttribute("data-domain");
      if (user && domain) {
        a.href = "mailto:" + user + "@" + domain;
      } else {
        a.setAttribute("aria-disabled", "true");
        a.removeAttribute("href");
        a.textContent = "E-Mail-Adresse folgt";
      }
    });
  });
})();
