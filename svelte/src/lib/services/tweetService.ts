// This is a mock service that will be replaced with GraphQL queries/mutations later

// Mock user data
export const currentUser = {
id: 'user1',
username: 'Current User',
handle: 'currentuser',
avatar: '/docs/images/people/profile-picture-5.jpg',
bio: 'Twitter Clone Developer',
followersCount: 1024,
followingCount: 235
};

// Mock tweet data
export const tweets = [
{
id: 1,
content: 'Just launched our new SvelteKit & GraphQL Twitter clone! Check it out and let me know what you think. #SvelteKit #GraphQL #WebDevelopment',
author: {
id: 'user1',
username: 'Current User',
handle: 'currentuser',
avatar: '/docs/images/people/profile-picture-5.jpg'
},
createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    likes: 23,
comments: 5,
retweets: 7,
isLiked: true,
isRetweeted: false
},
{
id: 2,
content: 'GraphQL makes building social media apps so much easier. Single endpoint, no overfetching, and great developer experience! 🚀 #GraphQL #DeveloperExperience',
author: {
id: 'user2',
username: 'Jane Smith',
handle: 'janesmith',
avatar: '/docs/images/people/profile-picture-2.jpg'
},
createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 56,
comments: 12,
retweets: 9,
isLiked: false,
isRetweeted: true
},
{
id: 3,
content: 'SvelteKit is such a productive framework for building modern web applications. The developer experience is top notch! 💯 #Svelte #WebDev',
author: {
id: 'user3',
username: 'Robert Johnson',
handle: 'robertj',
avatar: '/docs/images/people/profile-picture-3.jpg'
},
createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    likes: 128,
comments: 24,
retweets: 32,
isLiked: false,
isRetweeted: false
},
{
id: 4,
content: 'Tailwind CSS + Flowbite makes styling applications so much faster! No context switching between files and the utility-first approach is great for rapid development. #TailwindCSS #Flowbite',
author: {
id: 'user4',
username: 'Sarah Williams',
handle: 'sarahw',
avatar: '/docs/images/people/profile-picture-4.jpg'
},
createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    likes: 84,
comments: 7,
retweets: 15,
isLiked: true,
isRetweeted: true
},
{
id: 5,
content: 'Working on a new open-source project to help developers build better social media applications. Will be sharing more details soon! #OpenSource #WebDevelopment',
author: {
id: 'user5',
username: 'Michael Brown',
handle: 'michaelb',
avatar: '/docs/images/people/profile-picture-1.jpg'
},
createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    likes: 214,
comments: 42,
retweets: 55,
isLiked: false,
isRetweeted: false
}
];

// Mock service functions that will be replaced with GraphQL later
export const tweetService = {
// Get all tweets
  getTweets: () => {
return Promise.resolve([...tweets]);
},

// Get tweets by a specific user
  getUserTweets: (userId: string) => {
return Promise.resolve(tweets.filter(tweet => tweet.author.id === userId));
},

// Post a new tweet
  postTweet: (content: string) => {
const newTweet = {
id: tweets.length + 1,
content,
author: { ...currentUser },
createdAt: new Date(),
likes: 0,
comments: 0,
retweets: 0,
isLiked: false,
isRetweeted: false
};

// In a real app, this would be an API call
    tweets.unshift(newTweet);
return Promise.resolve(newTweet);
},

// Like a tweet
  likeTweet: (tweetId: number) => {
const tweet = tweets.find(t => t.id === tweetId);
if (tweet) {
if (tweet.isLiked) {
tweet.likes--;
tweet.isLiked = false;
} else {
tweet.likes++;
tweet.isLiked = true;
}
return Promise.resolve(tweet);
}
return Promise.reject(new Error('Tweet not found'));
},

// Retweet
  retweet: (tweetId: number) => {
const tweet = tweets.find(t => t.id === tweetId);
if (tweet) {
if (tweet.isRetweeted) {
tweet.retweets--;
tweet.isRetweeted = false;
} else {
tweet.retweets++;
tweet.isRetweeted = true;
}
return Promise.resolve(tweet);
}
return Promise.reject(new Error('Tweet not found'));
},

// Delete a tweet
  deleteTweet: (tweetId: number) => {
const index = tweets.findIndex(t => t.id === tweetId);
if (index !== -1) {
const deletedTweet = tweets[index];
tweets.splice(index, 1);
return Promise.resolve(deletedTweet);
}
return Promise.reject(new Error('Tweet not found'));
}
};

// Mock trends data
export const trendsData = [
{
id: 1,
category: 'Technology',
title: '#SvelteKit',
tweets: '25.4K'
},
{
id: 2,
category: 'Programming',
title: '#GraphQL',
tweets: '15.3K'
},
{
id: 3,
category: 'Web Development',
title: '#TailwindCSS',
tweets: '42.1K'
},
{
id: 4,
category: 'Technology',
title: '#JavaScript',
tweets: '87.6K'
},
{
id: 5,
category: 'Technology',
title: '#OpenSource',
tweets: '32.1K'
}
];

// Mock who to follow suggestions
export const suggestedUsers = [
{
id: 'user2',
name: 'Jane Smith',
handle: 'janesmith',
avatar: '/docs/images/people/profile-picture-2.jpg',
bio: 'Software Developer | SvelteKit Enthusiast',
isVerified: true
},
{
id: 'user3',
name: 'Robert Johnson',
handle: 'robertj',
avatar: '/docs/images/people/profile-picture-3.jpg',
bio: 'UX Designer | Web Developer',
isVerified: false
},
{
id: 'user4',
name: 'Sarah Williams',
handle: 'sarahw',
avatar: '/docs/images/people/profile-picture-4.jpg',
bio: 'Frontend Developer | GraphQL Expert',
isVerified: true
}
];