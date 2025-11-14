import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  avatarHint: string;
};

export type Comment = {
  id: string;
  text: string;
  author: User;
  createdAt: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  coverImage: ImagePlaceholder;
  author: User;
  category: string;
  tags: string[];
  createdAt: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
  comments: Comment[];
};

const users: User[] = [
  { id: 'user-1', name: 'Jane Doe', avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-1')!.imageUrl, avatarHint: PlaceHolderImages.find(p => p.id === 'avatar-1')!.imageHint },
  { id: 'user-2', name: 'Sam Wilson', avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-2')!.imageUrl, avatarHint: PlaceHolderImages.find(p => p.id === 'avatar-2')!.imageHint },
  { id: 'user-3', name: 'Emily Carter', avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar-3')!.imageUrl, avatarHint: PlaceHolderImages.find(p => p.id === 'avatar-3')!.imageHint },
];

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    slug: 'the-future-of-ai-in-art',
    title: 'The Future of AI in Art',
    content: `# The Intersection of Creativity and Code

As artificial intelligence continues to evolve, its impact on the art world is becoming increasingly profound. From generative art created by complex algorithms to AI-powered tools that assist human artists, the lines between creator and tool are blurring.

## A New Renaissance?

Some argue that we are on the cusp of a new digital Renaissance, where AI acts as a muse, collaborator, and creator.
- **Generative Adversarial Networks (GANs)** can produce stunningly original visuals.
- **Style transfer** algorithms can apply the aesthetic of one image to another.
- **AI-driven music composition** is creating symphonies once thought impossible for a machine.

This post explores the exciting, and sometimes controversial, world of AI-generated art, featuring interviews with artists and technologists at the forefront of this revolution.`,
    coverImage: PlaceHolderImages.find(p => p.id === 'post-1')!,
    author: users[0],
    category: 'Art',
    tags: ['AI', 'Art', 'Creativity'],
    createdAt: '2024-05-15',
    stats: { views: 1200, likes: 256, comments: 32 },
    comments: [
      { id: 'comment-1', text: 'Fascinating read! AI is truly changing everything.', author: users[1], createdAt: '2024-05-15' },
      { id: 'comment-2', text: 'I have mixed feelings about this. Where is the human soul in this art?', author: users[2], createdAt: '2024-05-16' },
    ],
  },
  {
    id: 'post-2',
    slug: 'a-journey-through-the-cosmos',
    title: 'A Journey Through The Cosmos',
    content: `# Staring into the Abyss

The vastness of space has captivated humanity for millennia. With modern telescopes and space probes, we are peeling back the layers of the universe, revealing wonders beyond our wildest dreams.

## Wonders of the Universe
* **Nebulae:** Stellar nurseries where stars are born.
* **Black Holes:** Regions of spacetime where gravity is so strong that nothing can escape.
* **Exoplanets:** Worlds orbiting other stars, some of which may harbor life.

Join us on a visual and intellectual journey to the furthest reaches of our understanding. We'll explore the science behind pulsars, quasars, and the search for extraterrestrial intelligence.`,
    coverImage: PlaceHolderImages.find(p => p.id === 'post-5')!,
    author: users[1],
    category: 'Science',
    tags: ['Space', 'Astronomy', 'Physics'],
    createdAt: '2024-05-12',
    stats: { views: 2500, likes: 512, comments: 64 },
    comments: [
      { id: 'comment-3', text: 'This is mind-blowing stuff!', author: users[0], createdAt: '2024-05-12' },
    ],
  },
  {
    id: 'post-3',
    slug: 'the-rise-of-quantum-computing',
    title: 'The Rise of Quantum Computing',
    content: `# A New Computing Paradigm

Quantum computing is poised to revolutionize technology, science, and society. By harnessing the strange principles of quantum mechanics, these machines can solve problems that are intractable for even the most powerful classical supercomputers.

### Key Concepts
1.  **Qubits:** Unlike classical bits, qubits can exist in a superposition of 0 and 1.
2.  **Entanglement:** A spooky connection between qubits, where the state of one instantly affects another, regardless of distance.
3.  **Quantum Supremacy:** The point at which a quantum computer can perform a task that no classical computer can.

This article breaks down the complex world of quantum computing into understandable concepts and explores its potential applications, from drug discovery to financial modeling.`,
    coverImage: PlaceHolderImages.find(p => p.id === 'post-3')!,
    author: users[2],
    category: 'Technology',
    tags: ['Quantum Computing', 'Tech', 'Future'],
    createdAt: '2024-05-10',
    stats: { views: 800, likes: 128, comments: 16 },
    comments: [],
  },
  {
    id: 'post-4',
    slug: 'mindfulness-in-the-digital-age',
    title: 'Mindfulness in the Digital Age',
    content: `# Finding Calm in the Chaos

Our lives are increasingly saturated with digital noise. Constant notifications, endless scrolling, and the pressure to be always-on can take a toll on our mental well-being.

## The Power of Disconnecting
Mindfulness offers a powerful antidote. It's the practice of being present and fully aware of the current moment, without judgment.

- **Digital Detox:** Intentionally setting aside time away from screens.
- **Meditation Apps:** Using technology to help us disconnect from... technology.
- **Mindful Browsing:** Engaging with online content intentionally, rather than passively consuming.

Learn practical techniques to cultivate mindfulness and reclaim your attention in a world designed to steal it.`,
    coverImage: PlaceHolderImages.find(p => p.id === 'post-4')!,
    author: users[0],
    category: 'Lifestyle',
    tags: ['Mindfulness', 'Wellbeing', 'Digital Detox'],
    createdAt: '2024-05-08',
    stats: { views: 1500, likes: 340, comments: 45 },
    comments: [],
  },
];
