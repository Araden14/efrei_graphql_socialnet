<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { mutate } from '$lib/api/graphql';
  import {
    Button,
    Avatar,
    Spinner
  } from 'flowbite-svelte';

  // Import components
  import Post from '$lib/components/Post.svelte';
  import TweetComposer from '$lib/components/TweetComposer.svelte';
  import UserProfile from '$lib/components/UserProfile.svelte';
  import Trends from '$lib/components/Trends.svelte';
  import WhoToFollow from '$lib/components/WhoToFollow.svelte';
  
  // Import our mock service
  import { tweetService, currentUser, trendsData, suggestedUsers } from '$lib/services/tweetService';
  
  let posts = [];
  let loading = true;
  let error = '';

  // Load tweets on mount
  onMount(async () => {
    try {
      loading = true;
      posts = await tweetService.getTweets();
    } catch (err) {
      error = err.message || 'Failed to load tweets';
    } finally {
      loading = false;
    }
  });

  // Handle posting a new tweet
  async function handleTweet(event) {
    const { content } = event.detail;
    
    try {
      const newTweet = await tweetService.postTweet(content);
      posts = [newTweet, ...posts];
    } catch (err) {
      error = err.message || 'Failed to post tweet';
    }
  }
</script>

<div class="flex min-h-screen bg-white">
  <!-- Left Sidebar -->
  <div class="w-64 lg:w-72 flex-shrink-0 border-r border-gray-200 hidden md:block">
    <div class="h-full flex flex-col justify-between">
      <!-- Logo and Navigation -->
      <div>
        <div class="p-4">
          <a href="/" class="text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
            </svg>
          </a>
        </div>
        
        <nav class="mt-2">
          <a href="/" class="flex items-center px-4 py-3 text-lg font-bold text-black hover:bg-gray-100 rounded-full mb-1 mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </a>
          
          <a href="#" class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-full mb-1 mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            Explore
          </a>
          
          <a href="#" class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-full mb-1 mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notifications
          </a>
          
          <a href="#" class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-full mb-1 mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Messages
          </a>
          
          <a href="#" class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-full mb-1 mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Bookmarks
          </a>
          
          <a href="#" class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-full mb-1 mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Lists
          </a>
          
          <a href="#" class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-full mb-1 mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </a>
          
          <a href="#" class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-full mb-1 mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More
          </a>
        </nav>
        
        <div class="px-4 mt-4">
          <Button color="blue" pill={true} class="w-full py-3 font-bold">
            Tweet
          </Button>
        </div>
      </div>
      
      <!-- User Profile -->
      <div class="mt-auto">
        <UserProfile user={currentUser} />
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-1 min-w-0 border-r border-gray-200">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Home</h1>
        <a href="#" class="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </a>
      </div>
      
      <!-- Tab Navigation -->
      <div class="flex mt-3 border-b border-transparent">
        <button class="flex-1 py-3 text-center font-bold text-blue-500 border-b-2 border-blue-500">
          For you
        </button>
        <button class="flex-1 py-3 text-center font-medium text-gray-500 hover:bg-gray-100">
          Following
        </button>
      </div>
    </div>
    
    <!-- Tweet Composer -->
    <div class="px-4">
      <TweetComposer on:tweet={handleTweet} userAvatar={currentUser.avatar} />
    </div>
    
    <!-- Post Feed -->
    <div class="divide-y divide-gray-100">
      {#if loading}
        <div class="flex justify-center p-6">
          <Spinner size="8" />
        </div>
      {:else if error}
        <div class="p-4 bg-red-50 text-red-500 text-center">
          {error}
          <button class="ml-2 text-blue-500 hover:underline" on:click={() => location.reload()}>Retry</button>
        </div>
      {:else if posts.length === 0}
        <div class="p-6 text-center text-gray-500">
          <p class="text-lg">No tweets yet</p>
          <p class="mt-2">Be the first to tweet!</p>
        </div>
      {:else}
        {#each posts as post (post.id)}
          <div class="hover:bg-gray-50">
            <Post {post} />
          </div>
        {/each}
      {/if}
    </div>
  </div>
  
  <!-- Right Sidebar - only visible on large screens -->
  <div class="hidden lg:block w-80 2xl:w-96 flex-shrink-0">
    <div class="p-4 sticky top-0">
      <!-- Search Box -->
      <div class="relative mb-6">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="search" 
          class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-200 rounded-full bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Twitter" 
        />
      </div>
      
      <!-- Trends -->
      <div class="mb-6">
        <Trends trends={trendsData} />
      </div>
      
      <!-- Who to follow -->
      <div class="mb-6">
        <WhoToFollow suggestions={suggestedUsers} />
      </div>
      
      <!-- Footer Links -->
      <div class="text-xs text-gray-500">
        <a href="#" class="hover:underline mr-2">Terms of Service</a>
        <a href="#" class="hover:underline mr-2">Privacy Policy</a>
        <a href="#" class="hover:underline mr-2">Cookie Policy</a>
        <a href="#" class="hover:underline mr-2">Accessibility</a>
        <a href="#" class="hover:underline mr-2">Ads info</a>
        <a href="#" class="hover:underline">More</a>
        <div class="mt-1">© 2023 Twitter Clone</div>
      </div>
    </div>
  </div>
</div>
