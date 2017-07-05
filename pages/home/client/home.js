Template.home.onRendered(
  function() {
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = $(".mySlides");
        var dots = $(".dot");
        for (i = 0; i < slides.length; i++) {
           slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex> slides.length) {slideIndex = 1}
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace("active", "");
        }
        $(slides[slideIndex-1]).css("display", "block");
        $(dots[slideIndex-1]).attr("class", $(dots[slideIndex-1]).attr("class") + " active");
        setTimeout(showSlides, 3000); // Change image every 2 seconds
    }
})
