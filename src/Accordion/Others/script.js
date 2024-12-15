document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.js-accordion');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion__header');
    header.addEventListener('click', () => {
      // Close any open accordion before expanding a new one
      if (!item.classList.contains('accordion--expand')) {
        accordionItems.forEach(acc => acc.classList.remove('accordion--expand'));
        item.classList.add('accordion--expand');
      } else {
        item.classList.remove('accordion--expand');
      }
    });
  });
});
