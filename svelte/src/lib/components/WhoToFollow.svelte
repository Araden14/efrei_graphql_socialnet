<script lang="ts">
  import { Avatar, Button, Card } from 'flowbite-svelte';
  
  export let suggestions = [
    {
      id: 1,
      name: 'Valentin circosta',
      handle: 'valentin',
      avatar: '/docs/images/people/profile-picture-5.jpg',
      bio: 'Software Developer | SvelteKit Enthusiast'
    },
    {
      id: 2,
      name: 'Valeryia Shin',
      handle: 'valeryia',
      avatar: '/docs/images/people/profile-picture-4.jpg',
      bio: 'UX Designer | Web Developer'
    },
    {
      id: 3,
      name: 'Paartheepan',
      handle: 'Paartheep@n',
      avatar: '/docs/images/people/profile-picture-1.jpg',
      bio: 'Frontend Developer | GraphQL Expert'
    }
  ];
  
  function handleFollow(id: number) {
    // This will be implemented with GraphQL later
    console.log(`Following user ${id}`);
  }
</script>

<Card class="p-4">
  <h2 class="text-xl font-bold mb-4">Who to follow</h2>
  
  <div class="space-y-4">
    {#each suggestions as user (user.id)}
      <div class="flex items-center justify-between py-2">
        <div class="flex items-center">
          <Avatar src={user.avatar} alt={user.name} size="md" class="mr-3" />
          <div>
            <div class="flex items-center">
              <span class="font-bold text-sm hover:underline cursor-pointer">{user.name}</span>
              <span class="text-gray-500 ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <div class="text-gray-500 text-sm">@{user.handle}</div>
          </div>
        </div>
        
        <Button
          color="dark"
          pill={true}
          size="xs"
          class="bg-black hover:bg-gray-800"
          on:click={() => handleFollow(user.id)}
        >
          Follow
        </Button>
      </div>
    {/each}
  </div>
  
  <a href="#" class="text-blue-500 text-sm block mt-4 hover:underline">Show more</a>
</Card> 