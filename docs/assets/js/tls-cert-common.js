
// This script is used to load the forge library if it is not already loaded.
(function loadForgeIfNeeded() {
    if (typeof forge === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/node-forge@1.3.1/dist/forge.min.js';
      document.head.appendChild(script);
    }
  })();