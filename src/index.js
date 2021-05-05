const imageApi = 'http://localhost:3000'
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

const commentSection = document.getElementsByClassName('comments')[0];
const imageCard = document.getElementsByClassName('image')[0];
const title = document.getElementsByClassName('title')[0];
const likeCount = document.querySelector('.likes')

fetch(`${imageApi}/images/1`).then((res) => res.json()).then(displayPost);

function displayPost(image) {
    const comments = image.comments;

    comments.forEach(showComment);

    imageCard.src = image.image;
    title.innerHTML = `${image.title}`;
    likeCount.innerHTML = `${image.likes} likes`

    document.querySelector('.like-button').addEventListener('click', (e) => {
        // when the button is clicked we're making a fetch to the database
        fetch(`${imageApi}/images/1`, {
            method: 'PATCH',
            headers,
            // we're incrementing the likes on the image by 1 and then translating that to json
            body: JSON.stringify({likes: image.likes + 1}),
        })
            .then((res) => res.json())
            .then((json) => {
                image.likes = json.likes;
            })
    })
}

function showComment(comment) {
    const newComment = document.createElement('li');
    newComment.innerHTML = `<p> ${comment.content} </p>`;
    commentSection.append(newComment);
}
