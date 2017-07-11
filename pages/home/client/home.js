Template.home.onRendered(
  function() {
    var myVar;
    var slideIndex = 0;
    var slides;
    var dots;
    showSlides();
    setInterval(function(){
      slideIndex++;
      showSlides();
    }, 3000);

    function showSlides() {
            var i;
            slides = $(".mySlides");
            dots = $(".dot");
            for (i = 0; i < slides.length; i++) {
               slides[i].style.display = "none";
            }
            console.log("s"+slideIndex);
            //console.log("sl"+slides.length);
            //console.log("d"+dots.length);
            if (slideIndex>slides.length) {slideIndex = 1}
            //slides._slideTo( slides.index );
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            $(slides[slideIndex-1]).css("display", "block");
            $(dots[slideIndex-1]).attr("class", $(dots[slideIndex-1]).attr("class") + " active");
            //setTimeout(showSlides, 3000); // Change image every 2 seconds
        }
})
