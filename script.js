document.addEventListener('DOMContentLoaded', () => {
    try {
        const slides = Array.from(document.querySelectorAll('.slide'));
        const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');
        const dots = Array.from(document.querySelectorAll('.dot'));
        const fallback = document.getElementById('slideshow-fallback');

        if (!slides.length) {
            if (fallback) fallback.style.display = 'block';
            console.error('No slides found.');
            return;
        }
        if (slides.length !== dots.length) {
            if (fallback) fallback.style.display = 'block';
            console.warn('Number of slides and dots do not match:', slides.length, dots.length);
        }

        let current = 0;
        const autoplay = true;
        const intervalMs = 5000;
        let timer = null;

        function showSlide(index) {
            current = (index + slides.length) % slides.length;
            slides.forEach((s, i) => s.classList.toggle('active', i === current));
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
            if (fallback) fallback.style.display = 'none';
            console.log('Showing slide', current + 1, 'of', slides.length);
        }

        function goNext() { showSlide(current + 1); }
        function goPrev() { showSlide(current - 1); }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                goNext();
            });
        } else {
            if (fallback) fallback.style.display = 'block';
            console.error('Next button not found.');
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                goPrev();
            });
        } else {
            if (fallback) fallback.style.display = 'block';
            console.error('Prev button not found.');
        }

        dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        });

        const slideshowEl = document.querySelector('.slideshow');
        if (slideshowEl) {
            slideshowEl.addEventListener('mouseenter', () => {
                if (timer) { clearInterval(timer); timer = null; }
            });
            slideshowEl.addEventListener('mouseleave', () => {
                if (autoplay && !timer) timer = setInterval(goNext, intervalMs);
            });
        }

        if (autoplay) timer = setInterval(goNext, intervalMs);

        showSlide(0);
    } catch (err) {
        const fallback = document.getElementById('slideshow-fallback');
        if (fallback) fallback.style.display = 'block';
        console.error('Slideshow JS error:', err);
    }
});
