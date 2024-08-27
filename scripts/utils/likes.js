// change the likeHeart color and increment media like count ang global like count
// unlike if likeHeart is clicked again
export function likeMedia(event) {
  // get the element displaying the global like count
  const globalLikeCountElement = document.getElementById('nbLike');
  // get the clicked element (the like heart icon)
  const targetElement = event.currentTarget;
  // get the adjacent element (previous sibling) that displays the like count for the specific media
  const likeCountElement = targetElement.previousElementSibling;
  // extract the current like count for the specific media
  let currentCount = parseInt(likeCountElement.textContent, 10);
  // extract the current global like count
  const currentColor = getComputedStyle(targetElement).color;
 //testing
  console.log('Initial media like count:', currentCount);
  console.log('Initial global like count:', globalLikeCountElement.textContent);
  console.log('Initial heart color:', currentColor);

  // determine the current color of the like heart icon
  let globalCount = parseInt(globalLikeCountElement.textContent, 10);

  // check if the media is already liked based on the color of the like heart
  if (currentColor === 'rgb(144, 28, 28)') {
    // if liked, set the color to black
    targetElement.style.color = 'black';
    // decrement the like counts
    currentCount -= 1;
    globalCount -= 1;
  } else {
    // if not liked, set the color to red
    targetElement.style.color = '#901C1C';
    // increment the like counts
    currentCount += 1;
    globalCount += 1;
  }

  // update the display values for both the media and global like counts
  likeCountElement.textContent = currentCount;
  globalLikeCountElement.textContent = globalCount;
}
