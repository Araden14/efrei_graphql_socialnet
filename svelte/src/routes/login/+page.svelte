<script lang="ts">
  import { goto } from '$app/navigation';
  import { Card, Button, Label, Input, Alert } from 'flowbite-svelte';
  import { mutation } from 'svelte-apollo';
  import { auth } from '$lib/stores/auth';
  import { Login } from '$lib/graphql/generated';

  let username = '';
  let password = '';
  let errorMessage = '';
  let loading = false;

  async function handleLogin() {
    loading = true;
    errorMessage = '';

    try {
      const result = await Login({ 
        variables: { 
          email: username, 
          password: password,
          username: username
        } 
      });

      const response = result.data?.SignIn;

      if (response?.success) {
        auth.login({ id: '', username }, response.token || '');
        document.cookie = `token=${response.token}; path=/; max-age=3600`;
        goto('/');
      } else {
        errorMessage = response?.message || 'Login failed';
      }
    } catch (e) {
      errorMessage = 'An error occurred during login';
      console.error(e);
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
  <Card class="w-full max-w-md">
    <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
    
    {#if errorMessage}
      <Alert color="red" class="mb-4">{errorMessage}</Alert>
    {/if}
    
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <div>
        <Label for="username" class="mb-2">Email</Label>
        <Input 
          id="username" 
          type="text" 
          placeholder="Entrez votre email ici"
          bind:value={username} 
          required
        />
      </div>
      
      <div>
        <Label for="password" class="mb-2">Mot de passe</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="Entrez votre mot de passe ici"
          bind:value={password} 
          required
        />
      </div>
      
      <Button 
        type="submit" 
        color="blue" 
        class="w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
    
    <div class="mt-4 text-center">
      Don't have an account? <a href="/register" class="text-blue-600 hover:underline">Register</a>
    </div>
  </Card>
</div>