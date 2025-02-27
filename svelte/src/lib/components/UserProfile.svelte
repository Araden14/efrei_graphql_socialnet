<script lang="ts">
  import { Avatar } from 'flowbite-svelte';
  
  export let user = {
    username: 'John Doe',
    handle: 'johndoe',
    avatar: '/profile-placeholder.jpg'
  };
</script>

<div class="p-4">
  <button class="flex items-center justify-between w-full rounded-full hover:bg-gray-200 p-3 transition-colors duration-200">
    <div class="flex items-center">
      <Avatar src={user.avatar} alt={user.username} size="md" class="mr-3" />
      <div class="text-left">
        <div class="font-bold text-sm">{user.username}</div>
        <div class="text-gray-500 text-sm">@{user.handle}</div>
      </div>
    </div>
    
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  </button>
</div> 