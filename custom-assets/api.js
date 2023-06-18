const apiUrl = 'https://mastodonapp.uk/api/v1/timelines/tag/';
const tag = 'EASST';
const limit = 10;

async function getPostsByTag() {
  try {
    const response = await fetch(`${apiUrl}${tag}?limit=${limit}`);
    const posts = await response.json();
    console.log(posts);

    const postsContainer = document.getElementById('posts-container');

    // Loop through the posts and generate HTML for each post
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.style.backgroundColor = '#f2f2f2';
      postElement.style.padding = '10px';
      postElement.style.marginBottom = '10px';

      const postHeader = document.createElement('div');
      postHeader.classList.add('post-header');
      postHeader.style.display = 'flex';
      postHeader.style.alignItems = 'center';

      const avatar = document.createElement('img');
      avatar.classList.add('avatar');
      avatar.src = post.account.avatar;
      avatar.alt = 'Avatar';
      avatar.style.width = '40px';
      avatar.style.height = '40px';
      avatar.style.borderRadius = '50%';
      avatar.style.marginRight = '10px';

      const author = document.createElement('div');
      author.classList.add('author');

      const displayName = document.createElement('a');
      displayName.classList.add('display-name');
      displayName.href = post.account.url;
      displayName.textContent = post.account.display_name;
      displayName.style.fontWeight = 'bold';
      displayName.style.textDecoration = 'none';

      const username = document.createElement('a');
      username.classList.add('username');
      username.href = post.account.url;
      username.textContent = `@${post.account.username}`;
      username.style.color = '#666';
      username.style.textDecoration = 'none';

      author.appendChild(displayName);
      author.appendChild(username);

      postHeader.appendChild(avatar);
      postHeader.appendChild(author);

      const postContent = document.createElement('div');
      postContent.classList.add('post-content');

      const content = document.createElement('p');
      content.innerHTML = post.content;

      postContent.appendChild(content);

      // Create and format the timestamp
      const timestamp = document.createElement('div');
      timestamp.classList.add('post-timestamp');
      const createdAt = new Date(post.created_at);
      timestamp.textContent = formatDate(createdAt);

      postElement.appendChild(postHeader);
      postElement.appendChild(postContent);
      postElement.appendChild(timestamp);

      // Add click event listener to navigate to the post in Mastodon
      postElement.addEventListener('click', () => {
        window.location.href = post.url;
      });

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error occurred while retrieving posts:', error);
  }
}

// Format the date as desired (e.g., "June 12, 2023 10:30 AM")
function formatDate(date) {
  const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

getPostsByTag();
