<script lang="ts">
    import { Card, Button, Modal } from 'flowbite-svelte';
    import { publishComment } from '$lib/graphql/generated';

    export let open: boolean = false;
    export let postId: number;
    let content: string = '';

    async function createComment(postId: number, content: string) {
        try {
            const result = await publishComment({
                variables: {
                    postId: postId,
                    content: content
                }
            });
            console.log(result);
            open = false;
        } catch (e) {
            console.error('Error publishing comment:', e);
        }
    }
</script>

<Modal bind:open size="md" autoclose>
    <form class="space-y-6">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Ajouter un commentaire
        </h3>
        <div>
            <button class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre commentaire</button>
            <textarea id="comment" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your comment here" bind:value={content}></textarea>
        </div>
        <Button on:click={() => createComment(postId, content)}>Publier</Button>
        <Button color="light" on:click={() => open = false}>Annuler</Button>
    </form>
</Modal>
