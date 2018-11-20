const allItems = document.querySelectorAll('.item');

function resizeGridItem(item) {
  const grid = document.querySelectorAll('.posts')[0];
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'), 10);
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'), 10);
  const rowSpan = Math.ceil((item.querySelector('.content').offsetHeight + rowGap + 10) / (rowHeight + rowGap));

  item.style.gridRowEnd = `span ${rowSpan}`;
}

function resizeAllGridItems() {
  for (let x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}

function resizeInstance(instance) {
  const item = instance.elements[0];
  resizeGridItem(item);
}

window.onload = resizeAllGridItems();
window.addEventListener('resize', resizeAllGridItems);

for (x = 0; x < allItems.length; x++) {
  imagesLoaded(allItems[x], resizeInstance);
}
