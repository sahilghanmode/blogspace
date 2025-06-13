export const getArticleContent = (articleId) => {
  const contentMap = {
    1: [
      {
        type: 'paragraph',
        content: 'The web development landscape is evolving at an unprecedented pace. As we step into 2024, developers are witnessing a transformation that goes beyond just new frameworks and libraries. We\'re seeing fundamental shifts in how we approach building applications, from the rise of edge computing to the integration of AI-powered development tools.'
      },
      {
        type: 'paragraph',
        content: 'One of the most significant trends we\'re observing is the move towards full-stack frameworks that prioritize developer experience without sacrificing performance. Next.js, Remix, and SvelteKit are leading this charge, offering developers the ability to build complex applications with minimal configuration while maintaining excellent performance characteristics.'
      },
      {
        type: 'heading',
        content: 'The Rise of Edge Computing'
      },
      {
        type: 'paragraph',
        content: 'Edge computing is no longer a futuristic concept—it\'s becoming a practical necessity for modern web applications. With platforms like Vercel Edge Functions, Cloudflare Workers, and Deno Deploy, developers can now run server-side code closer to their users, resulting in dramatically improved performance and user experience.'
      },
      {
        type: 'quote',
        content: 'The future of web development lies not just in what we build, but where we deploy it. Edge computing is democratizing global performance optimization.'
      },
      {
        type: 'paragraph',
        content: 'This shift towards edge computing is particularly important for applications that serve global audiences. By processing requests at edge locations, we can reduce latency, improve reliability, and provide a more consistent user experience regardless of geographic location.'
      },
      {
        type: 'heading',
        content: 'AI-Powered Development Tools'
      },
      {
        type: 'paragraph',
        content: 'Artificial intelligence is revolutionizing how we write code. Tools like GitHub Copilot, Tabnine, and ChatGPT are becoming integral parts of the development workflow, helping developers write better code faster and catch potential issues before they become problems.'
      },
      {
        type: 'paragraph',
        content: 'But AI\'s impact goes beyond code completion. We\'re seeing AI-powered testing tools, automated code reviews, and even AI assistants that can help with architectural decisions. This isn\'t about replacing developers—it\'s about augmenting human creativity and problem-solving capabilities.'
      },
      {
        type: 'paragraph',
        content: 'As we look towards the future, it\'s clear that the developers who embrace these new technologies and adapt to changing paradigms will be the ones who thrive. The key is not just to learn new tools, but to understand the underlying principles and how they can be applied to solve real-world problems.'
      }
    ],
    2: [
      {
        type: 'paragraph',
        content: 'React Hooks fundamentally changed how we write React components when they were introduced in React 16.8. They allow us to use state and other React features in functional components, leading to cleaner, more reusable code.'
      },
      {
        type: 'paragraph',
        content: 'In this comprehensive guide, we\'ll explore all the essential hooks that every React developer should master, from the basic useState and useEffect to more advanced patterns with useContext, useReducer, and custom hooks.'
      },
      {
        type: 'heading',
        content: 'Understanding useState'
      },
      {
        type: 'paragraph',
        content: 'The useState hook is the foundation of state management in functional components. It returns an array with two elements: the current state value and a function to update it.'
      },
      {
        type: 'quote',
        content: 'Hooks don\'t replace your knowledge of React concepts. Instead, Hooks provide a more direct API to the React concepts you already know.'
      },
      {
        type: 'paragraph',
        content: 'One of the most powerful aspects of useState is its flexibility. You can store any type of value in state: primitives, objects, arrays, or even functions. However, it\'s important to remember that state updates are asynchronous and may be batched for performance.'
      }
    ],
    3: [
      {
        type: 'paragraph',
        content: 'Building scalable APIs is one of the most critical skills for backend developers. With Node.js and TypeScript, we have a powerful combination that allows us to build robust, type-safe APIs that can handle enterprise-level traffic.'
      },
      {
        type: 'paragraph',
        content: 'TypeScript brings static typing to JavaScript, catching errors at compile time rather than runtime. This is particularly valuable in API development where data consistency and error handling are paramount.'
      },
      {
        type: 'heading',
        content: 'Setting Up Your Project Structure'
      },
      {
        type: 'paragraph',
        content: 'A well-organized project structure is the foundation of any scalable application. We\'ll start by setting up a clean architecture that separates concerns and makes our codebase maintainable as it grows.'
      }
    ],
    4: [
      {
        type: 'paragraph',
        content: 'Minimalist web design is often misunderstood. It\'s not about using fewer elements or having lots of white space—though these can be part of it. True minimalism in web design is about intentionality: every element serves a purpose, and nothing is included without reason.'
      },
      {
        type: 'paragraph',
        content: 'The principles of minimalist design can help create websites that are not only beautiful but also highly functional and user-friendly. When done correctly, minimalist design reduces cognitive load and helps users focus on what matters most.'
      },
      {
        type: 'heading',
        content: 'The Psychology of Minimalism'
      },
      {
        type: 'quote',
        content: 'Simplicity is the ultimate sophistication. In web design, this means creating interfaces that feel effortless to use.'
      },
      {
        type: 'paragraph',
        content: 'Users today are overwhelmed with information and choices. A minimalist approach helps cut through the noise and present information in a way that\'s easy to digest and act upon.'
      }
    ],
    5: [
      {
        type: 'paragraph',
        content: 'Machine learning is no longer confined to data scientists and researchers. As web developers, we now have access to powerful ML tools and APIs that can enhance our applications in meaningful ways.'
      },
      {
        type: 'paragraph',
        content: 'From recommendation systems to natural language processing, machine learning can add intelligent features to web applications. The key is understanding when and how to integrate these capabilities effectively.'
      },
      {
        type: 'heading',
        content: 'Getting Started with TensorFlow.js'
      },
      {
        type: 'paragraph',
        content: 'TensorFlow.js allows us to run machine learning models directly in the browser or in Node.js applications. This opens up possibilities for real-time predictions, client-side processing, and privacy-preserving ML applications.'
      }
    ],
    6: [
      {
        type: 'paragraph',
        content: 'CSS Grid and Flexbox are both powerful layout systems, but they solve different problems. Understanding when to use each one—and how they can work together—is key to creating flexible, maintainable layouts.'
      },
      {
        type: 'paragraph',
        content: 'Flexbox excels at one-dimensional layouts: arranging items in a row or column. Grid, on the other hand, is designed for two-dimensional layouts where you need to control both rows and columns simultaneously.'
      },
      {
        type: 'heading',
        content: 'When to Use Flexbox'
      },
      {
        type: 'paragraph',
        content: 'Flexbox is perfect for component-level layouts: navigation bars, card layouts, centering content, and distributing space between items. It\'s intuitive and flexible, making it ideal for responsive design patterns.'
      },
      {
        type: 'heading',
        content: 'When to Use CSS Grid'
      },
      {
        type: 'paragraph',
        content: 'CSS Grid shines when you need to create complex, two-dimensional layouts. Think page layouts, image galleries, or any design where you need precise control over both horizontal and vertical positioning.'
      }
    ]
  };

  return contentMap[articleId] || [
    {
      type: 'paragraph',
      content: 'This is a sample article content. In a real application, this would be fetched from a database or CMS.'
    }
  ];
};
