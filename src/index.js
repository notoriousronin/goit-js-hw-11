const postIdToDelete = 1;

fetch(`https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`, {
  method: 'DELETE',
})
  .then(() => console.log('Post deleted'))
  .catch(error => console.log('Error:', error));
