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
  function onClick(e){
    var a = e.currentTarget;
    var cfg = window.AISL_CONFIG || {};
    var wrap = a.closest('.aisl-wrap');
    var prompt = wrap ? wrap.getAttribute('data-prompt') : '';
    var copyBehavior = cfg.copyBehavior || 'prefill_and_copy';
    if(copyBehavior !== 'prefill_only' && prompt){
      copyToClipboard(prompt).then(function(){
        // optionally show a non-intrusive hint
        try{
          a.title = (cfg.i18n && cfg.i18n.copied) || 'Prompt copied';
        }catch(e){}
      }).catch(function(){});
    }
    // let the link open normally (target per attribute)
  }
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a.aisl-btn');
    if(a){ onClick(ev); }
  });
})();