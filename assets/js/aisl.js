document.addEventListener('click', function(ev){
  var a = ev.target.closest && ev.target.closest('a.aisl-btn');
  if(a){
    ev.preventDefault(); // detenemos la navegación inmediata
    var cfg = window.AISL_CONFIG || {};
    var wrap = a.closest('.aisl-wrap');
    var prompt = wrap ? wrap.getAttribute('data-prompt') : '';
    var href = a.getAttribute('href');
    var target = a.getAttribute('target') || cfg.target || '_blank';

    if(prompt){
      copyToClipboard(prompt).finally(function(){
        // abrir después de un breve delay
        setTimeout(function(){
          window.open(href, target, 'noopener');
        }, 80);
      });
    } else {
      window.open(href, target, 'noopener');
    }
  }
});
