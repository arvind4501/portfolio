// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

Turbo.session.drive = false

document.addEventListener('DOMContentLoaded', () => {
  // Lazy load images with IntersectionObserver
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          const tempImage = new Image();
          tempImage.onload = () => {
            img.src = img.dataset.src;
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
          };
          tempImage.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  }, { rootMargin: '50px 0px', threshold: 0.01 });

  const loadImage = (img) => {
    if ('loading' in HTMLImageElement.prototype) {
      img.loading = 'lazy';
    }
    img.classList.add('transition-opacity', 'duration-300', 'opacity-0');

    img.onerror = () => {
      const width = img.getAttribute('width') || img.clientWidth || 300;
      const height = img.getAttribute('height') || img.clientHeight || 200;
      img.src = `https://placehold.co/${width}x${height}/DEDEDE/555555?text=Image+Unavailable`;
      img.alt = 'Image unavailable';
      img.classList.remove('opacity-0');
      img.classList.add('opacity-100', 'error-image');
    };

    if (img.dataset.src) {
      imageObserver.observe(img);
    } else {
      img.classList.remove('opacity-0');
      img.classList.add('opacity-100');
    }
  };

  document.querySelectorAll('img[data-src], img:not([data-src])').forEach(loadImage);

  // Monitor dynamically added images
  new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.tagName === 'IMG') {
            loadImage(node);
          }
          node.querySelectorAll('img').forEach(loadImage);
        }
      });
    });
  }).observe(document.body, { childList: true, subtree: true });
});

// Performance Monitoring
if ('performance' in window && 'PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log(`LCP: ${entry.startTime}ms`);
      }
      if (entry.entryType === 'first-input') {
        console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
      }
      if (entry.entryType === 'layout-shift') {
        console.log(`CLS: ${entry.value}`);
      }
    });
  });

  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

  window.addEventListener('load', () => {
    const timing = performance.getEntriesByType('navigation')[0];
    console.log({
      'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart,
      'TCP Connection': timing.connectEnd - timing.connectStart,
      'DOM Content Loaded': timing.domContentLoadedEventEnd - timing.navigationStart,
      'Page Load': timing.loadEventEnd - timing.navigationStart
    });
  });
}

// Handle offline/online events
window.addEventListener('online', () => {
  document.body.classList.remove('offline');
  console.log('Connection restored');
});

window.addEventListener('offline', () => {
  document.body.classList.add('offline');
  console.log('Connection lost');
});