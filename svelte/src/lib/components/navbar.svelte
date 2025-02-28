<script>
  import UserProfile from './UserProfile.svelte';

  let navigation = [
        { name: 'Accueil', href: '/', current: true, icon: 'home' },
        { name: 'Profil', href: '/profile', current: true, icon: 'user' },
        { name: 'Explorer', href: '/explore', current: false, icon: 'search' },
        { name: 'Notifications', href: '/notifications', current: false, icon: 'bell' },
        { name: 'Messages', href: '/messages', current: false, icon: 'mail' },
        { name: 'Signets', href: '/bookmarks', current: false, icon: 'bookmark' },
        { name: 'Plus', href: '/more', current: false, icon: 'more-horizontal' },
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
                    <a href={item.href} class="flex items-center px-4 py-3 text-lg font-medium {item.current ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'} hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full mb-1 mx-2" aria-current={item.current ? 'page' : undefined}>
                        <svg class="w-6 h-6 {item.current ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            {#if item.icon === 'home'}
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                            {:else if item.icon === 'user'}
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM1.5 21h21M5.235 16.305a7.979 7.979 0 0 1 6.79-2.305 7.979 7.979 0 0 1 6.79 2.305"/>
                            {:else if item.icon === 'search'}
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-3.5-3.5M5 11a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"/>
                            {:else if item.icon === 'bell'}
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
                            {:else if (item.icon === 'mail')}
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>                                                          
                            {:else if (item.icon === 'bookmark')}
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>                              
                            {:else if (item.icon === 'more-horizontal')}
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                            {/if}
                        </svg>
                        <span class="ml-3">{item.name}</span>
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
