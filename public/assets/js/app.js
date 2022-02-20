((util) => {
  const u = new Util();
  util.getDateString = u.getDateString;
  util.replaceBrackets = u.replaceBrackets;
  util.renderMarkup = u.renderMarkup;

  const interval = setInterval(init, 1e2);
  function init() {
    if (document.readyState === 'complete') {
      clearInterval(interval);
      codeBlock();
      setTimeout(setDateField, 3e3);
      console.info('complete...');
    }
  }
  function codeBlock() {
    const $codeContainer = $('#code-container');
    const $codeBlock = $('#code-block');
    if ($codeContainer.length > 0 && $codeBlock.length > 0) {
      const src = $codeBlock.html().replace('\n', '');
      $codeContainer.html(util.replaceBrackets(src));
    }
    $('pre code').each((i, block) => { hljs.highlightElement(block); });
    util.renderMarkup('#demo-content-container', '#demo-markup', (src, destination) => {
      hljs.highlightElement(destination[0]);
    });
  }
  function setDateField() {
    console.debug('setting date...');
    const $dateContainer = $('#forms-code :nth-child(4)').find('.hljs-string:nth-child(3)');
    if ($dateContainer.length) {
      // $dateContainer.text(`'${util.getDateString()}'`);
      $dateContainer.text('\'2001-09-11\'');
    }
  }
  function Util() {
    return {
      replaceBrackets(markup) {
        markup = markup.replace(/</g, '&lt;');
        markup = markup.replace(/>/g, '&gt;');
        return markup;
      },
      renderMarkup(sourceSelector, destinationSelector, callback) {
        const $source = $(sourceSelector);
        const $destination = $(destinationSelector);
        if ($source.length > 0) {
          $destination.html(this.replaceBrackets($source.html()));
          callback($source, $destination);
        }
      },
      getDateString() {
        const dt = new Date();
        let month = (dt.getMonth() + 1);
        let day = dt.getDate();
        month = month > 10 ? month : `0${month}`;
        day = day > 10 ? day : `0${day}`;
        return `${dt.getFullYear()}-${month}-${day}`;
      },
    };
  }
})(window.util || (window.util = {}));
