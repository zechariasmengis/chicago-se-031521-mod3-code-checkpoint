const imageApi = 'http://localhost:3000'
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

const commentSection = document.querySelector('.comments');
const imageCard = document.querySelector('.image');
const title = document.querySelector('.title');
const likeCount = document.querySelector('.likes');

const commentForm = document.querySelector('.comment-form')
commentForm.addEventListener('submit', createNewComment);

fetch(`${imageApi}/images/1`).then((res) => res.json()).then(displayPost);

function displayPost(image) {
    const comments = image.comments;

    comments.forEach(showComment);

    imageCard.src = image.image;
    title.innerHTML = `${image.title}`;
    likeCount.innerHTML = `${image.likes} likes`
    // I know this isn't the cleanest code, but I was working on getting the likes to automatically update on the front-end
    document.querySelector('.like-button').addEventListener('click', (e) => {
        e.preventDefault()
        fetch(`${imageApi}/images/1`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({likes: image.likes + 1}),
        })
            .then((res) => res.json())
            .then((json) => {
                image.likes = json.likes;
            })
            .then(likeCount.innerHTML = `${image.likes + 1} likes`)
    })

    
}

function showComment(comment) {
    const newComment = document.createElement('li');
    newComment.innerHTML = `<p> ${comment.content} </p>`;
    commentSection.append(newComment);
}

function createNewComment(event) {
    event.preventDefault();

    const newComment = {
        content: event.target.comment.value,
        imageId: 1
    };

    fetch(`${imageApi}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newComment),
      })
        .then((res) => res.json())
        .then((json) => showComment(json))
        .then(commentForm.reset());
}