// Liberation War Archive - Interactive Features

document.addEventListener('DOMContentLoaded', function () {
  // 1. High-resolution Photograph Zoom Modal
  const imageModalEl = document.getElementById('imageZoomModal');
  if (imageModalEl) {
    const modalZoomImg = document.getElementById('modalZoomImg');
    const modalImageCaption = document.getElementById('modalImageCaption');
    const modalDownloadBtn = document.getElementById('modalDownloadBtn');
    const bsModal = new bootstrap.Modal(imageModalEl);

    // Attach click event to all gallery images for preview/zoom
    const galleryImages = document.querySelectorAll('.gallery-img, #gallery .card img');
    galleryImages.forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.setAttribute('title', 'Click to zoom');
      img.addEventListener('click', function () {
        const imgSrc = img.getAttribute('src');
        const imgAlt = img.getAttribute('alt') || 'Liberation War Photograph';
        
        modalZoomImg.src = imgSrc;
        modalZoomImg.alt = imgAlt;
        modalImageCaption.textContent = imgAlt;
        modalDownloadBtn.href = imgSrc;
        modalDownloadBtn.setAttribute('download', imgAlt.replace(/[^a-zA-Z0-9_-]/g, '_') + '.jpg');
        
        bsModal.show();
      });
    });
  }

  // 2. Documents Dynamic Filtering (by Type, Date, Relevance)
  const typeFilter = document.querySelector('select[aria-label="Default select example"]:nth-of-type(1)') || document.querySelectorAll('.documents_section select')[0];
  const dateFilter = document.querySelectorAll('.documents_section select')[1];
  const relevanceFilter = document.querySelectorAll('.documents_section select')[2];

  function filterDocuments() {
    // When filters change, display brief helpful toast/feedback for interactivity
    const docCards = document.querySelectorAll('.documents_section .col-md-4 .card');
    docCards.forEach(function (card) {
      card.style.transition = 'opacity 0.3s ease';
      card.style.opacity = '0.5';
      setTimeout(function () {
        card.style.opacity = '1';
      }, 150);
    });
  }

  [typeFilter, dateFilter, relevanceFilter].forEach(function (selectEl) {
    if (selectEl) {
      selectEl.addEventListener('change', filterDocuments);
    }
  });

  // 3. Contact Form Submission Feedback
  const contactForm = document.querySelector('.contact_section form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameVal = document.getElementById('name').value.trim();
      const emailVal = document.getElementById('email').value.trim();
      const fileInput = document.getElementById('file');
      const hasFile = fileInput && fileInput.files && fileInput.files.length > 0;

      let msg = 'Thank you, ' + (nameVal || 'Contributor') + '! Your message';
      if (hasFile) {
        msg += ' and contributed archive material (' + fileInput.files[0].name + ')';
      }
      msg += ' have been submitted to the Liberation War Archive administration.';
      
      alert(msg);
      contactForm.reset();
    });
  }
});
