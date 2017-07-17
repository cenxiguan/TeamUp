Template.home.onRendered(
  function() {
    var mySlides;
    var dots;
    var slideIndex = 1;
    this.slideIndex = slideIndex;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    slides = $(".mySlides");
    dots = $(".dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
})


Template.home.events({
/*  'click button#prev'(elt,instance) {
    var i;
    instance.slideIndex--;
    var slideIndex = instance.slideIndex;

    slides = $(".mySlides");
    var dots = $(".dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slideIndex < 1) {
      slideIndex = 5;
      instance.slideIndex = slideIndex;
    };
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  },

  'click button#next'(elt,instance) {
    var i;
    instance.slideIndex++;
    var slideIndex = instance.slideIndex;

    slides = $(".mySlides");
    var dots = $(".dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slideIndex > slides.length) {
      slideIndex = 1;
      instance.slideIndex = slideIndex;
    };
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  },*/

  'click span#slide1'(elt,instance) {
    var mySlides = instance.$(".mySlides");
    mySlides[0].style.display = "block";
    mySlides[1].style.display = "none";
    mySlides[2].style.display = "none";
    mySlides[3].style.display = "none";
    mySlides[4].style.display = "none";
  },
  'click span#slide2'(elt,instance) {
    var mySlides = instance.$(".mySlides");
    mySlides[0].style.display = "none";
    mySlides[1].style.display = "block";
    mySlides[2].style.display = "none";
    mySlides[3].style.display = "none";
    mySlides[4].style.display = "none";
  },
  'click span#slide3'(elt,instance) {
    var mySlides = instance.$(".mySlides");
    mySlides[0].style.display = "none";
    mySlides[1].style.display = "none";
    mySlides[2].style.display = "block";
    mySlides[3].style.display = "none";
    mySlides[4].style.display = "none";
  },
  'click span#slide4'(elt,instance) {
    var mySlides = instance.$(".mySlides");
    mySlides[0].style.display = "none";
    mySlides[1].style.display = "none";
    mySlides[2].style.display = "none";
    mySlides[3].style.display = "block";
    mySlides[4].style.display = "none";
  },
  'click span#slide5'(elt,instance) {
    var mySlides = instance.$(".mySlides");
    mySlides[0].style.display = "none";
    mySlides[1].style.display = "none";
    mySlides[2].style.display = "none";
    mySlides[3].style.display = "none";
    mySlides[4].style.display = "block";
  },
})
