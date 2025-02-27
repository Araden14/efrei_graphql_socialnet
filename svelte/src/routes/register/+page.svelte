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

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
  }
  
  .card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    width: 100%;
    max-width: 400px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .btn {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn.primary {
    background-color: #3b82f6;
    color: white;
  }
  
  .btn.primary:hover {
    background-color: #2563eb;
  }
  
  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .error-message {
    background-color: #fee2e2;
    color: #b91c1c;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .login-link {
    text-align: center;
    margin-top: 1.5rem;
  }
  
  a {
    color: #3b82f6;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
</style> 