<script lang="ts">
    import { onMount } from 'svelte';
	import { getPosts, publishPost, likeAPost } from '$lib/graphql/generated';
	import { client } from '$lib/api/apollo';
	import { GetPostsDoc } from '$lib/graphql/generated';
	import type { GetPostsQuery, PublishPostMutationVariables, PublishPostMutation, LikeAPostMutationVariables, LikeAPostMutation } from '$lib/graphql/generated';
    import { Button, Card , Alert, Input, Label, Progressbar, Avatar } from 'flowbite-svelte';
    import Comment from '$lib/components/comment.svelte';
    import TweetComposer from '$lib/components/TweetComposer.svelte';
    import Trends from '$lib/components/Trends.svelte';
    import WhoToFollow from '$lib/components/WhoToFollow.svelte';
    import Navbar from '$lib/components/navbar.svelte';
	let posts: GetPostsQuery | undefined = undefined;
	let loading = true;
	let error: any = null;
    async function handleLikePost(postId: number) {
        try {
            const result = await likeAPost({
                variables: {
                    postId: postId
                }
            })
            console.log(result)
        } catch (e) {
            console.error('Error liking post:', e);
        }
    }
    let open = false;
    let selectedPostId: number | null = null;
    async function handleOpenComment(postId: number) {
        open = true;
        selectedPostId = postId;
    }

	onMount(async () => {
		try {
			const result = await client.query({
				query: GetPostsDoc
			});
			posts = result.data;
			loading = false;
		} catch (e) {
			error = e;
			loading = false;
		}
	});

    function formatDate(date: string) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

</script>

<div class="grid grid-cols-3 gap-4">
    <div>
        <Navbar />
    </div>

    <!-- Middle Column (Posts) -->
    <div class="col-span-1">
        <TweetComposer />
        {#if loading}
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        {:else if error}
            <p>Error: {error.message}</p>
        {:else if posts}
            {#each posts.fetchPosts as post}
                <Card class="p-4 mt-2 hover:bg-gray-50 transition duration-100 ease-in-out cursor-pointer" size="md">
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
                                <button class="flex items-center hover:text-blue-500 group" on:click={() => handleOpenComment(post.id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 mr-1 group-hover:bg-blue-50 rounded-full p-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    <span class="text-xs">{post.comments?.length || 0}</span>
                                </button>

                                <!-- Like button -->
                                <button class="flex items-center hover:text-red-500 group" on:click={() => handleLikePost(post.id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 mr-1 group-hover:bg-red-50 rounded-full p-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    <span class="text-xs">{post.likes?.length || 0}</span>
                                </button>

                                <!-- Share button -->
                                <button class="flex items-center hover:text-blue-500 group">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 mr-1 group-hover:bg-blue-50 rounded-full p-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            {/each}
            {#if posts}
                {#each posts.fetchPosts as post}
                    {#if post.comments}
                        {#each post.comments as comment}
                            <div>{comment.content}</div>
                        {/each}
                    {/if}
                {/each}
            {/if}
        {/if}
    </div>

    <!-- Right Sidebar (Trends and Who to Follow) -->
    <div class="col-span-1">
        <Trends />
        <WhoToFollow />
    </div>
</div>
{#if selectedPostId !== null}
    <Comment open={open} postId={selectedPostId} />
{/if}