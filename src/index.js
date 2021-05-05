const imageApi = 'http://localhost:3000'

const commentSection = document.getElementsByClassName('comments')[0];
const imageCard = document.getElementsByClassName('image')[0];
const title = document.getElementsByClassName('title')[0];

fetch(`${imageApi}/images/1`).then((res) => res.json()).then(displayPost);

function displayPost(image) {
    const comments = image.comments;

    comments.forEach(showComment);

    imageCard.src = image.image;
    title.innerHTML = `${image.title}`;
}

function showComment(comment) {
    const newComment = document.createElement('li');
    newComment.innerHTML = `<p> ${comment.content} </p>`;
    commentSection.append(newComment);
}
