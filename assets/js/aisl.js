(function(){
  function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position='fixed'; ta.style.top='-1000px';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok ? Promise.resolve() : Promise.reject();
      }
    } catch(e) {
      return Promise.reject(e);
    }
  }

  function openAfterDelay(url, target){
    setTimeout(function(){
      try {
        window.open(url, target || '_blank', 'noopener');
      } catch(e) {
        window.location.href = url;
      }
    }, 80);
  }

  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a.aisl-btn');
    if(!a) return;

    ev.preventDefault();

    var cfg = window.AISL_CONFIG || {};
    var wrap = a.closest('.aisl-wrap');
    var prompt = wrap ? wrap.getAttribute('data-prompt') : '';
    var href = a.getAttribute('href');
    var target = a.getAttribute('target') || cfg.target || '_blank';
    var live = wrap ? wrap.querySelector('.aisl-live') : null;

    var shouldCopy = (cfg.copyBehavior !== 'prefill_only') && prompt;
    var p = shouldCopy ? copyToClipboard(prompt) : Promise.resolve();

    p.then(function(){
      if(live && cfg.i18n && cfg.i18n.copied){
        live.textContent = cfg.i18n.copied;
      }
    }).finally(function(){
      openAfterDelay(href, target);
    });
  });
})();