<script>
  import UserProfile from './UserProfile.svelte';
  let navigation = [
        { name: 'Home', href: '#', current: true },
        { name: 'Explore', href: '#', current: false },
        { name: 'Notifications', href: '#', current: false },
        { name: 'Messages', href: '#', current: false },
        { name: 'Bookmarks', href: '#', current: false },
        { name: 'Lists', href: '#', current: false },
        { name: 'Profile', href: '#', current: false },
        { name: 'More', href: '#', current: false },
    ];
</script>

<nav class="bg-white dark:bg-gray-900 w-72 flex-shrink-0 border-r border-gray-200 hidden md:block h-full">
    <div class="h-full flex flex-col justify-between">
        <div>
            <div class="p-4">
                <a href="/" class="text-blue-500 flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                      </svg>
                    <h1 class="text-2xl font-bold mr-2 pl-6">Touitère</h1>
                    
                </a>
            </div>

            <nav class="mt-2">
                {#each navigation as item}
                    <a href={item.href} class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-full mb-1 mx-2" aria-current={item.current ? 'page' : undefined}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {item.name}
                    </a>
                {/each}
            </nav>
        </div>

        <!-- User Profile -->
        <div class="p-4">
            <UserProfile />
        </div>
    </div>
</nav>
