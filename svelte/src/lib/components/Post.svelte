<script lang="ts">
  import { Avatar, Button, Card } from 'flowbite-svelte';

  export let post: {
    id: number;
    content: string;
    author: {
      username: string;
      avatar: string;
    };
    createdAt: Date;
    likes?: number;
    comments?: number;
    retweets?: number;
  };

  let isLiked = false;
  let isRetweeted = false;

  function handleLike() {
    isLiked = !isLiked;
    // Will implement with GraphQL later
  }

  function handleRetweet() {
    isRetweeted = !isRetweeted;
    // Will implement with GraphQL later
  }

  function formatDate(date: Date) {
    if (!date) return '';

    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  }
</script>

<Card class="p-4 hover:bg-gray-50 transition duration-100 ease-in-out cursor-pointer">
  <div class="flex items-start gap-3">
    <Avatar src={post.author?.avatar || '/profile-placeholder.jpg'} alt={post.author?.username || 'User'} size="md" />
    <div class="flex-1">
      <div class="flex items-center justify-between">
        <div>
          <span class="font-semibold text-gray-900 dark:text-white">{post.author?.username || 'Unknown user'}</span>
          <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
            @{post.author?.username?.toLowerCase().replace(/\s/g, '') || 'user'} · {formatDate(post.createdAt)}
          </span>
        </div>
        <button
          class="inline-flex self-center items-center p-1 text-sm font-medium text-center text-gray-500 rounded-full hover:bg-gray-100"
          type="button"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path
              d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            />
          </svg>
        </button>
      </div>
      <p class="text-gray-900 dark:text-white py-2">{post.content}</p>

      <!-- Action Buttons -->
      <div class="flex justify-between items-center pt-2 text-gray-500">
        <!-- Comment button -->
        <button class="flex items-center hover:text-blue-500 group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 group-hover:bg-blue-50 rounded-full p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span class="text-xs">{post.comments || 0}</span>
        </button>

        <!-- Retweet button -->
        <button class="flex items-center hover:text-green-500 group" on:click={handleRetweet}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 group-hover:bg-green-50 rounded-full p-0.5" class:text-green-500={isRetweeted} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span class="text-xs" class:text-green-500={isRetweeted}>{post.retweets || 0}</span>
        </button>

        <!-- Like button -->
        <button class="flex items-center hover:text-red-500 group" on:click={handleLike}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 group-hover:bg-red-50 rounded-full p-0.5" class:text-red-500={isLiked} fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span class="text-xs" class:text-red-500={isLiked}>{post.likes || 0}</span>
        </button>

        <!-- Share button -->
        <button class="flex items-center hover:text-blue-500 group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 group-hover:bg-blue-50 rounded-full p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</Card>