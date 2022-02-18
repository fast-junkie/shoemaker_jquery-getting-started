(() => {
  const interval = setInterval(init, 1e2);
  function init() {
    if (document.readyState === 'complete') {
      clearInterval(interval);
      setBackButton();
      console.info('complete...');
    }
  }

  function setBackButton() {
    const $main = $('main');
    const $div = $('<div/>');
    const $button = $('<button/>');
    $button
      .addClass('btn btn-sm btn-light back')
      .html('&laquo; Back')
      .on('click', () => {
        window.history.back();
      });
    $main.append($div.append($button));
  }
})();
