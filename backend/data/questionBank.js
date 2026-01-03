// server/data/questionBank.js

const QUESTION_BANK = {
  DSA: [
    {
      id: "dsa_e1",
      question:
        "What is the time complexity of accessing an array element by index?",
      options: [
        { text: "O(1)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Arrays",
      explanation:
        "Arrays allow random access to elements using their index in constant time.",
    },
    {
      id: "dsa_e2",
      question: "Which data structure follows LIFO?",
      options: [
        { text: "Queue", isCorrect: false },
        { text: "Stack", isCorrect: true },
        { text: "Linked List", isCorrect: false },
        { text: "Tree", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Stacks",
      explanation: "Stack uses Last-In-First-Out (LIFO) principle.",
    },
    {
      id: "dsa_e3",
      question: "What does BFS stand for?",
      options: [
        { text: "Breadth-First Search", isCorrect: true },
        { text: "Best-First Search", isCorrect: false },
        { text: "Binary-First Search", isCorrect: false },
        { text: "Breadth-First Sort", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Graphs",
      explanation:
        "BFS explores neighbor nodes first before moving to the next level neighbors.",
    },
    {
      id: "dsa_e4",
      question:
        "What is the space complexity of a recursive function that has a maximum call depth of n?",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n)", isCorrect: true },
        { text: "O(n^2)", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Recursion",
      explanation:
        "Each recursive call is stored on the call stack, leading to O(n) space complexity for n depth.",
    },
    {
      id: "dsa_e5",
      question: "Which operation is NOT efficient in a singly linked list?",
      options: [
        { text: "Insertion at beginning", isCorrect: false },
        { text: "Deletion at beginning", isCorrect: false },
        { text: "Accessing last element", isCorrect: true },
        { text: "Insertion after a given node", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Linked Lists",
      explanation:
        "Accessing the last element requires O(n) time as we must traverse the entire list.",
    },
    {
      id: "dsa_e6",
      question: "What is a complete binary tree?",
      options: [
        { text: "All levels are filled", isCorrect: false },
        {
          text: "All levels are filled except possibly the last, which is filled from left to right",
          isCorrect: true,
        },
        { text: "Every node has exactly two children", isCorrect: false },
        { text: "Height is minimum", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Trees",
      explanation:
        "A complete binary tree has all levels filled except possibly the last level, which fills from left to right.",
    },
    {
      id: "dsa_e7",
      question: "Which data structure uses FIFO principle?",
      options: [
        { text: "Stack", isCorrect: false },
        { text: "Queue", isCorrect: true },
        { text: "Tree", isCorrect: false },
        { text: "Graph", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Queues",
      explanation: "Queue follows First-In-First-Out (FIFO) ordering.",
    },
    {
      id: "dsa_e8",
      question: "What is the best case time complexity of Linear Search?",
      options: [
        { text: "O(1)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n log n)", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Searching",
      explanation:
        "Best case occurs when the element is found at the first position.",
    },
    {
      id: "dsa_e9",
      question: "Which traversal visits nodes level by level in a tree?",
      options: [
        { text: "Inorder", isCorrect: false },
        { text: "Preorder", isCorrect: false },
        { text: "Postorder", isCorrect: false },
        { text: "Level Order", isCorrect: true },
      ],
      difficulty: "easy",
      topic: "Trees",
      explanation:
        "Level order traversal uses BFS to visit nodes level by level.",
    },
    {
      id: "dsa_e10",
      question:
        "What is the minimum number of nodes in a binary tree of height h?",
      options: [
        { text: "h", isCorrect: false },
        { text: "h + 1", isCorrect: true },
        { text: "2^h", isCorrect: false },
        { text: "2^h - 1", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Trees",
      explanation:
        "Minimum nodes occur in a skewed tree where each level has only one node.",
    },
    {
      id: "dsa_e11",
      question: "Which of the following is a linear data structure?",
      options: [
        { text: "Tree", isCorrect: false },
        { text: "Graph", isCorrect: false },
        { text: "Array", isCorrect: true },
        { text: "Heap", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Basics",
      explanation: "Arrays store elements in a contiguous linear sequence.",
    },
    {
      id: "dsa_e12",
      question: "What is the time complexity of push operation in a stack?",
      options: [
        { text: "O(1)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Stacks",
      explanation:
        "Push operation adds an element to the top of the stack in constant time.",
    },
    {
      id: "dsa_e13",
      question: "Which algorithm is used for checking balanced parentheses?",
      options: [
        { text: "Queue", isCorrect: false },
        { text: "Stack", isCorrect: true },
        { text: "Tree", isCorrect: false },
        { text: "Hash Table", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Stacks",
      explanation:
        "Stack's LIFO property makes it ideal for matching opening and closing parentheses.",
    },
    {
      id: "dsa_e14",
      question: "What is a leaf node in a tree?",
      options: [
        { text: "Root node", isCorrect: false },
        { text: "Node with no children", isCorrect: true },
        { text: "Node with one child", isCorrect: false },
        { text: "Node with two children", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Trees",
      explanation:
        "A leaf node is a node that has no children (terminal node).",
    },
    {
      id: "dsa_e15",
      question: "Which sorting algorithm is considered the simplest?",
      options: [
        { text: "Quick Sort", isCorrect: false },
        { text: "Merge Sort", isCorrect: false },
        { text: "Bubble Sort", isCorrect: true },
        { text: "Heap Sort", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Sorting",
      explanation:
        "Bubble Sort repeatedly swaps adjacent elements if they are in wrong order.",
    },
    {
      id: "dsa_e16",
      question:
        "What is the maximum number of nodes at level L in a binary tree?",
      options: [
        { text: "2^L", isCorrect: true },
        { text: "L", isCorrect: false },
        { text: "2L", isCorrect: false },
        { text: "2^(L-1)", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Trees",
      explanation: "At level L, a binary tree can have at most 2^L nodes.",
    },
    {
      id: "dsa_e17",
      question: "Which data structure is best for implementing recursion?",
      options: [
        { text: "Queue", isCorrect: false },
        { text: "Stack", isCorrect: true },
        { text: "Array", isCorrect: false },
        { text: "Linked List", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Recursion",
      explanation:
        "System stack stores function calls during recursion using LIFO principle.",
    },
    {
      id: "dsa_e18",
      question: "What is the time complexity of enqueue operation in a queue?",
      options: [
        { text: "O(1)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n log n)", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Queues",
      explanation:
        "Enqueue adds an element to the rear of the queue in constant time.",
    },
    {
      id: "dsa_e19",
      question: "Which of the following is NOT a stable sorting algorithm?",
      options: [
        { text: "Merge Sort", isCorrect: false },
        { text: "Bubble Sort", isCorrect: false },
        { text: "Quick Sort", isCorrect: true },
        { text: "Insertion Sort", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Sorting",
      explanation:
        "Quick Sort is not stable as it may change the relative order of equal elements.",
    },
    {
      id: "dsa_e20",
      question: "What is the degree of a node in a tree?",
      options: [
        { text: "Number of children", isCorrect: true },
        { text: "Number of parents", isCorrect: false },
        { text: "Height from root", isCorrect: false },
        { text: "Number of siblings", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Trees",
      explanation: "The degree of a node is the number of children it has.",
    },

    // ==================== MEDIUM QUESTIONS (20) ====================
    {
      id: "dsa_m1",
      question: "What is the worst-case time complexity of Quick Sort?",
      options: [
        { text: "O(n log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Sorting",
      explanation:
        "Quick Sort degrades to O(n^2) when the pivot is the smallest or largest element repeatedly.",
    },
    {
      id: "dsa_m2",
      question:
        "Which algorithm is used to find the shortest path in a weighted graph?",
      options: [
        { text: "BFS", isCorrect: false },
        { text: "DFS", isCorrect: false },
        { text: "Dijkstra's Algorithm", isCorrect: true },
        { text: "Kruskal's Algorithm", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "Dijkstra's algorithm finds the shortest path from a source to all other nodes in a graph with non-negative weights.",
    },
    {
      id: "dsa_m3",
      question: "Which is a Dynamic Programming problem?",
      options: [
        { text: "Binary Search", isCorrect: false },
        { text: "Fibonacci Sequence", isCorrect: true },
        { text: "Merge Sort", isCorrect: false },
        { text: "Linear Search", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "DP",
      explanation:
        "Fibonacci is a classic DP problem where overlapping subproblems can be optimized.",
    },
    {
      id: "dsa_m4",
      question: "What is the time complexity of building a heap from an array?",
      options: [
        { text: "O(n)", isCorrect: true },
        { text: "O(n log n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Heaps",
      explanation:
        "Building a heap using heapify can be done in O(n) time, not O(n log n).",
    },
    {
      id: "dsa_m5",
      question: "Which traversal of BST gives elements in sorted order?",
      options: [
        { text: "Preorder", isCorrect: false },
        { text: "Inorder", isCorrect: true },
        { text: "Postorder", isCorrect: false },
        { text: "Level Order", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Trees",
      explanation:
        "Inorder traversal of BST visits nodes in ascending order (left-root-right).",
    },
    {
      id: "dsa_m6",
      question: "What is the space complexity of Merge Sort?",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n)", isCorrect: true },
        { text: "O(n log n)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Sorting",
      explanation:
        "Merge Sort requires O(n) auxiliary space for merging subarrays.",
    },
    {
      id: "dsa_m7",
      question: "Which algorithm detects cycle in an undirected graph?",
      options: [
        { text: "Kahn's Algorithm", isCorrect: false },
        { text: "Union-Find (Disjoint Set)", isCorrect: true },
        { text: "Bellman-Ford", isCorrect: false },
        { text: "Prim's Algorithm", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "Union-Find efficiently detects cycles in undirected graphs during edge addition.",
    },
    {
      id: "dsa_m8",
      question:
        "What is the average time complexity of searching in a hash table?",
      options: [
        { text: "O(1)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Hashing",
      explanation:
        "Hash tables provide O(1) average case search with good hash functions and load factors.",
    },
    {
      id: "dsa_m9",
      question: "Which data structure is used in BFS implementation?",
      options: [
        { text: "Stack", isCorrect: false },
        { text: "Queue", isCorrect: true },
        { text: "Priority Queue", isCorrect: false },
        { text: "Array", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "BFS uses a queue to explore nodes level by level in FIFO order.",
    },
    {
      id: "dsa_m10",
      question: "What is the time complexity of deleting a node from a BST?",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(h) where h is height", isCorrect: true },
        { text: "O(n)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Trees",
      explanation:
        "Deletion in BST requires finding the node which takes O(h) time where h is tree height.",
    },
    {
      id: "dsa_m11",
      question: "Which sorting algorithm is best for nearly sorted arrays?",
      options: [
        { text: "Quick Sort", isCorrect: false },
        { text: "Heap Sort", isCorrect: false },
        { text: "Insertion Sort", isCorrect: true },
        { text: "Selection Sort", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Sorting",
      explanation:
        "Insertion Sort performs best O(n) time on nearly sorted arrays.",
    },
    {
      id: "dsa_m12",
      question:
        "What is the minimum number of comparisons needed to find both minimum and maximum in an array?",
      options: [
        { text: "n", isCorrect: false },
        { text: "2n", isCorrect: false },
        { text: "3n/2 - 2", isCorrect: true },
        { text: "2n - 2", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Arrays",
      explanation:
        "By comparing elements in pairs, we can find min and max in 3n/2 - 2 comparisons.",
    },
    {
      id: "dsa_m13",
      question:
        "Which algorithm is used to find strongly connected components?",
      options: [
        { text: "Dijkstra's", isCorrect: false },
        { text: "Kosaraju's Algorithm", isCorrect: true },
        { text: "Prim's", isCorrect: false },
        { text: "Floyd-Warshall", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "Kosaraju's algorithm uses two DFS passes to find strongly connected components.",
    },
    {
      id: "dsa_m14",
      question:
        "What is the time complexity of the optimal solution for 0/1 Knapsack using DP?",
      options: [
        { text: "O(n)", isCorrect: false },
        { text: "O(n * W)", isCorrect: true },
        { text: "O(2^n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "DP",
      explanation:
        "0/1 Knapsack DP solution has time complexity O(n*W) where n is items and W is capacity.",
    },
    {
      id: "dsa_m15",
      question: "Which data structure is used in DFS implementation?",
      options: [
        { text: "Queue", isCorrect: false },
        { text: "Stack", isCorrect: true },
        { text: "Heap", isCorrect: false },
        { text: "Hash Table", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "DFS uses a stack (or recursion which uses system stack) for backtracking.",
    },
    {
      id: "dsa_m16",
      question:
        "What is the time complexity of finding kth smallest element using Quick Select?",
      options: [
        { text: "O(n)", isCorrect: true },
        { text: "O(n log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
        { text: "O(k)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Searching",
      explanation:
        "Quick Select has average time complexity O(n) for finding kth element.",
    },
    {
      id: "dsa_m17",
      question: "Which tree traversal is used to delete a tree?",
      options: [
        { text: "Preorder", isCorrect: false },
        { text: "Inorder", isCorrect: false },
        { text: "Postorder", isCorrect: true },
        { text: "Level Order", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Trees",
      explanation:
        "Postorder traversal deletes children before parent, avoiding dangling pointers.",
    },
    {
      id: "dsa_m18",
      question:
        "What is the maximum number of edges in a complete undirected graph with n vertices?",
      options: [
        { text: "n", isCorrect: false },
        { text: "n-1", isCorrect: false },
        { text: "n(n-1)/2", isCorrect: true },
        { text: "n^2", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "Complete graph has edges between all pairs: C(n,2) = n(n-1)/2.",
    },
    {
      id: "dsa_m19",
      question: "Which algorithm is used to find Minimum Spanning Tree?",
      options: [
        { text: "Dijkstra's", isCorrect: false },
        { text: "Bellman-Ford", isCorrect: false },
        { text: "Kruskal's Algorithm", isCorrect: true },
        { text: "Floyd-Warshall", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "Kruskal's and Prim's algorithms find MST; Kruskal's uses edge-based greedy approach.",
    },
    {
      id: "dsa_m20",
      question: "What is the height of an AVL tree with n nodes?",
      options: [
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: true },
        { text: "O(n log n)", isCorrect: false },
        { text: "O(sqrt(n))", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Trees",
      explanation:
        "AVL trees are balanced, maintaining height of O(log n) through rotations.",
    },
    {
      id: "dsa_h1",
      question: "What is the time complexity of Floyd-Warshall Algorithm?",
      options: [
        { text: "O(n^2)", isCorrect: false },
        { text: "O(n^3)", isCorrect: true },
        { text: "O(V + E)", isCorrect: false },
        { text: "O(E log V)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Graphs",
      explanation:
        "Tarjan's algorithm finds bridges using DFS in linear time O(V+E).",
    },
    {
      id: "dsa_h15",
      question: "What is the lower bound for comparison-based sorting?",
      options: [
        { text: "O(n)", isCorrect: false },
        { text: "O(n log n)", isCorrect: true },
        { text: "O(n^2)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Sorting",
      explanation:
        "Decision tree analysis proves comparison-based sorting has lower bound of Ω(n log n).",
    },
    {
      id: "dsa_h16",
      question:
        "Which data structure is used to implement Fenwick Tree (Binary Indexed Tree)?",
      options: [
        { text: "Array with bit manipulation", isCorrect: true },
        { text: "Linked List", isCorrect: false },
        { text: "Hash Map", isCorrect: false },
        { text: "Stack", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Trees",
      explanation:
        "Fenwick Tree uses an array with clever bit manipulation for range queries.",
    },
    {
      id: "dsa_h17",
      question: "What is the time complexity of KMP string matching algorithm?",
      options: [
        { text: "O(n * m)", isCorrect: false },
        { text: "O(n + m)", isCorrect: true },
        { text: "O(n^2)", isCorrect: false },
        { text: "O(m log n)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Strings",
      explanation:
        "KMP preprocesses pattern in O(m) and searches text in O(n), total O(n+m).",
    },
    {
      id: "dsa_h18",
      question: "Which problem uses the concept of Disjoint Set Union (DSU)?",
      options: [
        { text: "Shortest Path", isCorrect: false },
        { text: "Kruskal's MST", isCorrect: true },
        { text: "Topological Sort", isCorrect: false },
        { text: "Binary Search", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Graphs",
      explanation:
        "Kruskal's algorithm uses DSU to efficiently detect cycles while adding edges.",
    },
    {
      id: "dsa_h19",
      question:
        "What is the space complexity of recursive Fibonacci without memoization?",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(n)", isCorrect: true },
        { text: "O(2^n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Recursion",
      explanation:
        "Maximum recursion depth is n, requiring O(n) space on call stack.",
    },
    {
      id: "dsa_h20",
      question: "Which algorithm is used for Topological Sorting?",
      options: [
        { text: "Prim's Algorithm", isCorrect: false },
        { text: "Kahn's Algorithm (BFS)", isCorrect: true },
        { text: "Dijkstra's Algorithm", isCorrect: false },
        { text: "Floyd-Warshall", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Graphs",
      explanation:
        "Kahn's algorithm uses BFS with in-degree counting for topological sort.",
    },
    {
      id: "dsa_e21",
      question: "What is the auxiliary space complexity of Bubble Sort?",
      options: [
        { text: "O(1)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Sorting",
      explanation:
        "Bubble Sort is an in-place algorithm requiring only constant extra space.",
    },
    {
      id: "dsa_e22",
      question: "Which of these is a self-balancing binary search tree?",
      options: [
        { text: "Binary Tree", isCorrect: false },
        { text: "AVL Tree", isCorrect: true },
        { text: "Binary Search Tree", isCorrect: false },
        { text: "Complete Binary Tree", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Trees",
      explanation:
        "AVL Tree automatically maintains balance through rotations after insertions/deletions.",
    },
    {
      id: "dsa_e23",
      question: "What is the primary operation of a Priority Queue?",
      options: [
        { text: "FIFO", isCorrect: false },
        { text: "LIFO", isCorrect: false },
        { text: "Process highest priority first", isCorrect: true },
        { text: "Random access", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Queues",
      explanation:
        "Priority Queue serves elements based on priority, not insertion order.",
    },
    {
      id: "dsa_e24",
      question: "Which data structure is used to implement undo functionality?",
      options: [
        { text: "Queue", isCorrect: false },
        { text: "Stack", isCorrect: true },
        { text: "Tree", isCorrect: false },
        { text: "Graph", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Stacks",
      explanation:
        "Stack's LIFO property makes it perfect for tracking and reversing operations.",
    },
    {
      id: "dsa_e25",
      question: "What is a circular linked list?",
      options: [
        { text: "List with no end", isCorrect: false },
        { text: "Last node points to first node", isCorrect: true },
        { text: "List with loops", isCorrect: false },
        { text: "Doubly linked list", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Linked Lists",
      explanation:
        "In circular linked list, the last node's next pointer points back to the first node.",
    },
    {
      id: "dsa_e26",
      question:
        "What is the time complexity of inserting at the beginning of a doubly linked list?",
      options: [
        { text: "O(1)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n log n)", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Linked Lists",
      explanation:
        "Insertion at beginning requires only updating a few pointers in constant time.",
    },
    {
      id: "dsa_e27",
      question: "Which is true about a binary search tree?",
      options: [
        { text: "Left child > parent", isCorrect: false },
        { text: "Right child < parent", isCorrect: false },
        { text: "Left child < parent < Right child", isCorrect: true },
        { text: "No specific order", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Trees",
      explanation:
        "BST property: left subtree values < parent < right subtree values.",
    },
    {
      id: "dsa_e28",
      question: "What is a hash collision?",
      options: [
        { text: "Two keys hash to same index", isCorrect: true },
        { text: "Hash table is full", isCorrect: false },
        { text: "Invalid key", isCorrect: false },
        { text: "Hash function error", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Hashing",
      explanation:
        "Collision occurs when different keys produce the same hash value.",
    },
    {
      id: "dsa_e29",
      question:
        "What is the time complexity of accessing an element in a linked list by index?",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(n)", isCorrect: true },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Linked Lists",
      explanation:
        "Must traverse from head to reach the desired index, taking O(n) time.",
    },
    {
      id: "dsa_e30",
      question:
        "Which sorting algorithm divides array into two parts repeatedly?",
      options: [
        { text: "Bubble Sort", isCorrect: false },
        { text: "Selection Sort", isCorrect: false },
        { text: "Merge Sort", isCorrect: true },
        { text: "Insertion Sort", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Sorting",
      explanation:
        "Merge Sort uses divide-and-conquer by recursively splitting and merging arrays.",
    },

    // ==================== ADDITIONAL MEDIUM QUESTIONS (15) ====================
    {
      id: "dsa_m21",
      question: "What is the time complexity of inserting into a balanced BST?",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(log n)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(n log n)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Trees",
      explanation:
        "Balanced BST maintains O(log n) height, making insertion logarithmic.",
    },
    {
      id: "dsa_m22",
      question: "Which technique is used in Merge Sort?",
      options: [
        { text: "Greedy", isCorrect: false },
        { text: "Divide and Conquer", isCorrect: true },
        { text: "Dynamic Programming", isCorrect: false },
        { text: "Backtracking", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Sorting",
      explanation:
        "Merge Sort divides array into halves, sorts them, and conquers by merging.",
    },
    {
      id: "dsa_m23",
      question: "What is the best case time complexity of Insertion Sort?",
      options: [
        { text: "O(n)", isCorrect: true },
        { text: "O(n log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Sorting",
      explanation:
        "Best case occurs when array is already sorted, requiring only n comparisons.",
    },
    {
      id: "dsa_m24",
      question: "Which collision resolution technique uses linked lists?",
      options: [
        { text: "Open Addressing", isCorrect: false },
        { text: "Chaining", isCorrect: true },
        { text: "Linear Probing", isCorrect: false },
        { text: "Double Hashing", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Hashing",
      explanation:
        "Chaining stores colliding elements in linked lists at each hash table index.",
    },
    {
      id: "dsa_m25",
      question:
        "What is the time complexity of checking if a graph is bipartite?",
      options: [
        { text: "O(V)", isCorrect: false },
        { text: "O(E)", isCorrect: false },
        { text: "O(V + E)", isCorrect: true },
        { text: "O(V * E)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "BFS/DFS with 2-coloring checks bipartiteness in O(V+E) time.",
    },
    {
      id: "dsa_m26",
      question: "Which algorithm is used for pattern matching in strings?",
      options: [
        { text: "Dijkstra's", isCorrect: false },
        { text: "KMP Algorithm", isCorrect: true },
        { text: "Floyd-Warshall", isCorrect: false },
        { text: "Kruskal's", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Strings",
      explanation:
        "Knuth-Morris-Pratt algorithm efficiently finds pattern occurrences in text.",
    },
    {
      id: "dsa_m27",
      question: "What is the parent of node at index i in a binary heap array?",
      options: [
        { text: "i/2", isCorrect: false },
        { text: "(i-1)/2", isCorrect: true },
        { text: "2i", isCorrect: false },
        { text: "2i+1", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Heaps",
      explanation:
        "In 0-indexed array representation, parent of node i is at (i-1)/2.",
    },
    {
      id: "dsa_m28",
      question:
        "Which data structure is best for implementing a median-finding algorithm?",
      options: [
        { text: "Array", isCorrect: false },
        { text: "Two Heaps", isCorrect: true },
        { text: "Stack", isCorrect: false },
        { text: "Queue", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Heaps",
      explanation:
        "Using max-heap and min-heap together allows O(1) median access.",
    },
    {
      id: "dsa_m29",
      question:
        "What is the time complexity of Prim's algorithm using binary heap?",
      options: [
        { text: "O(V^2)", isCorrect: false },
        { text: "O(E log V)", isCorrect: true },
        { text: "O(V + E)", isCorrect: false },
        { text: "O(E^2)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "With binary heap, Prim's algorithm runs in O(E log V) time.",
    },
    {
      id: "dsa_m30",
      question:
        "Which technique solves the Longest Increasing Subsequence problem efficiently?",
      options: [
        { text: "Greedy", isCorrect: false },
        { text: "Dynamic Programming", isCorrect: true },
        { text: "Divide and Conquer", isCorrect: false },
        { text: "Backtracking", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "DP",
      explanation:
        "LIS can be solved using DP in O(n^2) or optimized to O(n log n).",
    },
    {
      id: "dsa_m31",
      question:
        "What is the maximum number of edges in a directed acyclic graph (DAG) with n vertices?",
      options: [
        { text: "n", isCorrect: false },
        { text: "n-1", isCorrect: false },
        { text: "n(n-1)/2", isCorrect: true },
        { text: "n^2", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "DAG can have at most n(n-1)/2 edges (complete directed graph without cycles).",
    },
    {
      id: "dsa_m32",
      question: "Which algorithm detects cycle in a directed graph?",
      options: [
        { text: "BFS", isCorrect: false },
        { text: "DFS with recursion stack", isCorrect: true },
        { text: "Dijkstra's", isCorrect: false },
        { text: "Binary Search", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Graphs",
      explanation:
        "DFS with recursion stack (or color marking) detects cycles in directed graphs.",
    },
    {
      id: "dsa_m33",
      question:
        "What is the time complexity of extracting minimum from a binary min-heap?",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(log n)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(n log n)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Heaps",
      explanation:
        "After removing root, heapify down operation takes O(log n) time.",
    },
    {
      id: "dsa_m34",
      question: "Which problem uses Kadane's Algorithm?",
      options: [
        { text: "Maximum Subarray Sum", isCorrect: true },
        { text: "Shortest Path", isCorrect: false },
        { text: "Minimum Spanning Tree", isCorrect: false },
        { text: "Topological Sort", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Arrays",
      explanation:
        "Kadane's algorithm finds maximum sum contiguous subarray in O(n) time.",
    },
    {
      id: "dsa_m35",
      question: "What is the worst-case time complexity of Counting Sort?",
      options: [
        { text: "O(n + k)", isCorrect: true },
        { text: "O(n log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
        { text: "O(k)", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Sorting",
      explanation:
        "Counting Sort runs in O(n+k) where n is elements and k is range of input.",
    },
    {
      id: "dsa_h21",
      question:
        "What is the time complexity of Z-algorithm for pattern matching?",
      options: [
        { text: "O(n + m)", isCorrect: true },
        { text: "O(n * m)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
        { text: "O(m log n)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Strings",
      explanation:
        "Z-algorithm preprocesses and searches in linear O(n+m) time like KMP.",
    },
    {
      id: "dsa_h22",
      question: "Which data structure is used for Segment Tree?",
      options: [
        { text: "Array representation of tree", isCorrect: true },
        { text: "Linked List", isCorrect: false },
        { text: "Hash Map", isCorrect: false },
        { text: "Stack", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Trees",
      explanation:
        "Segment Tree uses array representation similar to heap for range queries.",
    },
    {
      id: "dsa_h23",
      question: "What is the time complexity of Manacher's Algorithm?",
      options: [
        { text: "O(n)", isCorrect: true },
        { text: "O(n log n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
        { text: "O(n^3)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Strings",
      explanation:
        "Manacher's algorithm finds longest palindromic substring in linear time.",
    },
    {
      id: "dsa_h24",
      question:
        "Which algorithm is used for finding all pairs shortest paths with negative edges?",
      options: [
        { text: "Dijkstra's", isCorrect: false },
        { text: "Floyd-Warshall", isCorrect: true },
        { text: "BFS", isCorrect: false },
        { text: "Prim's", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Graphs",
      explanation:
        "Floyd-Warshall handles negative edges and finds all-pairs shortest paths.",
    },
    {
      id: "dsa_h25",
      question:
        "What is the time complexity of Rabin-Karp algorithm in worst case?",
      options: [
        { text: "O(n + m)", isCorrect: false },
        { text: "O(n * m)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(m)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Strings",
      explanation:
        "Worst case occurs with many hash collisions, degrading to O(n*m).",
    },
    {
      id: "dsa_h26",
      question: "Which problem is solved using Convex Hull algorithm?",
      options: [
        { text: "Finding smallest boundary enclosing points", isCorrect: true },
        { text: "Shortest path", isCorrect: false },
        { text: "Maximum flow", isCorrect: false },
        { text: "Topological sort", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Geometry",
      explanation:
        "Convex Hull finds the smallest convex polygon containing all points.",
    },
    {
      id: "dsa_h27",
      question: "What is the space complexity of Iterative Deepening DFS?",
      options: [
        { text: "O(d)", isCorrect: true },
        { text: "O(b^d)", isCorrect: false },
        { text: "O(d^2)", isCorrect: false },
        { text: "O(b*d)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Graphs",
      explanation: "IDDFS combines DFS's O(d) space with BFS's completeness.",
    },
    {
      id: "dsa_h28",
      question: "Which algorithm solves the Edit Distance problem?",
      options: [
        { text: "Greedy", isCorrect: false },
        { text: "Dynamic Programming", isCorrect: true },
        { text: "Divide and Conquer", isCorrect: false },
        { text: "Backtracking", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "DP",
      explanation:
        "Edit Distance (Levenshtein) uses DP to find minimum operations needed.",
    },
    {
      id: "dsa_h29",
      question: "What is the time complexity of Huffman Coding?",
      options: [
        { text: "O(n)", isCorrect: false },
        { text: "O(n log n)", isCorrect: true },
        { text: "O(n^2)", isCorrect: false },
        { text: "O(2^n)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Greedy",
      explanation:
        "Building Huffman tree using priority queue takes O(n log n) time.",
    },
    {
      id: "dsa_h30",
      question:
        "Which data structure supports efficient range minimum queries?",
      options: [
        { text: "Array", isCorrect: false },
        { text: "Segment Tree", isCorrect: true },
        { text: "Stack", isCorrect: false },
        { text: "Queue", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Trees",
      explanation:
        "Segment Tree answers range queries in O(log n) with O(n) preprocessing.",
    },
    {
      id: "dsa_h31",
      question:
        "What is the time complexity of Articulation Points using Tarjan's algorithm?",
      options: [
        { text: "O(V + E)", isCorrect: true },
        { text: "O(V^2)", isCorrect: false },
        { text: "O(E log V)", isCorrect: false },
        { text: "O(V^3)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Graphs",
      explanation:
        "Tarjan's algorithm finds articulation points in single DFS pass O(V+E).",
    },
    {
      id: "dsa_h32",
      question: "Which technique is used in A* search algorithm?",
      options: [
        { text: "Greedy Best-First Search", isCorrect: false },
        { text: "Heuristic + Cost function", isCorrect: true },
        { text: "Pure BFS", isCorrect: false },
        { text: "Pure DFS", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Graphs",
      explanation:
        "A* uses f(n) = g(n) + h(n) combining actual cost and heuristic.",
    },
    {
      id: "dsa_h33",
      question:
        "What is the time complexity of finding the longest palindromic substring using DP?",
      options: [
        { text: "O(n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: true },
        { text: "O(n^3)", isCorrect: false },
        { text: "O(n log n)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "DP",
      explanation:
        "DP solution fills n×n table checking all substrings in O(n^2) time.",
    },
    {
      id: "dsa_h34",
      question: "Which algorithm is used for solving the N-Queens problem?",
      options: [
        { text: "Greedy", isCorrect: false },
        { text: "Dynamic Programming", isCorrect: false },
        { text: "Backtracking", isCorrect: true },
        { text: "Divide and Conquer", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Backtracking",
      explanation:
        "N-Queens uses backtracking to explore and prune invalid configurations.",
    },
    {
      id: "dsa_h35",
      question:
        "What is the time complexity of Trie insertion for a word of length m?",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(m)", isCorrect: true },
        { text: "O(m^2)", isCorrect: false },
        { text: "O(log m)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Trees",
      explanation:
        "Trie insertion processes each character of the word once, taking O(m) time.",
    },
  ],

  OS: [
    {
      id: "os_e1",
      question: "What is the core of the operating system called?",
      options: [
        { text: "Shell", isCorrect: false },
        { text: "Kernel", isCorrect: true },
        { text: "CPU", isCorrect: false },
        { text: "API", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Basics",
      explanation:
        "The Kernel is the central component that manages system resources.",
    },
    {
      id: "os_m1",
      question: "Which scheduling algorithm can cause starvation?",
      options: [
        { text: "Round Robin", isCorrect: false },
        { text: "FCFS", isCorrect: false },
        { text: "SJF (Shortest Job First)", isCorrect: true },
        { text: "Multilevel Queue", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Scheduling",
      explanation:
        "In SJF, long processes may wait indefinitely if short processes keep arriving.",
    },
    {
      id: "os_h1",
      question: "What is 'Thrashing' in memory management?",
      options: [
        { text: "Excessive paging activity", isCorrect: true },
        { text: "High CPU utilization", isCorrect: false },
        { text: "Deadlock occurrence", isCorrect: false },
        { text: "Hard disk failure", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Memory Management",
      explanation:
        "Thrashing occurs when the system spends more time paging than executing processes.",
    },
  ],
  CN: [
    // ==================== EASY QUESTIONS (30) ====================
    {
      id: "cn_e1",
      question: "What does OSI stand for?",
      options: [
        { text: "Open System Interconnection", isCorrect: true },
        { text: "Operating System Interface", isCorrect: false },
        { text: "Optical System Integration", isCorrect: false },
        { text: "Online System Internet", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "OSI Model",
      explanation:
        "OSI stands for Open System Interconnection, a reference model for network communication.",
    },
    {
      id: "cn_e2",
      question: "How many layers are in the OSI model?",
      options: [
        { text: "5", isCorrect: false },
        { text: "6", isCorrect: false },
        { text: "7", isCorrect: true },
        { text: "8", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "OSI Model",
      explanation:
        "The OSI model has 7 layers from Physical to Application layer.",
    },
    {
      id: "cn_e3",
      question: "Which layer is responsible for routing in the OSI model?",
      options: [
        { text: "Data Link Layer", isCorrect: false },
        { text: "Network Layer", isCorrect: true },
        { text: "Transport Layer", isCorrect: false },
        { text: "Session Layer", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "OSI Model",
      explanation:
        "The Network Layer (Layer 3) handles routing and logical addressing.",
    },
    {
      id: "cn_e4",
      question: "What is the primary function of the Physical Layer?",
      options: [
        { text: "Error detection", isCorrect: false },
        { text: "Bit transmission over medium", isCorrect: true },
        { text: "Routing", isCorrect: false },
        { text: "Session management", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "OSI Model",
      explanation:
        "Physical Layer transmits raw bits over the physical medium.",
    },
    {
      id: "cn_e5",
      question: "Which protocol works at the Application Layer?",
      options: [
        { text: "IP", isCorrect: false },
        { text: "TCP", isCorrect: false },
        { text: "HTTP", isCorrect: true },
        { text: "ARP", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Protocols",
      explanation:
        "HTTP operates at the Application Layer for web communication.",
    },
    {
      id: "cn_e6",
      question: "What does TCP stand for?",
      options: [
        { text: "Transmission Control Protocol", isCorrect: true },
        { text: "Transfer Communication Protocol", isCorrect: false },
        { text: "Transport Connection Protocol", isCorrect: false },
        { text: "Technical Control Protocol", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Transport Layer",
      explanation:
        "TCP stands for Transmission Control Protocol, providing reliable data transfer.",
    },
    {
      id: "cn_e7",
      question: "Which protocol is connectionless?",
      options: [
        { text: "TCP", isCorrect: false },
        { text: "UDP", isCorrect: true },
        { text: "FTP", isCorrect: false },
        { text: "SMTP", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Transport Layer",
      explanation:
        "UDP (User Datagram Protocol) is connectionless and doesn't guarantee delivery.",
    },
    {
      id: "cn_e8",
      question: "What is the standard port number for HTTP?",
      options: [
        { text: "21", isCorrect: false },
        { text: "25", isCorrect: false },
        { text: "80", isCorrect: true },
        { text: "443", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Protocols",
      explanation: "HTTP uses port 80 by default for web traffic.",
    },
    {
      id: "cn_e9",
      question: "What does IP stand for?",
      options: [
        { text: "Internet Protocol", isCorrect: true },
        { text: "Internal Protocol", isCorrect: false },
        { text: "Interface Protocol", isCorrect: false },
        { text: "Interconnection Protocol", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Layer",
      explanation:
        "IP stands for Internet Protocol, handling logical addressing and routing.",
    },
    {
      id: "cn_e10",
      question: "Which device operates at the Data Link Layer?",
      options: [
        { text: "Router", isCorrect: false },
        { text: "Switch", isCorrect: true },
        { text: "Hub", isCorrect: false },
        { text: "Gateway", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Devices",
      explanation:
        "Switches operate at Layer 2, using MAC addresses for forwarding.",
    },
    {
      id: "cn_e11",
      question: "What is the size of an IPv4 address?",
      options: [
        { text: "16 bits", isCorrect: false },
        { text: "32 bits", isCorrect: true },
        { text: "64 bits", isCorrect: false },
        { text: "128 bits", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Layer",
      explanation:
        "IPv4 addresses are 32 bits long, typically written in dotted decimal notation.",
    },
    {
      id: "cn_e12",
      question: "What does DNS stand for?",
      options: [
        { text: "Domain Name System", isCorrect: true },
        { text: "Data Network Service", isCorrect: false },
        { text: "Digital Name Server", isCorrect: false },
        { text: "Direct Network System", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Application Layer",
      explanation: "DNS translates domain names to IP addresses.",
    },
    {
      id: "cn_e13",
      question: "Which topology connects all devices to a central hub?",
      options: [
        { text: "Bus", isCorrect: false },
        { text: "Ring", isCorrect: false },
        { text: "Star", isCorrect: true },
        { text: "Mesh", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Topology",
      explanation:
        "Star topology has all devices connected to a central hub or switch.",
    },
    {
      id: "cn_e14",
      question: "What is the standard port for HTTPS?",
      options: [
        { text: "80", isCorrect: false },
        { text: "443", isCorrect: true },
        { text: "8080", isCorrect: false },
        { text: "22", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Protocols",
      explanation: "HTTPS uses port 443 for secure web communication.",
    },
    {
      id: "cn_e15",
      question: "Which layer provides error detection and correction?",
      options: [
        { text: "Physical Layer", isCorrect: false },
        { text: "Data Link Layer", isCorrect: true },
        { text: "Network Layer", isCorrect: false },
        { text: "Application Layer", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "OSI Model",
      explanation:
        "Data Link Layer handles error detection and frame delivery.",
    },
    {
      id: "cn_e16",
      question: "What does MAC stand for?",
      options: [
        { text: "Media Access Control", isCorrect: true },
        { text: "Multiple Address Configuration", isCorrect: false },
        { text: "Machine Address Code", isCorrect: false },
        { text: "Memory Access Control", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Data Link Layer",
      explanation:
        "MAC (Media Access Control) address is a unique hardware identifier.",
    },
    {
      id: "cn_e17",
      question: "Which protocol is used for sending emails?",
      options: [
        { text: "HTTP", isCorrect: false },
        { text: "FTP", isCorrect: false },
        { text: "SMTP", isCorrect: true },
        { text: "POP3", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Application Layer",
      explanation:
        "SMTP (Simple Mail Transfer Protocol) is used to send emails.",
    },
    {
      id: "cn_e18",
      question: "What is the size of an IPv6 address?",
      options: [
        { text: "32 bits", isCorrect: false },
        { text: "64 bits", isCorrect: false },
        { text: "128 bits", isCorrect: true },
        { text: "256 bits", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Layer",
      explanation: "IPv6 addresses are 128 bits long to support more devices.",
    },
    {
      id: "cn_e19",
      question: "Which device operates at the Physical Layer?",
      options: [
        { text: "Switch", isCorrect: false },
        { text: "Router", isCorrect: false },
        { text: "Hub", isCorrect: true },
        { text: "Bridge", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Devices",
      explanation:
        "Hubs operate at Layer 1, simply repeating signals to all ports.",
    },
    {
      id: "cn_e20",
      question: "What does FTP stand for?",
      options: [
        { text: "File Transfer Protocol", isCorrect: true },
        { text: "Fast Transfer Protocol", isCorrect: false },
        { text: "File Transmission Process", isCorrect: false },
        { text: "Format Transfer Protocol", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Application Layer",
      explanation:
        "FTP is used for transferring files between computers on a network.",
    },
    {
      id: "cn_e21",
      question: "Which layer handles end-to-end communication?",
      options: [
        { text: "Network Layer", isCorrect: false },
        { text: "Transport Layer", isCorrect: true },
        { text: "Session Layer", isCorrect: false },
        { text: "Data Link Layer", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "OSI Model",
      explanation:
        "Transport Layer provides end-to-end reliable data delivery.",
    },
    {
      id: "cn_e22",
      question:
        "What is the maximum data rate of a standard Ethernet (10BASE-T)?",
      options: [
        { text: "10 Mbps", isCorrect: true },
        { text: "100 Mbps", isCorrect: false },
        { text: "1 Gbps", isCorrect: false },
        { text: "10 Gbps", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Data Link Layer",
      explanation: "10BASE-T Ethernet operates at 10 Megabits per second.",
    },
    {
      id: "cn_e23",
      question: "Which protocol is used for remote login?",
      options: [
        { text: "HTTP", isCorrect: false },
        { text: "Telnet", isCorrect: true },
        { text: "SMTP", isCorrect: false },
        { text: "DNS", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Application Layer",
      explanation:
        "Telnet provides remote login capability (though insecure, replaced by SSH).",
    },
    {
      id: "cn_e24",
      question: "What does LAN stand for?",
      options: [
        { text: "Large Area Network", isCorrect: false },
        { text: "Local Area Network", isCorrect: true },
        { text: "Long Access Network", isCorrect: false },
        { text: "Limited Area Network", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Types",
      explanation:
        "LAN is a network covering a small geographical area like a building.",
    },
    {
      id: "cn_e25",
      question: "Which device operates at the Network Layer?",
      options: [
        { text: "Hub", isCorrect: false },
        { text: "Switch", isCorrect: false },
        { text: "Router", isCorrect: true },
        { text: "Repeater", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Devices",
      explanation:
        "Routers operate at Layer 3, routing packets based on IP addresses.",
    },
    {
      id: "cn_e26",
      question: "What is the default subnet mask for Class C network?",
      options: [
        { text: "255.0.0.0", isCorrect: false },
        { text: "255.255.0.0", isCorrect: false },
        { text: "255.255.255.0", isCorrect: true },
        { text: "255.255.255.255", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Layer",
      explanation:
        "Class C networks use 255.255.255.0 as the default subnet mask.",
    },
    {
      id: "cn_e27",
      question: "Which protocol resolves IP addresses to MAC addresses?",
      options: [
        { text: "DNS", isCorrect: false },
        { text: "ARP", isCorrect: true },
        { text: "DHCP", isCorrect: false },
        { text: "ICMP", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Layer",
      explanation:
        "ARP (Address Resolution Protocol) maps IP addresses to MAC addresses.",
    },
    {
      id: "cn_e28",
      question: "What does WAN stand for?",
      options: [
        { text: "Wide Area Network", isCorrect: true },
        { text: "Wireless Access Network", isCorrect: false },
        { text: "World Area Network", isCorrect: false },
        { text: "Web Access Network", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Network Types",
      explanation:
        "WAN covers large geographical areas, connecting multiple LANs.",
    },
    {
      id: "cn_e29",
      question: "Which protocol is used for secure shell access?",
      options: [
        { text: "Telnet", isCorrect: false },
        { text: "SSH", isCorrect: true },
        { text: "FTP", isCorrect: false },
        { text: "HTTP", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Application Layer",
      explanation:
        "SSH (Secure Shell) provides encrypted remote login and command execution.",
    },
    {
      id: "cn_e30",
      question: "What is the unit of data at the Data Link Layer called?",
      options: [
        { text: "Packet", isCorrect: false },
        { text: "Segment", isCorrect: false },
        { text: "Frame", isCorrect: true },
        { text: "Bit", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "OSI Model",
      explanation:
        "Data Link Layer encapsulates data into frames for transmission.",
    },

    // ==================== MEDIUM QUESTIONS (35) ====================
    {
      id: "cn_m1",
      question: "What is the maximum segment size in TCP called?",
      options: [
        { text: "MTU", isCorrect: false },
        { text: "MSS", isCorrect: true },
        { text: "MRU", isCorrect: false },
        { text: "MPU", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Transport Layer",
      explanation:
        "MSS (Maximum Segment Size) is the largest amount of data TCP can send in one segment.",
    },
    {
      id: "cn_m2",
      question: "Which algorithm does TCP use for congestion control?",
      options: [
        { text: "Bellman-Ford", isCorrect: false },
        { text: "Dijkstra's", isCorrect: false },
        { text: "Slow Start", isCorrect: true },
        { text: "Round Robin", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Transport Layer",
      explanation:
        "TCP uses Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.",
    },
    {
      id: "cn_m3",
      question: "What is the purpose of the sliding window protocol?",
      options: [
        { text: "Error detection", isCorrect: false },
        { text: "Flow control", isCorrect: true },
        { text: "Routing", isCorrect: false },
        { text: "Addressing", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Transport Layer",
      explanation:
        "Sliding window protocol manages flow control and reliable data transfer.",
    },
    {
      id: "cn_m4",
      question: "Which routing protocol uses distance vector algorithm?",
      options: [
        { text: "OSPF", isCorrect: false },
        { text: "RIP", isCorrect: true },
        { text: "BGP", isCorrect: false },
        { text: "IS-IS", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "RIP (Routing Information Protocol) uses distance vector based on hop count.",
    },
    {
      id: "cn_m5",
      question: "What is the time-to-live (TTL) field used for in IP?",
      options: [
        { text: "Error correction", isCorrect: false },
        { text: "Preventing infinite loops", isCorrect: true },
        { text: "Quality of service", isCorrect: false },
        { text: "Fragmentation", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "TTL prevents packets from circulating indefinitely by limiting hops.",
    },
    {
      id: "cn_m6",
      question: "Which protocol is used for automatic IP address assignment?",
      options: [
        { text: "ARP", isCorrect: false },
        { text: "RARP", isCorrect: false },
        { text: "DHCP", isCorrect: true },
        { text: "DNS", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses.",
    },
    {
      id: "cn_m7",
      question: "What is the main difference between TCP and UDP?",
      options: [
        { text: "Speed", isCorrect: false },
        { text: "Reliability", isCorrect: true },
        { text: "Port numbers", isCorrect: false },
        { text: "Header size", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Transport Layer",
      explanation:
        "TCP is connection-oriented and reliable, UDP is connectionless and unreliable.",
    },
    {
      id: "cn_m8",
      question: "Which type of switching is used in modern Ethernet switches?",
      options: [
        { text: "Circuit switching", isCorrect: false },
        { text: "Packet switching", isCorrect: true },
        { text: "Message switching", isCorrect: false },
        { text: "Cell switching", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Data Link Layer",
      explanation:
        "Ethernet switches use packet switching (store-and-forward or cut-through).",
    },
    {
      id: "cn_m9",
      question: "What is the purpose of subnetting?",
      options: [
        { text: "Increase IP addresses", isCorrect: false },
        { text: "Efficient IP address utilization", isCorrect: true },
        { text: "Speed up routing", isCorrect: false },
        { text: "Encryption", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "Subnetting divides networks into smaller segments for better address management.",
    },
    {
      id: "cn_m10",
      question: "Which access method does Ethernet use?",
      options: [
        { text: "Token passing", isCorrect: false },
        { text: "CSMA/CD", isCorrect: true },
        { text: "Polling", isCorrect: false },
        { text: "TDMA", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Data Link Layer",
      explanation:
        "Ethernet uses CSMA/CD (Carrier Sense Multiple Access with Collision Detection).",
    },
    {
      id: "cn_m11",
      question: "What is the purpose of NAT?",
      options: [
        { text: "Encryption", isCorrect: false },
        { text: "Address translation", isCorrect: true },
        { text: "Error detection", isCorrect: false },
        { text: "Routing", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "NAT (Network Address Translation) maps private IPs to public IPs.",
    },
    {
      id: "cn_m12",
      question: "Which protocol is used for network management?",
      options: [
        { text: "HTTP", isCorrect: false },
        { text: "FTP", isCorrect: false },
        { text: "SNMP", isCorrect: true },
        { text: "SMTP", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Application Layer",
      explanation:
        "SNMP (Simple Network Management Protocol) monitors and manages network devices.",
    },
    {
      id: "cn_m13",
      question: "What is the three-way handshake used for?",
      options: [
        { text: "Error detection", isCorrect: false },
        { text: "Connection establishment", isCorrect: true },
        { text: "Routing", isCorrect: false },
        { text: "Encryption", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Transport Layer",
      explanation:
        "TCP uses three-way handshake (SYN, SYN-ACK, ACK) to establish connections.",
    },
    {
      id: "cn_m14",
      question: "Which layer handles data compression?",
      options: [
        { text: "Transport Layer", isCorrect: false },
        { text: "Presentation Layer", isCorrect: true },
        { text: "Session Layer", isCorrect: false },
        { text: "Application Layer", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "OSI Model",
      explanation:
        "Presentation Layer handles data formatting, encryption, and compression.",
    },
    {
      id: "cn_m15",
      question: "What is the count-to-infinity problem associated with?",
      options: [
        { text: "Link state routing", isCorrect: false },
        { text: "Distance vector routing", isCorrect: true },
        { text: "Path vector routing", isCorrect: false },
        { text: "Static routing", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "Distance vector protocols like RIP can suffer from count-to-infinity problem.",
    },
    {
      id: "cn_m16",
      question: "Which protocol does OSPF use for routing?",
      options: [
        { text: "Distance Vector", isCorrect: false },
        { text: "Link State", isCorrect: true },
        { text: "Path Vector", isCorrect: false },
        { text: "Hybrid", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "OSPF (Open Shortest Path First) uses link state routing with Dijkstra's algorithm.",
    },
    {
      id: "cn_m17",
      question: "What is the purpose of the checksum field in TCP?",
      options: [
        { text: "Flow control", isCorrect: false },
        { text: "Error detection", isCorrect: true },
        { text: "Sequencing", isCorrect: false },
        { text: "Addressing", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Transport Layer",
      explanation:
        "Checksum detects errors in the TCP segment during transmission.",
    },
    {
      id: "cn_m18",
      question: "Which wireless standard operates at 5 GHz?",
      options: [
        { text: "802.11b", isCorrect: false },
        { text: "802.11g", isCorrect: false },
        { text: "802.11a", isCorrect: true },
        { text: "802.11", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Wireless Networks",
      explanation:
        "802.11a operates at 5 GHz, while 802.11b/g operate at 2.4 GHz.",
    },
    {
      id: "cn_m19",
      question: "What is fragmentation in networking?",
      options: [
        { text: "Breaking packets into smaller units", isCorrect: true },
        { text: "Combining packets", isCorrect: false },
        { text: "Encrypting packets", isCorrect: false },
        { text: "Routing packets", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "Fragmentation breaks large packets into smaller pieces to fit MTU limits.",
    },
    {
      id: "cn_m20",
      question: "Which protocol is used for multicasting?",
      options: [
        { text: "TCP", isCorrect: false },
        { text: "UDP", isCorrect: false },
        { text: "IGMP", isCorrect: true },
        { text: "ICMP", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "IGMP (Internet Group Management Protocol) manages multicast group membership.",
    },
    {
      id: "cn_m21",
      question: "What is the maximum hop count in RIP?",
      options: [
        { text: "10", isCorrect: false },
        { text: "15", isCorrect: true },
        { text: "20", isCorrect: false },
        { text: "255", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "RIP uses 15 as maximum hop count; 16 indicates unreachable destination.",
    },
    {
      id: "cn_m22",
      question: "Which technique is used for error control at Data Link Layer?",
      options: [
        { text: "Routing", isCorrect: false },
        { text: "ARQ", isCorrect: true },
        { text: "Congestion control", isCorrect: false },
        { text: "Flow control", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Data Link Layer",
      explanation:
        "ARQ (Automatic Repeat Request) retransmits frames with errors.",
    },
    {
      id: "cn_m23",
      question: "What does MTU stand for?",
      options: [
        { text: "Maximum Transmission Unit", isCorrect: true },
        { text: "Maximum Transfer Unit", isCorrect: false },
        { text: "Minimum Transmission Unit", isCorrect: false },
        { text: "Multiple Transmission Unit", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "MTU is the largest packet size that can be transmitted over a network.",
    },
    {
      id: "cn_m24",
      question: "Which layer manages dialog control?",
      options: [
        { text: "Transport Layer", isCorrect: false },
        { text: "Session Layer", isCorrect: true },
        { text: "Presentation Layer", isCorrect: false },
        { text: "Network Layer", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "OSI Model",
      explanation:
        "Session Layer establishes, maintains, and synchronizes communication sessions.",
    },
    {
      id: "cn_m25",
      question: "What is the purpose of ICMP?",
      options: [
        { text: "File transfer", isCorrect: false },
        { text: "Error reporting", isCorrect: true },
        { text: "Email delivery", isCorrect: false },
        { text: "Web browsing", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "ICMP (Internet Control Message Protocol) reports errors and provides diagnostics.",
    },
    {
      id: "cn_m26",
      question: "Which protocol uses port 53?",
      options: [
        { text: "HTTP", isCorrect: false },
        { text: "FTP", isCorrect: false },
        { text: "DNS", isCorrect: true },
        { text: "SMTP", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Application Layer",
      explanation: "DNS uses port 53 for domain name resolution queries.",
    },
    {
      id: "cn_m27",
      question: "What is piggybacking in data communication?",
      options: [
        { text: "Sending multiple packets", isCorrect: false },
        { text: "Acknowledgment with data", isCorrect: true },
        { text: "Error detection method", isCorrect: false },
        { text: "Routing technique", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Data Link Layer",
      explanation:
        "Piggybacking combines acknowledgment with outgoing data frames for efficiency.",
    },
    {
      id: "cn_m28",
      question: "Which wireless standard provides the highest data rate?",
      options: [
        { text: "802.11b", isCorrect: false },
        { text: "802.11g", isCorrect: false },
        { text: "802.11n", isCorrect: false },
        { text: "802.11ac", isCorrect: true },
      ],
      difficulty: "medium",
      topic: "Wireless Networks",
      explanation:
        "802.11ac operates at 5 GHz and provides multi-gigabit speeds.",
    },
    {
      id: "cn_m29",
      question: "What is the primary purpose of VPN?",
      options: [
        { text: "Speed enhancement", isCorrect: false },
        { text: "Secure remote access", isCorrect: true },
        { text: "Load balancing", isCorrect: false },
        { text: "DNS resolution", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Security",
      explanation:
        "VPN (Virtual Private Network) creates secure encrypted connections over public networks.",
    },
    {
      id: "cn_m30",
      question: "Which field in IP header is used for fragmentation?",
      options: [
        { text: "TTL", isCorrect: false },
        { text: "Fragment Offset", isCorrect: true },
        { text: "Protocol", isCorrect: false },
        { text: "Version", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Network Layer",
      explanation:
        "Fragment Offset indicates where a fragment belongs in the original datagram.",
    },
    {
      id: "cn_m31",
      question: "What is the window size in TCP used for?",
      options: [
        { text: "Error detection", isCorrect: false },
        { text: "Flow control", isCorrect: true },
        { text: "Routing", isCorrect: false },
        { text: "Encryption", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Transport Layer",
      explanation:
        "Window size controls how much data can be sent before acknowledgment.",
    },
    {
      id: "cn_m32",
      question: "Which protocol uses both TCP and UDP?",
      options: [
        { text: "HTTP", isCorrect: false },
        { text: "DNS", isCorrect: true },
        { text: "FTP", isCorrect: false },
        { text: "SMTP", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Application Layer",
      explanation:
        "DNS uses UDP for queries (port 53) and TCP for zone transfers.",
    },
    {
      id: "cn_m33",
      question: "What is the purpose of VLAN?",
      options: [
        { text: "Increase bandwidth", isCorrect: false },
        { text: "Logical network segmentation", isCorrect: true },
        { text: "Encryption", isCorrect: false },
        { text: "Load balancing", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Data Link Layer",
      explanation:
        "VLAN (Virtual LAN) logically segments network without physical separation.",
    },
    {
      id: "cn_m34",
      question: "Which mechanism does TCP use for reliable delivery?",
      options: [
        { text: "Checksums only", isCorrect: false },
        { text: "Acknowledgments and retransmission", isCorrect: true },
        { text: "Forward error correction", isCorrect: false },
        { text: "Parity bits", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Transport Layer",
      explanation:
        "TCP ensures reliability through acknowledgments and retransmission of lost segments.",
    },
    {
      id: "cn_m35",
      question: "What is the purpose of the Time-Wait state in TCP?",
      options: [
        { text: "Flow control", isCorrect: false },
        { text: "Ensure all packets are received", isCorrect: true },
        { text: "Congestion control", isCorrect: false },
        { text: "Error detection", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Transport Layer",
      explanation:
        "Time-Wait ensures late packets are handled before connection fully closes.",
    },

    // ==================== HARD QUESTIONS (35) ====================
    {
      id: "cn_h1",
      question: "What is the efficiency of Stop-and-Wait protocol?",
      options: [
        { text: "100%", isCorrect: false },
        { text: "50%", isCorrect: false },
        { text: "Depends on propagation delay", isCorrect: true },
        { text: "Always 75%", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Data Link Layer",
      explanation:
        "Efficiency = 1 / (1 + 2a) where a = propagation time / transmission time.",
    },
    {
      id: "cn_h2",
      question: "Which algorithm is used in Spanning Tree Protocol?",
      options: [
        { text: "Dijkstra's", isCorrect: false },
        { text: "Bellman-Ford", isCorrect: false },
        { text: "Kruskal's/Prim's", isCorrect: true },
        { text: "Floyd-Warshall", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Data Link Layer",
      explanation:
        "STP uses minimum spanning tree algorithm to prevent loops in switched networks.",
    },
    {
      id: "cn_h3",
      question:
        "What is the congestion window size after slow start threshold in TCP?",
      options: [
        { text: "Exponential growth continues", isCorrect: false },
        { text: "Linear growth (additive increase)", isCorrect: true },
        { text: "Remains constant", isCorrect: false },
        { text: "Decreases exponentially", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "After reaching threshold, TCP switches to congestion avoidance with linear increase.",
    },
    {
      id: "cn_h4",
      question: "What is the maximum efficiency of pure ALOHA?",
      options: [
        { text: "18.4%", isCorrect: true },
        { text: "36.8%", isCorrect: false },
        { text: "50%", isCorrect: false },
        { text: "100%", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Data Link Layer",
      explanation:
        "Pure ALOHA has maximum throughput of 18.4% due to collision probability.",
    },
    {
      id: "cn_h5",
      question: "Which routing protocol is used between autonomous systems?",
      options: [
        { text: "RIP", isCorrect: false },
        { text: "OSPF", isCorrect: false },
        { text: "BGP", isCorrect: true },
        { text: "EIGRP", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "BGP (Border Gateway Protocol) is the exterior gateway protocol for inter-AS routing.",
    },
    {
      id: "cn_h6",
      question: "What is the propagation delay formula?",
      options: [
        { text: "Distance / Bandwidth", isCorrect: false },
        { text: "Distance / Propagation speed", isCorrect: true },
        { text: "Packet size / Bandwidth", isCorrect: false },
        { text: "RTT / 2", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Performance",
      explanation: "Propagation delay = Distance / Speed of light in medium.",
    },
    {
      id: "cn_h7",
      question: "Which technique does Go-Back-N ARQ use?",
      options: [
        { text: "Selective retransmission", isCorrect: false },
        { text: "Retransmit from error frame onwards", isCorrect: true },
        { text: "Stop and wait", isCorrect: false },
        { text: "Forward error correction", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Data Link Layer",
      explanation:
        "Go-Back-N retransmits all frames from the first error onwards.",
    },
    {
      id: "cn_h8",
      question: "What is the purpose of Slow Start in TCP?",
      options: [
        { text: "Error detection", isCorrect: false },
        { text: "Gradually probe network capacity", isCorrect: true },
        { text: "Encryption", isCorrect: false },
        { text: "Routing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "Slow Start exponentially increases congestion window to find available bandwidth.",
    },
    {
      id: "cn_h9",
      question: "What is the maximum efficiency of slotted ALOHA?",
      options: [
        { text: "18.4%", isCorrect: false },
        { text: "36.8%", isCorrect: true },
        { text: "50%", isCorrect: false },
        { text: "100%", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Data Link Layer",
      explanation:
        "Slotted ALOHA doubles pure ALOHA efficiency to 36.8% by synchronizing transmissions.",
    },
    {
      id: "cn_h10",
      question: "Which field in TCP header is used for flow control?",
      options: [
        { text: "Sequence number", isCorrect: false },
        { text: "Acknowledgment number", isCorrect: false },
        { text: "Window size", isCorrect: true },
        { text: "Urgent pointer", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "Window size advertises receiver buffer space for flow control.",
    },
    {
      id: "cn_h11",
      question:
        "What problem does the Bellman-Ford algorithm solve in routing?",
      options: [
        { text: "Link state routing", isCorrect: false },
        { text: "Distance vector with negative weights", isCorrect: true },
        { text: "Circuit switching", isCorrect: false },
        { text: "Error detection", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "Bellman-Ford computes shortest paths even with negative edge weights.",
    },
    {
      id: "cn_h12",
      question: "What is the transmission delay formula?",
      options: [
        { text: "Distance / Speed", isCorrect: false },
        { text: "Packet size / Bandwidth", isCorrect: true },
        { text: "Distance / Bandwidth", isCorrect: false },
        { text: "RTT / 2", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Performance",
      explanation:
        "Transmission delay = Packet size (bits) / Bandwidth (bits/sec).",
    },
    {
      id: "cn_h13",
      question: "Which technique is used in Selective Repeat ARQ?",
      options: [
        { text: "Retransmit all from error", isCorrect: false },
        { text: "Retransmit only error frames", isCorrect: true },
        { text: "Stop and wait", isCorrect: false },
        { text: "No retransmission", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Data Link Layer",
      explanation:
        "Selective Repeat retransmits only damaged or lost frames, not all subsequent ones.",
    },
    {
      id: "cn_h14",
      question: "What is route poisoning in distance vector routing?",
      options: [
        { text: "Deleting routes", isCorrect: false },
        { text: "Setting metric to infinity", isCorrect: true },
        { text: "Encrypting routes", isCorrect: false },
        { text: "Caching routes", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "Route poisoning sets failed routes to infinity to prevent routing loops.",
    },
    {
      id: "cn_h15",
      question: "What is the purpose of the urgent pointer in TCP?",
      options: [
        { text: "Priority data handling", isCorrect: true },
        { text: "Error detection", isCorrect: false },
        { text: "Flow control", isCorrect: false },
        { text: "Sequencing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "Urgent pointer indicates urgent data that should be processed immediately.",
    },
    {
      id: "cn_h16",
      question: "Which mechanism prevents count-to-infinity problem?",
      options: [
        { text: "Split horizon", isCorrect: true },
        { text: "Load balancing", isCorrect: false },
        { text: "Subnetting", isCorrect: false },
        { text: "Fragmentation", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "Split horizon prevents routers from advertising routes back to their source.",
    },
    {
      id: "cn_h17",
      question:
        "What is the difference between cut-through and store-and-forward switching?",
      options: [
        { text: "Speed vs reliability", isCorrect: true },
        { text: "Cost", isCorrect: false },
        { text: "Topology", isCorrect: false },
        { text: "Protocol used", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Data Link Layer",
      explanation:
        "Cut-through is faster but doesn't check errors; store-and-forward checks entire frame.",
    },
    {
      id: "cn_h18",
      question: "What is the purpose of RARP?",
      options: [
        { text: "IP to MAC resolution", isCorrect: false },
        { text: "MAC to IP resolution", isCorrect: true },
        { text: "Domain name resolution", isCorrect: false },
        { text: "Port resolution", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "RARP (Reverse ARP) maps MAC addresses to IP addresses (replaced by DHCP).",
    },
    {
      id: "cn_h19",
      question: "What is the silly window syndrome?",
      options: [
        { text: "Small segments transmitted inefficiently", isCorrect: true },
        { text: "Large window size", isCorrect: false },
        { text: "Network congestion", isCorrect: false },
        { text: "Route flapping", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "Silly window syndrome occurs when small data segments are sent inefficiently.",
    },
    {
      id: "cn_h20",
      question: "Which algorithm does Dijkstra use in OSPF?",
      options: [
        { text: "Distance vector", isCorrect: false },
        { text: "Shortest path first", isCorrect: true },
        { text: "Bellman-Ford", isCorrect: false },
        { text: "Floyd-Warshall", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "OSPF uses Dijkstra's shortest path algorithm for link state routing.",
    },
    {
      id: "cn_h21",
      question: "What is the bandwidth-delay product?",
      options: [
        { text: "Maximum data in transit", isCorrect: true },
        { text: "Minimum bandwidth", isCorrect: false },
        { text: "Average delay", isCorrect: false },
        { text: "Throughput efficiency", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Performance",
      explanation:
        "Bandwidth-delay product = Bandwidth × RTT, representing 'pipe capacity'.",
    },
    {
      id: "cn_h22",
      question: "What is fast retransmit in TCP?",
      options: [
        { text: "Immediate timeout retransmission", isCorrect: false },
        { text: "Retransmit after 3 duplicate ACKs", isCorrect: true },
        { text: "Random retransmission", isCorrect: false },
        { text: "Scheduled retransmission", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "Fast retransmit triggers after receiving 3 duplicate ACKs without waiting for timeout.",
    },
    {
      id: "cn_h23",
      question: "What is the purpose of Type of Service (ToS) field in IP?",
      options: [
        { text: "Error detection", isCorrect: false },
        { text: "Quality of Service", isCorrect: true },
        { text: "Fragmentation", isCorrect: false },
        { text: "Addressing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "ToS specifies quality of service parameters like priority and delay requirements.",
    },
    {
      id: "cn_h24",
      question: "What is token bucket algorithm used for?",
      options: [
        { text: "Routing", isCorrect: false },
        { text: "Traffic shaping", isCorrect: true },
        { text: "Error correction", isCorrect: false },
        { text: "Addressing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "Token bucket controls data transmission rate and burst size for traffic shaping.",
    },
    {
      id: "cn_h25",
      question: "What is the purpose of sequence numbers in TCP?",
      options: [
        { text: "Encryption", isCorrect: false },
        { text: "Ordering and duplicate detection", isCorrect: true },
        { text: "Routing", isCorrect: false },
        { text: "Addressing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "Sequence numbers ensure correct ordering and detect duplicate segments.",
    },
    {
      id: "cn_h26",
      question: "What is RED (Random Early Detection)?",
      options: [
        { text: "Routing protocol", isCorrect: false },
        { text: "Congestion avoidance mechanism", isCorrect: true },
        { text: "Error detection", isCorrect: false },
        { text: "Encryption method", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "RED drops packets probabilistically before queue fills to avoid congestion.",
    },
    {
      id: "cn_h27",
      question: "What is hierarchical routing?",
      options: [
        { text: "Single level routing", isCorrect: false },
        { text: "Multi-level network organization", isCorrect: true },
        { text: "Random routing", isCorrect: false },
        { text: "Static routing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "Hierarchical routing divides network into regions/areas for scalability.",
    },
    {
      id: "cn_h28",
      question:
        "What is the purpose of explicit congestion notification (ECN)?",
      options: [
        { text: "Routing", isCorrect: false },
        { text: "Signal congestion without dropping packets", isCorrect: true },
        { text: "Error detection", isCorrect: false },
        { text: "Address resolution", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "ECN marks packets to signal congestion instead of dropping them.",
    },
    {
      id: "cn_h29",
      question: "What is the Maximum Burst Size (MBS) in token bucket?",
      options: [
        { text: "Average bandwidth", isCorrect: false },
        { text: "Maximum tokens accumulated", isCorrect: true },
        { text: "Minimum bandwidth", isCorrect: false },
        { text: "Queue length", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "MBS limits maximum tokens (bytes) that can accumulate in the bucket.",
    },
    {
      id: "cn_h30",
      question: "What is path MTU discovery?",
      options: [
        { text: "Finding shortest path", isCorrect: false },
        { text: "Finding smallest MTU along path", isCorrect: true },
        { text: "Load balancing", isCorrect: false },
        { text: "Error detection", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "Path MTU discovery finds the minimum MTU to avoid fragmentation.",
    },
    {
      id: "cn_h31",
      question:
        "What is the difference between persistent and non-persistent HTTP?",
      options: [
        { text: "Security level", isCorrect: false },
        { text: "Connection reuse", isCorrect: true },
        { text: "Speed only", isCorrect: false },
        { text: "Port numbers", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Application Layer",
      explanation:
        "Persistent HTTP reuses TCP connection; non-persistent creates new connection per request.",
    },
    {
      id: "cn_h32",
      question: "What is source quench in ICMP?",
      options: [
        { text: "Error message", isCorrect: false },
        { text: "Congestion control message", isCorrect: true },
        { text: "Routing update", isCorrect: false },
        { text: "Address resolution", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "Source quench tells sender to slow down due to congestion (deprecated in modern networks).",
    },
    {
      id: "cn_h33",
      question: "What is the purpose of SYN cookies?",
      options: [
        { text: "Encryption", isCorrect: false },
        { text: "SYN flood attack prevention", isCorrect: true },
        { text: "Routing", isCorrect: false },
        { text: "Load balancing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "SYN cookies prevent SYN flood DoS attacks without maintaining connection state.",
    },
    {
      id: "cn_h34",
      question: "What is multipath routing?",
      options: [
        { text: "Single path only", isCorrect: false },
        { text: "Multiple paths for load distribution", isCorrect: true },
        { text: "Backup routing", isCorrect: false },
        { text: "Random routing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Network Layer",
      explanation:
        "Multipath routing uses multiple paths simultaneously for better throughput and reliability.",
    },
    {
      id: "cn_h35",
      question: "What is the purpose of Nagle's algorithm?",
      options: [
        { text: "Error detection", isCorrect: false },
        { text: "Reduce small packet transmission", isCorrect: true },
        { text: "Routing optimization", isCorrect: false },
        { text: "Encryption", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Transport Layer",
      explanation:
        "Nagle's algorithm buffers small data until ACK or enough data accumulates for efficiency.",
    },
  ],
  OS: [
    {
      id: "os_e1",
      question: "What is an Operating System?",
      options: [
        {
          text: "Software that manages hardware and software resources",
          isCorrect: true,
        },
        { text: "A programming language", isCorrect: false },
        { text: "A type of application software", isCorrect: false },
        { text: "A hardware component", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Basics",
      explanation:
        "An OS is system software that manages computer hardware, software resources, and provides common services for programs.",
    },
    {
      id: "os_e2",
      question:
        "Which of the following is NOT a function of an Operating System?",
      options: [
        { text: "Memory Management", isCorrect: false },
        { text: "Process Management", isCorrect: false },
        { text: "Compiling Programs", isCorrect: true },
        { text: "File Management", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Basics",
      explanation:
        "Compiling programs is done by compilers, not the OS. The OS manages resources and processes.",
    },
    {
      id: "os_e3",
      question: "What does CPU stand for?",
      options: [
        { text: "Central Processing Unit", isCorrect: true },
        { text: "Computer Personal Unit", isCorrect: false },
        { text: "Central Program Utility", isCorrect: false },
        { text: "Control Processing Unit", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Basics",
      explanation:
        "CPU stands for Central Processing Unit, the main processor that executes instructions.",
    },
    {
      id: "os_e4",
      question:
        "Which scheduling algorithm allocates CPU to processes in the order they arrive?",
      options: [
        { text: "Round Robin", isCorrect: false },
        { text: "FCFS (First Come First Serve)", isCorrect: true },
        { text: "Priority Scheduling", isCorrect: false },
        { text: "Shortest Job First", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Process Scheduling",
      explanation:
        "FCFS is the simplest scheduling algorithm that processes requests in arrival order.",
    },
    {
      id: "os_e5",
      question: "What is a process?",
      options: [
        { text: "A program in execution", isCorrect: true },
        { text: "A stored program", isCorrect: false },
        { text: "A hardware component", isCorrect: false },
        { text: "A type of memory", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Processes",
      explanation:
        "A process is an instance of a program that is being executed, including its current state.",
    },
    {
      id: "os_e6",
      question:
        "Which memory management technique divides memory into fixed-sized partitions?",
      options: [
        { text: "Paging", isCorrect: true },
        { text: "Segmentation", isCorrect: false },
        { text: "Virtual Memory", isCorrect: false },
        { text: "Cache Memory", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Memory Management",
      explanation:
        "Paging divides physical memory into fixed-size blocks called pages or frames.",
    },
    {
      id: "os_e7",
      question: "What is the kernel?",
      options: [
        { text: "The core part of the operating system", isCorrect: true },
        { text: "A type of shell", isCorrect: false },
        { text: "An application program", isCorrect: false },
        { text: "A storage device", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Basics",
      explanation:
        "The kernel is the central component of an OS that has complete control over the system.",
    },
    {
      id: "os_e8",
      question: "Which of the following is a state of a process?",
      options: [
        { text: "Ready", isCorrect: true },
        { text: "Idle", isCorrect: false },
        { text: "Active", isCorrect: false },
        { text: "Paused", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Processes",
      explanation:
        "Process states include New, Ready, Running, Waiting, and Terminated.",
    },
    {
      id: "os_e9",
      question: "What does RAM stand for?",
      options: [
        { text: "Random Access Memory", isCorrect: true },
        { text: "Read Access Memory", isCorrect: false },
        { text: "Rapid Access Memory", isCorrect: false },
        { text: "Remote Access Memory", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Memory Management",
      explanation:
        "RAM is Random Access Memory, the main memory used by the CPU to store data temporarily.",
    },
    {
      id: "os_e10",
      question: "What is thrashing?",
      options: [
        { text: "Excessive paging activity", isCorrect: true },
        { text: "CPU overheating", isCorrect: false },
        { text: "Disk failure", isCorrect: false },
        { text: "Network congestion", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Memory Management",
      explanation:
        "Thrashing occurs when a system spends more time paging than executing processes.",
    },
    {
      id: "os_e11",
      question: "Which command is used to list files in Unix/Linux?",
      options: [
        { text: "dir", isCorrect: false },
        { text: "ls", isCorrect: true },
        { text: "list", isCorrect: false },
        { text: "show", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "File Systems",
      explanation:
        "The 'ls' command lists directory contents in Unix/Linux systems.",
    },
    {
      id: "os_e12",
      question: "What is a thread?",
      options: [
        { text: "A lightweight process within a process", isCorrect: true },
        { text: "A type of memory", isCorrect: false },
        { text: "A scheduling algorithm", isCorrect: false },
        { text: "A storage device", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Threads",
      explanation:
        "A thread is the smallest unit of execution within a process, sharing the process's resources.",
    },
    {
      id: "os_e13",
      question: "What does I/O stand for?",
      options: [
        { text: "Input/Output", isCorrect: true },
        { text: "Internal/Outernal", isCorrect: false },
        { text: "Integer/Object", isCorrect: false },
        { text: "Interface/Operation", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "I/O Management",
      explanation:
        "I/O stands for Input/Output, referring to communication between the system and external devices.",
    },
    {
      id: "os_e14",
      question: "Which of the following is a type of operating system?",
      options: [
        { text: "Batch Operating System", isCorrect: true },
        { text: "Compiler Operating System", isCorrect: false },
        { text: "Database Operating System", isCorrect: false },
        { text: "Graphics Operating System", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Basics",
      explanation:
        "Batch OS is one type that executes jobs in batches without user interaction.",
    },
    {
      id: "os_e15",
      question: "What is a system call?",
      options: [
        {
          text: "Interface between a process and the operating system",
          isCorrect: true,
        },
        { text: "A function call within a program", isCorrect: false },
        { text: "A hardware interrupt", isCorrect: false },
        { text: "A network request", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "System Calls",
      explanation:
        "System calls provide a way for programs to request services from the kernel.",
    },
    {
      id: "os_e16",
      question:
        "Which scheduling algorithm gives each process equal time quantum?",
      options: [
        { text: "FCFS", isCorrect: false },
        { text: "Round Robin", isCorrect: true },
        { text: "SJF", isCorrect: false },
        { text: "Priority", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Process Scheduling",
      explanation:
        "Round Robin assigns a fixed time quantum to each process in a circular manner.",
    },
    {
      id: "os_e17",
      question: "What is virtual memory?",
      options: [
        {
          text: "Memory management technique that uses disk as extension of RAM",
          isCorrect: true,
        },
        { text: "Physical RAM", isCorrect: false },
        { text: "Cache memory", isCorrect: false },
        { text: "ROM", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Memory Management",
      explanation:
        "Virtual memory allows execution of processes that may not be completely in physical memory.",
    },
    {
      id: "os_e18",
      question: "What is a mutex?",
      options: [
        {
          text: "Mutual exclusion object for synchronization",
          isCorrect: true,
        },
        { text: "A type of memory", isCorrect: false },
        { text: "A scheduling algorithm", isCorrect: false },
        { text: "A file system", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Synchronization",
      explanation:
        "A mutex is a synchronization primitive that prevents simultaneous access to a shared resource.",
    },
    {
      id: "os_e19",
      question: "Which of the following is volatile memory?",
      options: [
        { text: "Hard Disk", isCorrect: false },
        { text: "RAM", isCorrect: true },
        { text: "ROM", isCorrect: false },
        { text: "SSD", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Memory Management",
      explanation:
        "RAM is volatile memory that loses its contents when power is turned off.",
    },
    {
      id: "os_e20",
      question: "What is the shell in an operating system?",
      options: [
        { text: "Command-line interpreter", isCorrect: true },
        { text: "The kernel", isCorrect: false },
        { text: "A hardware component", isCorrect: false },
        { text: "A type of memory", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Basics",
      explanation:
        "The shell is a program that provides a command-line interface for users to interact with the OS.",
    },
    {
      id: "os_e21",
      question: "What is a file system?",
      options: [
        { text: "Method for storing and organizing files", isCorrect: true },
        { text: "A type of memory", isCorrect: false },
        { text: "A scheduling algorithm", isCorrect: false },
        { text: "A network protocol", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "File Systems",
      explanation:
        "A file system controls how data is stored and retrieved on storage devices.",
    },
    {
      id: "os_e22",
      question: "What does PCB stand for?",
      options: [
        { text: "Process Control Block", isCorrect: true },
        { text: "Program Control Block", isCorrect: false },
        { text: "Process Communication Block", isCorrect: false },
        { text: "Peripheral Control Block", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Processes",
      explanation:
        "PCB is a data structure containing information about a process in the OS.",
    },
    {
      id: "os_e23",
      question: "Which of the following is NOT a process scheduling algorithm?",
      options: [
        { text: "FCFS", isCorrect: false },
        { text: "Round Robin", isCorrect: false },
        { text: "Binary Search", isCorrect: true },
        { text: "Priority Scheduling", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Process Scheduling",
      explanation:
        "Binary Search is a searching algorithm, not a process scheduling algorithm.",
    },
    {
      id: "os_e24",
      question: "What is interrupt?",
      options: [
        {
          text: "Signal that temporarily stops current program execution",
          isCorrect: true,
        },
        { text: "A type of memory", isCorrect: false },
        { text: "A file operation", isCorrect: false },
        { text: "A network protocol", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Interrupts",
      explanation:
        "An interrupt is a signal to the processor indicating an event that needs immediate attention.",
    },
    {
      id: "os_e25",
      question: "What is multitasking?",
      options: [
        { text: "Running multiple processes concurrently", isCorrect: true },
        { text: "Running one process at a time", isCorrect: false },
        { text: "Running multiple operating systems", isCorrect: false },
        { text: "Running multiple computers", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Processes",
      explanation:
        "Multitasking allows multiple processes to share CPU time, appearing to run simultaneously.",
    },
    {
      id: "os_e26",
      question: "Which command creates a new directory in Unix/Linux?",
      options: [
        { text: "create", isCorrect: false },
        { text: "mkdir", isCorrect: true },
        { text: "newdir", isCorrect: false },
        { text: "makedir", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "File Systems",
      explanation:
        "The 'mkdir' command creates a new directory in Unix/Linux systems.",
    },
    {
      id: "os_e27",
      question: "What is deadlock?",
      options: [
        {
          text: "Situation where processes wait indefinitely for resources",
          isCorrect: true,
        },
        { text: "System shutdown", isCorrect: false },
        { text: "CPU failure", isCorrect: false },
        { text: "Memory overflow", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Deadlocks",
      explanation:
        "Deadlock occurs when processes are blocked waiting for resources held by other waiting processes.",
    },
    {
      id: "os_e28",
      question: "What is the boot process?",
      options: [
        { text: "Process of starting up a computer", isCorrect: true },
        { text: "Process of shutting down", isCorrect: false },
        { text: "Process of installing software", isCorrect: false },
        { text: "Process of networking", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Basics",
      explanation:
        "Booting is the process of loading the operating system into memory when the computer starts.",
    },
    {
      id: "os_e29",
      question: "What is a daemon in Unix/Linux?",
      options: [
        { text: "Background process", isCorrect: true },
        { text: "Foreground process", isCorrect: false },
        { text: "User interface", isCorrect: false },
        { text: "File system", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Processes",
      explanation:
        "A daemon is a background process that runs without direct user interaction.",
    },
    {
      id: "os_e30",
      question: "What is cache memory?",
      options: [
        { text: "Fast memory between CPU and RAM", isCorrect: true },
        { text: "Permanent storage", isCorrect: false },
        { text: "Virtual memory", isCorrect: false },
        { text: "Network memory", isCorrect: false },
      ],
      difficulty: "easy",
      topic: "Memory Management",
      explanation:
        "Cache is high-speed memory that stores frequently accessed data for faster retrieval.",
    },

    // ==================== MEDIUM QUESTIONS (35) ====================
    {
      id: "os_m1",
      question: "What is the main advantage of multi-threading?",
      options: [
        {
          text: "Better resource utilization and responsiveness",
          isCorrect: true,
        },
        { text: "More memory usage", isCorrect: false },
        { text: "Slower execution", isCorrect: false },
        { text: "Complex programming", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Threads",
      explanation:
        "Multi-threading improves resource utilization and system responsiveness through concurrent execution.",
    },
    {
      id: "os_m2",
      question:
        "Which page replacement algorithm has the lowest page fault rate?",
      options: [
        { text: "FIFO", isCorrect: false },
        { text: "Optimal", isCorrect: true },
        { text: "LRU", isCorrect: false },
        { text: "Random", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "Optimal algorithm replaces the page that won't be used for the longest time, giving lowest fault rate.",
    },
    {
      id: "os_m3",
      question: "What are the four necessary conditions for deadlock?",
      options: [
        {
          text: "Mutual exclusion, hold and wait, no preemption, circular wait",
          isCorrect: true,
        },
        {
          text: "Starvation, thrashing, fragmentation, swapping",
          isCorrect: false,
        },
        { text: "Paging, segmentation, caching, buffering", isCorrect: false },
        {
          text: "Concurrency, parallelism, synchronization, communication",
          isCorrect: false,
        },
      ],
      difficulty: "medium",
      topic: "Deadlocks",
      explanation:
        "These four conditions must hold simultaneously for deadlock to occur (Coffman conditions).",
    },
    {
      id: "os_m4",
      question:
        "What is the difference between internal and external fragmentation?",
      options: [
        {
          text: "Internal: wasted space within allocated memory; External: free space scattered",
          isCorrect: true,
        },
        {
          text: "Internal: disk fragmentation; External: memory fragmentation",
          isCorrect: false,
        },
        {
          text: "Internal: RAM issue; External: cache issue",
          isCorrect: false,
        },
        { text: "No difference", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "Internal fragmentation wastes space in allocated blocks; external wastes space between blocks.",
    },
    {
      id: "os_m5",
      question: "What is the purpose of TLB (Translation Lookaside Buffer)?",
      options: [
        { text: "Cache for page table entries", isCorrect: true },
        { text: "Main memory storage", isCorrect: false },
        { text: "Disk cache", isCorrect: false },
        { text: "Network buffer", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "TLB is a cache that stores recent virtual-to-physical address translations for faster access.",
    },
    {
      id: "os_m6",
      question: "Which scheduling algorithm can cause starvation?",
      options: [
        { text: "Round Robin", isCorrect: false },
        { text: "Priority Scheduling", isCorrect: true },
        { text: "FCFS", isCorrect: false },
        { text: "Multi-level Queue", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Process Scheduling",
      explanation:
        "Priority scheduling can cause low-priority processes to wait indefinitely (starvation).",
    },
    {
      id: "os_m7",
      question:
        "What is the difference between preemptive and non-preemptive scheduling?",
      options: [
        {
          text: "Preemptive can interrupt running process; Non-preemptive cannot",
          isCorrect: true,
        },
        {
          text: "Preemptive is slower; Non-preemptive is faster",
          isCorrect: false,
        },
        { text: "No difference", isCorrect: false },
        { text: "Preemptive uses more memory", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Process Scheduling",
      explanation:
        "Preemptive scheduling can forcibly remove CPU from a process; non-preemptive waits for completion.",
    },
    {
      id: "os_m8",
      question: "What is a semaphore?",
      options: [
        {
          text: "Synchronization tool with counter for resource access",
          isCorrect: true,
        },
        { text: "A type of memory", isCorrect: false },
        { text: "A file system", isCorrect: false },
        { text: "A network protocol", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Synchronization",
      explanation:
        "A semaphore is a synchronization primitive that uses a counter to control access to shared resources.",
    },
    {
      id: "os_m9",
      question: "What is the purpose of the fork() system call?",
      options: [
        { text: "Create a new process", isCorrect: true },
        { text: "Terminate a process", isCorrect: false },
        { text: "Create a thread", isCorrect: false },
        { text: "Allocate memory", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Processes",
      explanation:
        "fork() creates a new child process that is a copy of the parent process.",
    },
    {
      id: "os_m10",
      question: "What is the working set model?",
      options: [
        { text: "Set of pages actively used by a process", isCorrect: true },
        { text: "Set of all processes in memory", isCorrect: false },
        { text: "Set of CPU registers", isCorrect: false },
        { text: "Set of I/O devices", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "Working set is the set of pages referenced by a process during a time window.",
    },
    {
      id: "os_m11",
      question: "What is context switching?",
      options: [
        {
          text: "Saving and loading process state when switching between processes",
          isCorrect: true,
        },
        { text: "Switching between user and kernel mode", isCorrect: false },
        { text: "Switching between memory and disk", isCorrect: false },
        { text: "Switching network connections", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Processes",
      explanation:
        "Context switching involves saving the state of the current process and loading the next process's state.",
    },
    {
      id: "os_m12",
      question: "What is the difference between logical and physical address?",
      options: [
        {
          text: "Logical: generated by CPU; Physical: actual memory location",
          isCorrect: true,
        },
        { text: "Logical: on disk; Physical: in RAM", isCorrect: false },
        { text: "No difference", isCorrect: false },
        { text: "Logical: hardware; Physical: software", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "Logical addresses are virtual addresses generated by CPU; physical addresses are actual RAM locations.",
    },
    {
      id: "os_m13",
      question: "What is DMA (Direct Memory Access)?",
      options: [
        {
          text: "Hardware that allows I/O devices to access memory directly",
          isCorrect: true,
        },
        { text: "A type of RAM", isCorrect: false },
        { text: "A scheduling algorithm", isCorrect: false },
        { text: "A file system", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "I/O Management",
      explanation:
        "DMA allows devices to transfer data to/from memory without CPU intervention.",
    },
    {
      id: "os_m14",
      question: "What is the banker's algorithm used for?",
      options: [
        { text: "Deadlock avoidance", isCorrect: true },
        { text: "Memory allocation", isCorrect: false },
        { text: "CPU scheduling", isCorrect: false },
        { text: "Disk scheduling", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Deadlocks",
      explanation:
        "Banker's algorithm checks if resource allocation will lead to a safe state, avoiding deadlock.",
    },
    {
      id: "os_m15",
      question: "What is spooling?",
      options: [
        { text: "Simultaneous Peripheral Operations On-Line", isCorrect: true },
        { text: "A type of memory management", isCorrect: false },
        { text: "A scheduling algorithm", isCorrect: false },
        { text: "A network protocol", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "I/O Management",
      explanation:
        "Spooling overlaps I/O of one job with computation of other jobs, often used for printing.",
    },
    {
      id: "os_m16",
      question: "What is the difference between user mode and kernel mode?",
      options: [
        {
          text: "Kernel mode has full hardware access; User mode is restricted",
          isCorrect: true,
        },
        { text: "User mode is faster than kernel mode", isCorrect: false },
        { text: "No difference", isCorrect: false },
        { text: "User mode uses more memory", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Basics",
      explanation:
        "Kernel mode has unrestricted access to hardware; user mode has limited access for safety.",
    },
    {
      id: "os_m17",
      question: "What is the purpose of the exec() system call?",
      options: [
        { text: "Replace process memory with new program", isCorrect: true },
        { text: "Create a new process", isCorrect: false },
        { text: "Terminate a process", isCorrect: false },
        { text: "Allocate memory", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Processes",
      explanation:
        "exec() loads a new program into the current process's memory space.",
    },
    {
      id: "os_m18",
      question: "What is a race condition?",
      options: [
        {
          text: "Multiple processes access shared data concurrently causing incorrect results",
          isCorrect: true,
        },
        { text: "CPU running too fast", isCorrect: false },
        { text: "Network congestion", isCorrect: false },
        { text: "Disk failure", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Synchronization",
      explanation:
        "Race condition occurs when outcome depends on the sequence of uncontrollable events.",
    },
    {
      id: "os_m19",
      question: "What is aging in process scheduling?",
      options: [
        {
          text: "Gradually increasing priority to prevent starvation",
          isCorrect: true,
        },
        { text: "Terminating old processes", isCorrect: false },
        { text: "Moving processes to disk", isCorrect: false },
        { text: "Decreasing process priority", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Process Scheduling",
      explanation:
        "Aging incrementally increases the priority of waiting processes to ensure they eventually execute.",
    },
    {
      id: "os_m20",
      question: "What is the difference between paging and segmentation?",
      options: [
        {
          text: "Paging uses fixed-size blocks; Segmentation uses variable-size logical units",
          isCorrect: true,
        },
        { text: "No difference", isCorrect: false },
        { text: "Paging is slower", isCorrect: false },
        { text: "Segmentation uses more memory", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "Paging divides memory into fixed-size pages; segmentation divides into variable-size logical segments.",
    },
    {
      id: "os_m21",
      question: "What is a zombie process?",
      options: [
        {
          text: "Terminated process whose entry remains in process table",
          isCorrect: true,
        },
        { text: "Sleeping process", isCorrect: false },
        { text: "Blocked process", isCorrect: false },
        { text: "Running process", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Processes",
      explanation:
        "A zombie process has completed execution but still has an entry in the process table.",
    },
    {
      id: "os_m22",
      question: "What is demand paging?",
      options: [
        { text: "Loading pages only when needed", isCorrect: true },
        { text: "Loading all pages at start", isCorrect: false },
        { text: "Deleting unused pages", isCorrect: false },
        { text: "Compressing pages", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "Demand paging loads pages into memory only when they are accessed, not at program start.",
    },
    {
      id: "os_m23",
      question: "What is the critical section problem?",
      options: [
        {
          text: "Ensuring mutual exclusion when accessing shared resources",
          isCorrect: true,
        },
        { text: "Memory allocation problem", isCorrect: false },
        { text: "CPU scheduling problem", isCorrect: false },
        { text: "Disk management problem", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Synchronization",
      explanation:
        "Critical section problem involves coordinating access to shared resources among concurrent processes.",
    },
    {
      id: "os_m24",
      question: "What is copy-on-write?",
      options: [
        {
          text: "Technique where page is copied only when modified",
          isCorrect: true,
        },
        { text: "Copying all data immediately", isCorrect: false },
        { text: "Writing to disk", isCorrect: false },
        { text: "Network data transfer", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "Copy-on-write delays copying memory pages until one of the processes attempts to modify it.",
    },
    {
      id: "os_m25",
      question: "What is the purpose of buffering in I/O?",
      options: [
        { text: "Temporary storage to handle speed mismatch", isCorrect: true },
        { text: "Permanent storage", isCorrect: false },
        { text: "CPU cache", isCorrect: false },
        { text: "Network routing", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "I/O Management",
      explanation:
        "Buffers temporarily store data to compensate for speed differences between devices.",
    },
    {
      id: "os_m26",
      question: "What is the convoy effect?",
      options: [
        {
          text: "Multiple processes wait for one slow process in FCFS",
          isCorrect: true,
        },
        { text: "Network congestion", isCorrect: false },
        { text: "Memory overflow", isCorrect: false },
        { text: "Disk failure", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Process Scheduling",
      explanation:
        "Convoy effect occurs when short processes wait for a long process to release CPU in FCFS.",
    },
    {
      id: "os_m27",
      question: "What is swapping?",
      options: [
        {
          text: "Moving process between main memory and disk",
          isCorrect: true,
        },
        { text: "Switching between processes", isCorrect: false },
        { text: "Exchanging data between CPU registers", isCorrect: false },
        { text: "Network packet switching", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "Swapping moves entire processes between RAM and disk to free up memory.",
    },
    {
      id: "os_m28",
      question: "What is the purpose of the wait() system call?",
      options: [
        {
          text: "Parent waits for child process to terminate",
          isCorrect: true,
        },
        { text: "Process waits for I/O", isCorrect: false },
        { text: "Delay execution", isCorrect: false },
        { text: "Wait for semaphore", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Processes",
      explanation:
        "wait() allows parent process to wait for child process completion and collect exit status.",
    },
    {
      id: "os_m29",
      question: "What is an inode in Unix/Linux?",
      options: [
        { text: "Data structure storing file metadata", isCorrect: true },
        { text: "File content", isCorrect: false },
        { text: "Directory name", isCorrect: false },
        { text: "Network address", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "File Systems",
      explanation:
        "An inode contains metadata about a file including permissions, ownership, and pointers to data blocks.",
    },
    {
      id: "os_m30",
      question: "What is the difference between hard link and soft link?",
      options: [
        {
          text: "Hard link points to inode; Soft link points to filename",
          isCorrect: true,
        },
        { text: "No difference", isCorrect: false },
        { text: "Hard link is slower", isCorrect: false },
        { text: "Soft link uses more space", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "File Systems",
      explanation:
        "Hard links directly reference inodes; symbolic links reference file paths.",
    },
    {
      id: "os_m31",
      question: "What is a monolithic kernel?",
      options: [
        { text: "All OS services run in kernel space", isCorrect: true },
        {
          text: "Minimal kernel with services in user space",
          isCorrect: false,
        },
        { text: "Distributed kernel", isCorrect: false },
        { text: "Network kernel", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Basics",
      explanation:
        "Monolithic kernels run all OS services in kernel mode for efficiency.",
    },
    {
      id: "os_m32",
      question: "What is a microkernel?",
      options: [
        { text: "Minimal kernel with services in user space", isCorrect: true },
        { text: "All services in kernel space", isCorrect: false },
        { text: "Small operating system", isCorrect: false },
        { text: "Embedded system kernel", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Basics",
      explanation:
        "Microkernels keep only essential services in kernel mode, moving others to user space.",
    },
    {
      id: "os_m33",
      question: "What is thrashing caused by?",
      options: [
        {
          text: "Too many processes competing for limited memory",
          isCorrect: true,
        },
        { text: "CPU overload", isCorrect: false },
        { text: "Network congestion", isCorrect: false },
        { text: "Disk fragmentation", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Memory Management",
      explanation:
        "Thrashing occurs when system spends more time paging than executing due to insufficient memory.",
    },
    {
      id: "os_m34",
      question: "What is the difference between binary and counting semaphore?",
      options: [
        {
          text: "Binary: 0 or 1; Counting: any non-negative integer",
          isCorrect: true,
        },
        { text: "No difference", isCorrect: false },
        { text: "Binary is faster", isCorrect: false },
        { text: "Counting uses more memory", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Synchronization",
      explanation:
        "Binary semaphores have values 0 or 1; counting semaphores can have any non-negative value.",
    },
    {
      id: "os_m35",
      question: "What is RAID?",
      options: [
        { text: "Redundant Array of Independent Disks", isCorrect: true },
        { text: "Random Access Integrated Device", isCorrect: false },
        { text: "Rapid Array Input Device", isCorrect: false },
        { text: "Remote Access Internet Drive", isCorrect: false },
      ],
      difficulty: "medium",
      topic: "Storage",
      explanation:
        "RAID combines multiple disks for redundancy, performance, or both.",
    },

    // ==================== HARD QUESTIONS (35) ====================
    {
      id: "os_h1",
      question: "What is the time complexity of the Banker's algorithm?",
      options: [
        { text: "O(m * n^2)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(m * n)", isCorrect: false },
        { text: "O(n^2)", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Deadlocks",
      explanation:
        "Banker's algorithm has O(m*n^2) complexity where m is resources and n is processes.",
    },
    {
      id: "os_h2",
      question: "What is the inverted page table?",
      options: [
        {
          text: "One entry per physical frame instead of per page",
          isCorrect: true,
        },
        { text: "Reversed page numbering", isCorrect: false },
        { text: "Upside-down table structure", isCorrect: false },
        { text: "Backup page table", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Memory Management",
      explanation:
        "Inverted page table has one entry per physical frame, reducing table size for large address spaces.",
    },
    {
      id: "os_h3",
      question: "What is the two-phase locking protocol?",
      options: [
        {
          text: "Growing phase acquires locks; Shrinking phase releases locks",
          isCorrect: true,
        },
        { text: "Two separate locking mechanisms", isCorrect: false },
        { text: "Locking twice for security", isCorrect: false },
        { text: "Two-step authentication", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Synchronization",
      explanation:
        "Two-phase locking ensures serializability by separating lock acquisition and release phases.",
    },
    {
      id: "os_h4",
      question: "What is the dining philosophers problem?",
      options: [
        {
          text: "Classic synchronization problem illustrating deadlock",
          isCorrect: true,
        },
        { text: "Resource allocation problem", isCorrect: false },
        { text: "Scheduling problem", isCorrect: false },
        { text: "Memory management problem", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Synchronization",
      explanation:
        "Dining philosophers demonstrates synchronization challenges and potential deadlock scenarios.",
    },
    {
      id: "os_h5",
      question: "What is the purpose of the monitor in concurrent programming?",
      options: [
        {
          text: "High-level synchronization construct encapsulating shared data",
          isCorrect: true,
        },
        { text: "System monitoring tool", isCorrect: false },
        { text: "Performance measurement", isCorrect: false },
        { text: "Display device", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Synchronization",
      explanation:
        "Monitors provide mutual exclusion and condition synchronization in a structured way.",
    },
    {
      id: "os_h6",
      question: "What is the readers-writers problem?",
      options: [
        {
          text: "Multiple readers or one writer can access shared data",
          isCorrect: true,
        },
        { text: "File I/O optimization", isCorrect: false },
        { text: "Network communication issue", isCorrect: false },
        { text: "Disk scheduling problem", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Synchronization",
      explanation:
        "Readers-writers addresses synchronization where multiple readers or single writer access data.",
    },
    {
      id: "os_h7",
      question: "What is the scan disk scheduling algorithm?",
      options: [
        { text: "Arm moves back and forth serving requests", isCorrect: true },
        { text: "Random access pattern", isCorrect: false },
        { text: "First-come first-serve for disk", isCorrect: false },
        { text: "Shortest seek time first", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "I/O Management",
      explanation:
        "SCAN (elevator algorithm) services requests while moving in one direction, then reverses.",
    },
    {
      id: "os_h8",
      question: "What is Belady's anomaly?",
      options: [
        {
          text: "More frames can lead to more page faults in FIFO",
          isCorrect: true,
        },
        { text: "Memory leak", isCorrect: false },
        { text: "CPU scheduling anomaly", isCorrect: false },
        { text: "Disk fragmentation issue", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Memory Management",
      explanation:
        "Belady's anomaly shows FIFO can have more page faults with increased frame allocation.",
    },
    {
      id: "os_h9",
      question: "What is the multilevel feedback queue?",
      options: [
        {
          text: "Processes move between queues based on behavior",
          isCorrect: true,
        },
        { text: "Single queue with priorities", isCorrect: false },
        { text: "Multiple CPUs with queues", isCorrect: false },
        { text: "Network packet queuing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Process Scheduling",
      explanation:
        "MLFQ allows processes to move between queues based on execution history and characteristics.",
    },
    {
      id: "os_h10",
      question: "What is the Byzantine Generals Problem?",
      options: [
        {
          text: "Achieving consensus with faulty or malicious components",
          isCorrect: true,
        },
        { text: "Military strategy planning", isCorrect: false },
        { text: "Network routing problem", isCorrect: false },
        { text: "Encryption algorithm", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Distributed Systems",
      explanation:
        "Byzantine Generals addresses consensus in distributed systems with unreliable participants.",
    },
    {
      id: "os_h11",
      question: "What is write-ahead logging?",
      options: [
        {
          text: "Log changes before applying them to ensure recoverability",
          isCorrect: true,
        },
        { text: "Writing logs after operations", isCorrect: false },
        { text: "Predictive writing", isCorrect: false },
        { text: "Advanced file writing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "File Systems",
      explanation:
        "WAL ensures transaction durability by logging changes before modifying actual data.",
    },
    {
      id: "os_h12",
      question: "What is the CAP theorem?",
      options: [
        {
          text: "Can't have Consistency, Availability, and Partition tolerance simultaneously",
          isCorrect: true,
        },
        { text: "CPU, Access, Performance trade-off", isCorrect: false },
        { text: "Cache, API, Protocol design", isCorrect: false },
        { text: "Computing power limits", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Distributed Systems",
      explanation:
        "CAP theorem states distributed systems can only guarantee two of three: Consistency, Availability, Partition tolerance.",
    },
    {
      id: "os_h13",
      question: "What is the purpose of shadow paging?",
      options: [
        {
          text: "Maintain two page tables for atomic updates",
          isCorrect: true,
        },
        { text: "Backup page storage", isCorrect: false },
        { text: "Hidden memory pages", isCorrect: false },
        { text: "Dark mode for pages", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "File Systems",
      explanation:
        "Shadow paging uses two page tables to ensure atomic updates and crash recovery.",
    },
    {
      id: "os_h14",
      question: "What is the clock page replacement algorithm?",
      options: [
        {
          text: "Approximation of LRU using circular list with reference bits",
          isCorrect: true,
        },
        { text: "Time-based replacement", isCorrect: false },
        { text: "Scheduled page replacement", isCorrect: false },
        { text: "Real-time algorithm", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Memory Management",
      explanation:
        "Clock algorithm (second chance) approximates LRU with lower overhead using reference bits.",
    },
    {
      id: "os_h15",
      question: "What is a journaling file system?",
      options: [
        {
          text: "Logs changes before committing to maintain consistency",
          isCorrect: true,
        },
        { text: "Keeps diary of operations", isCorrect: false },
        { text: "Newspaper-style file organization", isCorrect: false },
        { text: "Sequential file writing", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "File Systems",
      explanation:
        "Journaling file systems log metadata changes to recover from crashes quickly.",
    },
    {
      id: "os_h16",
      question: "What is priority inversion?",
      options: [
        {
          text: "Low priority process holds resource needed by high priority process",
          isCorrect: true,
        },
        { text: "Reversing process priorities", isCorrect: false },
        { text: "Inverted scheduling order", isCorrect: false },
        { text: "Priority queue corruption", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Synchronization",
      explanation:
        "Priority inversion occurs when high-priority process waits for low-priority process holding a resource.",
    },
    {
      id: "os_h17",
      question: "What is the working set clock algorithm?",
      options: [
        {
          text: "Combines working set model with clock algorithm",
          isCorrect: true,
        },
        { text: "Time-based working set", isCorrect: false },
        { text: "Clock for process execution", isCorrect: false },
        { text: "Scheduled memory management", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Memory Management",
      explanation:
        "WSClock combines working set and clock algorithms for efficient page replacement.",
    },
    {
      id: "os_h18",
      question:
        "What is the difference between symmetric and asymmetric multiprocessing?",
      options: [
        {
          text: "Symmetric: all CPUs equal; Asymmetric: master-slave relationship",
          isCorrect: true,
        },
        { text: "No difference", isCorrect: false },
        { text: "Symmetric is faster", isCorrect: false },
        { text: "Asymmetric uses more power", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Multiprocessing",
      explanation:
        "SMP treats all processors equally; AMP has a master processor controlling slave processors.",
    },
    {
      id: "os_h19",
      question: "What is NUMA (Non-Uniform Memory Access)?",
      options: [
        {
          text: "Memory access time depends on memory location relative to processor",
          isCorrect: true,
        },
        { text: "Random memory access", isCorrect: false },
        { text: "Non-allocated memory", isCorrect: false },
        { text: "Network memory access", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Memory Management",
      explanation:
        "NUMA architecture has different memory access times depending on processor-memory proximity.",
    },
    {
      id: "os_h20",
      question: "What is the Peterson's solution?",
      options: [
        {
          text: "Software solution for two-process critical section problem",
          isCorrect: true,
        },
        { text: "Hardware-based synchronization", isCorrect: false },
        { text: "Deadlock prevention algorithm", isCorrect: false },
        { text: "Scheduling algorithm", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Synchronization",
      explanation:
        "Peterson's solution provides mutual exclusion for two processes using software alone.",
    },
    {
      id: "os_h21",
      question: "What is the C-SCAN disk scheduling algorithm?",
      options: [
        {
          text: "Circular SCAN that returns to start without servicing",
          isCorrect: true,
        },
        { text: "Continuous scanning", isCorrect: false },
        { text: "C programming scan", isCorrect: false },
        { text: "Cache scanning", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "I/O Management",
      explanation:
        "C-SCAN services requests in one direction, then jumps back to start without servicing return.",
    },
    {
      id: "os_h22",
      question: "What is a reentrant kernel?",
      options: [
        {
          text: "Allows multiple processes to execute kernel code simultaneously",
          isCorrect: true,
        },
        { text: "Kernel that can restart", isCorrect: false },
        { text: "Recursive kernel", isCorrect: false },
        { text: "Kernel with entry points", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Basics",
      explanation:
        "Reentrant kernels allow multiple processes to be in kernel mode simultaneously on multiprocessor systems.",
    },
    {
      id: "os_h23",
      question: "What is the purpose of the Lamport's timestamp?",
      options: [
        {
          text: "Logical clock for ordering events in distributed systems",
          isCorrect: true,
        },
        { text: "Physical clock synchronization", isCorrect: false },
        { text: "File timestamp", isCorrect: false },
        { text: "Process execution time", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Distributed Systems",
      explanation:
        "Lamport timestamps establish causal ordering of events in distributed systems without synchronized clocks.",
    },
    {
      id: "os_h24",
      question: "What is the RCU (Read-Copy-Update) synchronization?",
      options: [
        {
          text: "Lock-free synchronization for read-heavy workloads",
          isCorrect: true,
        },
        { text: "Remote copy update", isCorrect: false },
        { text: "Recursive copy utility", isCorrect: false },
        { text: "Redundant cache update", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Synchronization",
      explanation:
        "RCU allows lock-free reads while writers create copies, updating pointers atomically.",
    },
    {
      id: "os_h25",
      question: "What is memory-mapped I/O?",
      options: [
        {
          text: "Device registers mapped to memory address space",
          isCorrect: true,
        },
        { text: "Mapping files to memory", isCorrect: false },
        { text: "Virtual memory technique", isCorrect: false },
        { text: "I/O buffering method", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "I/O Management",
      explanation:
        "Memory-mapped I/O uses memory addresses to access device registers instead of separate I/O instructions.",
    },
    {
      id: "os_h26",
      question:
        "What is the difference between preemptive and cooperative multitasking?",
      options: [
        {
          text: "Preemptive: OS controls switches; Cooperative: processes yield voluntarily",
          isCorrect: true,
        },
        { text: "No difference", isCorrect: false },
        { text: "Preemptive is older", isCorrect: false },
        { text: "Cooperative is faster", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Process Scheduling",
      explanation:
        "Preemptive multitasking forcibly switches processes; cooperative relies on processes yielding control.",
    },
    {
      id: "os_h27",
      question: "What is the Ostrich algorithm?",
      options: [
        { text: "Ignore deadlock problem assuming it's rare", isCorrect: true },
        { text: "Deadlock detection algorithm", isCorrect: false },
        { text: "Fast scheduling algorithm", isCorrect: false },
        { text: "Memory management technique", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Deadlocks",
      explanation:
        "Ostrich algorithm ignores deadlock issues, assuming they occur rarely enough to not justify prevention costs.",
    },
    {
      id: "os_h28",
      question: "What is a spinlock?",
      options: [
        { text: "Lock that busy-waits in a loop", isCorrect: true },
        { text: "Rotating lock mechanism", isCorrect: false },
        { text: "Lock that spins data", isCorrect: false },
        { text: "Fast mutex", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Synchronization",
      explanation:
        "Spinlocks repeatedly check lock availability in a loop, useful for short critical sections.",
    },
    {
      id: "os_h29",
      question: "What is the purpose of the dirty bit in paging?",
      options: [
        { text: "Indicates if page has been modified", isCorrect: true },
        { text: "Marks corrupted pages", isCorrect: false },
        { text: "Tracks page age", isCorrect: false },
        { text: "Identifies invalid pages", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Memory Management",
      explanation:
        "Dirty bit indicates whether a page has been modified and needs to be written back to disk.",
    },
    {
      id: "os_h30",
      question: "What is the convoy effect in disk scheduling?",
      options: [
        { text: "Long requests delay short requests", isCorrect: true },
        { text: "Multiple disk failures", isCorrect: false },
        { text: "Disk traffic congestion", isCorrect: false },
        { text: "Sequential disk access", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "I/O Management",
      explanation:
        "Convoy effect in disk scheduling occurs when long I/O requests delay many short requests.",
    },
    {
      id: "os_h31",
      question:
        "What is the difference between hard and soft real-time systems?",
      options: [
        {
          text: "Hard: must meet deadlines; Soft: deadlines are desirable but not mandatory",
          isCorrect: true,
        },
        {
          text: "Hard: difficult to program; Soft: easy to program",
          isCorrect: false,
        },
        { text: "No difference", isCorrect: false },
        {
          text: "Hard: hardware-based; Soft: software-based",
          isCorrect: false,
        },
      ],
      difficulty: "hard",
      topic: "Real-Time Systems",
      explanation:
        "Hard real-time must meet timing constraints; soft real-time prefers but doesn't require meeting deadlines.",
    },
    {
      id: "os_h32",
      question: "What is the ARC (Adaptive Replacement Cache) algorithm?",
      options: [
        {
          text: "Balances recency and frequency for cache replacement",
          isCorrect: true,
        },
        { text: "Archive caching", isCorrect: false },
        { text: "Automatic resource control", isCorrect: false },
        { text: "Advanced RAID caching", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Memory Management",
      explanation:
        "ARC dynamically balances between LRU and LFU strategies for optimal cache performance.",
    },
    {
      id: "os_h33",
      question: "What is the purpose of the TLB shootdown?",
      options: [
        {
          text: "Invalidate TLB entries across multiple CPUs",
          isCorrect: true,
        },
        { text: "Disable TLB", isCorrect: false },
        { text: "Clear entire TLB", isCorrect: false },
        { text: "TLB debugging", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Memory Management",
      explanation:
        "TLB shootdown synchronizes TLB invalidation across multiple processors in multiprocessor systems.",
    },
    {
      id: "os_h34",
      question: "What is the test-and-set instruction?",
      options: [
        {
          text: "Atomic instruction that reads and sets a value",
          isCorrect: true,
        },
        { text: "Testing software instruction", isCorrect: false },
        { text: "Conditional assignment", isCorrect: false },
        { text: "Validation instruction", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Synchronization",
      explanation:
        "Test-and-set atomically reads a value and sets it to 1, used for implementing locks.",
    },
    {
      id: "os_h35",
      question: "What is the Completely Fair Scheduler (CFS)?",
      options: [
        {
          text: "Linux scheduler that aims for ideal multitasking CPU fairness",
          isCorrect: true,
        },
        { text: "Round-robin scheduler", isCorrect: false },
        { text: "Priority-based scheduler", isCorrect: false },
        { text: "Real-time scheduler", isCorrect: false },
      ],
      difficulty: "hard",
      topic: "Process Scheduling",
      explanation:
        "CFS uses red-black tree to schedule processes based on virtual runtime for fair CPU distribution.",
    },
  ],
};

module.exports = QUESTION_BANK;
