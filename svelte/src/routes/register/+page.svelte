<script lang="ts">
  import { goto } from '$app/navigation';
  import { mutate } from '$lib/api/graphql';
  import { 
    Card, 
    Button, 
    Label, 
    Input, 
    Alert 
  } from 'flowbite-svelte';
  import { Register } from '$lib/graphql/generated';


  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let errorMessage = '';
  let loading = false;

  async function handleRegister() {
    loading = true;
    errorMessage = '';
    
    if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match';
      loading = false;
      return;
    }
    
    try {
      const result = await Register({
        variables: {
          username,
          password,
          email
        }
      });
      
      const response = result.data?.createUser;
      
      if (response?.success) {
        // Redirect to login page
        goto('/login?registered=true');
      } else {
        errorMessage = response?.message || 'Registration failed';
      }
    } catch (error) {
      errorMessage = 'An error occurred during registration';
      console.error(error);
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
  <Card class="w-full max-w-md">
    <h1 class="text-2xl font-bold text-center mb-6">Register</h1>
    
    {#if errorMessage}
      <Alert color="red" class="mb-4">
        {errorMessage}
      </Alert>
    {/if}
    
    <form on:submit|preventDefault={handleRegister} class="space-y-4">
      <div>
        <Label for="username" class="mb-2">Username</Label>
        <Input 
          id="username" 
          type="text" 
          placeholder="Choose a username"
          bind:value={username} 
          required
        />
      </div>
      
      <div>
        <Label for="email" class="mb-2">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="Enter your email"
          bind:value={email} 
          required
        />
      </div>
      
      <div>
        <Label for="password" class="mb-2">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="Choose a password"
          bind:value={password} 
          required
        />
      </div>
      
      <div>
        <Label for="confirmPassword" class="mb-2">Confirm Password</Label>
        <Input 
          id="confirmPassword" 
          type="password" 
          placeholder="Confirm your password"
          bind:value={confirmPassword} 
          required
        />
      </div>
      
      <Button 
        type="submit" 
        color="blue" 
        class="w-full"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
    
    <div class="mt-4 text-center">
      Already have an account? <a href="/login" class="text-blue-600 hover:underline">Login</a>
    </div>
  </Card>
</div>