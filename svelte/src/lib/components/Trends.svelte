<script lang="ts">
  import { Card } from 'flowbite-svelte';
  
  export let trends = [
    {
      id: 1,
      category: 'Technology',
      title: '#SvelteKit',
      tweets: '25.4K'
    },
    {
      id: 2,
      category: 'Business',
      title: '#GraphQL',
      tweets: '15.3K'
    },
    {
      id: 3,
      category: 'Entertainment',
      title: 'New Movie Release',
      tweets: '11.2K'
    },
    {
      id: 4,
      category: 'Sports',
      title: '#WorldCup',
      tweets: '87.6K'
    },
    {
      id: 5,
      category: 'Politics',
      title: 'Election Results',
      tweets: '32.1K'
    }
  ];
</script>

<Card class="p-4">
  <h2 class="text-xl font-bold mb-4">Trends for you</h2>
  
  <div class="space-y-4">
    {#each trends as trend (trend.id)}
      <div class="hover:bg-gray-100 p-2 rounded-lg -mx-2 cursor-pointer transition-colors duration-200">
        <div class="flex justify-between">
          <span class="text-xs text-gray-500">{trend.category} · Trending</span>
          <button class="text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
        <div class="font-bold">{trend.title}</div>
        <div class="text-xs text-gray-500">{trend.tweets} Tweets</div>
      </div>
    {/each}
  </div>
  
  <a href="#" class="text-blue-500 text-sm block mt-4 hover:underline">Show more</a>
</Card> 