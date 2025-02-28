<script lang="ts">
  import { Avatar, Button, Card } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';

  export let userAvatar = '/avatar4.jpg';
  export let placeholder = "What's happening?";
  export let buttonText = "Tweet";

  let tweetContent = '';
  let isSubmitting = false;
  let charCount = 0;
  const MAX_CHARS = 280;

  const dispatch = createEventDispatcher();

  $: charCount = tweetContent.length;
  $: isOverLimit = charCount > MAX_CHARS;
  $: charRemaining = MAX_CHARS - charCount;

  function handleTweet() {
    if (isSubmitting || !tweetContent.trim() || isOverLimit) return;

    isSubmitting = true;

    // In a real app, this would call a GraphQL mutation
    dispatch('tweet', {
      content: tweetContent
    });

    // Reset the form
    tweetContent = '';
    isSubmitting = false;
  }
</script>

<Card class="mb-4 p-4 border-none shadow-sm" size="lg">
  <div class="flex gap-3">
    <Avatar src={userAvatar} alt="Your profile" size="md" />

    <div class="flex-1">
      <div class="mb-2">
        <textarea
          bind:value={tweetContent}
          class="w-full text-lg border-none focus:ring-0 focus:border-none resize-none h-24 bg-transparent p-0"
          placeholder={placeholder}
        ></textarea>
      </div>

      <div class="flex justify-between items-center border-t border-gray-100 pt-3">
        <div class="flex space-x-2 text-blue-500">
          <!-- Image upload button -->
          <button class="p-2 rounded-full hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <!-- GIF button -->
          <button class="p-2 rounded-full hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </button>

          <!-- Poll button -->
          <button class="p-2 rounded-full hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>

          <!-- Emoji button -->
          <button class="p-2 rounded-full hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <!-- Schedule button -->
          <button class="p-2 rounded-full hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        <div class="flex items-center">
          <!-- Character counter -->
          {#if charCount > 0}
            <div class="mr-3 {isOverLimit ? 'text-red-500' : charRemaining < 20 ? 'text-yellow-500' : 'text-gray-500'}">
              {charRemaining}
            </div>
          {/if}

          <!-- Tweet button -->
          <Button
            color="blue"
            pill={true}
            size="sm"
            disabled={!tweetContent.trim() || isOverLimit || isSubmitting}
            on:click={handleTweet}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  </div>
</Card>