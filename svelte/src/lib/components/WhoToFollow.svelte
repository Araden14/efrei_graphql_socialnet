<script lang="ts">
  import { Avatar, Button, Card } from 'flowbite-svelte';

  export let suggestions = [
    {
      id: 1,
      name: 'Jane Smith',
      handle: 'janesmith',
      avatar: '/avatar1.png',
      bio: 'Software Developer | SvelteKit Enthusiast'
    },
    {
      id: 2,
      name: 'Robert Johnson',
      handle: 'robertj',
      avatar: '/avatar2.png',
      bio: 'UX Designer | Web Developer'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      handle: 'sarahw',
      avatar: '/avatar3.png',
      bio: 'Frontend Developer | GraphQL Expert'
    }
  ];
  
</script>

<Card class="p-4 mt-4">
  <h2 class="text-xl font-bold mb-4">Qui suivre</h2>
  
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
        >
          Suivre
        </Button>
      </div>
    {/each}
  </div>
  
  <a href="#" class="text-blue-500 text-sm block mt-4 hover:underline">Afficher plus</a>
</Card> 