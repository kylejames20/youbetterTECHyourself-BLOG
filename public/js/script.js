const newPostButton = document.querySelector('#new-post-button');
const newCommentButton = document.querySelector('#new-comment-button');
const updateCurrentPostButton = document.querySelector('#update-current-post-button');
const deleteCurrentPostButton = document.querySelector('#delete-current-post-button');

const makingNewPost = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Your post was unsuccessful. Please try again.');
        }
    }
    else {
        alert('Your post was unsuccessful. Please try again.');
    }
};

const makingNewComment = async (e) => {
    e.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();
    const data = document.querySelector('.new-custom-card')
    const id = data.dataset.id;

    if (content) {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(`/api/posts/${id}`);
        } else {
            alert('Your comment was unsuccessful. Please try again.');
        }
    }
    else {
        alert('Your comment was unsuccessful. Please try again.');
    }
};

const updatingCurrentPost = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const data = document.querySelector('.new-custom-card')
    const id = data.dataset.id;

    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Your update was unsuccessful. Please try again.');
        }
    }
    else {
        alert('Your update was unsuccessful. Please try again.');
    }
};

const deleteExistingPost = async (e) => {
    e.preventDefault();

    const data = document.querySelector('.new-custom-card')
    const id = data.dataset.id;

    if (id) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Your request to delete was unsuccessful. Please try again.');
        }
    }
    else {
        alert('Your request to delete was unsuccessful. Please try again.');
    }
};

if (newPostButton) {
    newPostButton.addEventListener('click', makingNewPost);
};

if (newCommentButton) {
    newCommentButton.addEventListener('click', makingNewComment);
};

if (updateCurrentPostButton) {
    updateCurrentPostButton.addEventListener('click', updatingCurrentPost);
};

if (deleteCurrentPostButton) {
    deleteCurrentPostButton.addEventListener('click', deleteExistingPost);
};