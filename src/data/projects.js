// src/data/projects.js
// All project data — edit here, UI updates automatically

export const SNIPPET_DS_ENGINE = [
  { parts: [{ text: 'template ', cls: 'text-purple-400' }, { text: '<typename ', cls: 'text-blue-400' }, { text: 'T>', cls: 'text-zinc-300' }] },
  { parts: [{ text: 'class ', cls: 'text-purple-400' }, { text: 'VectorCore ', cls: 'text-yellow-300' }, { text: '{', cls: 'text-zinc-300' }] },
  { parts: [{ text: '    T* ', cls: 'text-blue-400' }, { text: 'buffer{', cls: 'text-zinc-300' }, { text: 'nullptr', cls: 'text-blue-400' }, { text: '};', cls: 'text-zinc-300' }] },
  { parts: [{ text: '    size_t ', cls: 'text-blue-400' }, { text: 'cap{', cls: 'text-zinc-300' }, { text: '0', cls: 'text-emerald-400' }, { text: '}, len{', cls: 'text-zinc-300' }, { text: '0', cls: 'text-emerald-400' }, { text: '};', cls: 'text-zinc-300' }] },
  { parts: [{ text: 'public:', cls: 'text-purple-400' }] },
  { parts: [{ text: '    void ', cls: 'text-purple-400' }, { text: 'push_back', cls: 'text-yellow-300' }, { text: '(', cls: 'text-zinc-300' }, { text: 'const', cls: 'text-purple-400' }, { text: ' T& val) {', cls: 'text-zinc-300' }] },
  { parts: [{ text: '        if ', cls: 'text-purple-400' }, { text: '(len == cap) ', cls: 'text-zinc-300' }, { text: 'reserve', cls: 'text-yellow-300' }, { text: '(cap == ', cls: 'text-zinc-300' }, { text: '0', cls: 'text-emerald-400' }, { text: ' ? ', cls: 'text-zinc-300' }, { text: '2', cls: 'text-emerald-400' }, { text: ' : cap * ', cls: 'text-zinc-300' }, { text: '2', cls: 'text-emerald-400' }, { text: ');', cls: 'text-zinc-300' }] },
  { parts: [{ text: '        buffer[len++] = val;', cls: 'text-zinc-300' }] },
  { parts: [{ text: '    }', cls: 'text-zinc-300' }] },
  { parts: [{ text: '};', cls: 'text-zinc-300' }] },
]

export const SNIPPET_PIPELINE = [
  { parts: [{ text: 'import ', cls: 'text-purple-400' }, { text: 'json', cls: 'text-zinc-300' }] },
  { parts: [{ text: 'from ', cls: 'text-purple-400' }, { text: 'pathlib ', cls: 'text-zinc-300' }, { text: 'import ', cls: 'text-purple-400' }, { text: 'Path', cls: 'text-zinc-300' }] },
  { parts: [{ text: '', cls: '' }] },
  { parts: [{ text: 'def ', cls: 'text-purple-400' }, { text: 'parse_dataset', cls: 'text-yellow-300' }, { text: '(batch_path: ', cls: 'text-zinc-300' }, { text: 'Path', cls: 'text-blue-400' }, { text: '):', cls: 'text-zinc-300' }] },
  { parts: [{ text: '    records = []', cls: 'text-zinc-300' }] },
  { parts: [{ text: '    for ', cls: 'text-purple-400' }, { text: 'file ', cls: 'text-zinc-300' }, { text: 'in ', cls: 'text-purple-400' }, { text: 'batch_path.', cls: 'text-zinc-300' }, { text: 'glob', cls: 'text-yellow-300' }, { text: '(', cls: 'text-zinc-300' }, { text: '"*.json"', cls: 'text-emerald-400' }, { text: '):', cls: 'text-zinc-300' }] },
  { parts: [{ text: '        with ', cls: 'text-purple-400' }, { text: 'open', cls: 'text-yellow-300' }, { text: '(', cls: 'text-zinc-300' }, { text: 'file, ', cls: 'text-zinc-300' }, { text: '"r"', cls: 'text-emerald-400' }, { text: ') ', cls: 'text-zinc-300' }, { text: 'as ', cls: 'text-purple-400' }, { text: 'f:', cls: 'text-zinc-300' }] },
  { parts: [{ text: '            records.', cls: 'text-zinc-300' }, { text: 'extend', cls: 'text-yellow-300' }, { text: '(', cls: 'text-zinc-300' }, { text: 'json.', cls: 'text-zinc-300' }, { text: 'load', cls: 'text-yellow-300' }, { text: '(f))', cls: 'text-zinc-300' }] },
  { parts: [{ text: '    return ', cls: 'text-purple-400' }, { text: '{', cls: 'text-zinc-300' }, { text: '"total_records"', cls: 'text-emerald-400' }, { text: ': ', cls: 'text-zinc-300' }, { text: 'len', cls: 'text-yellow-300' }, { text: '(records), ', cls: 'text-zinc-300' }, { text: '"status"', cls: 'text-emerald-400' }, { text: ': ', cls: 'text-zinc-300' }, { text: '"validated"', cls: 'text-emerald-400' }, { text: '}', cls: 'text-zinc-300' }] }
]

export const PROJECTS = [
  {
    id: "algorithmic-ds-engine",
    title: "C++ Algorithmic Engine & Custom Data Structures",
    description: "Implemented foundational linear and non-linear data structures (Dynamic Vector, Binary Heap, Disjoint Sets) from first principles in modern C++. Focused on manual pointer manipulation, memory allocation mechanics, and asymptotic time complexity.",
    tags: ["C++20", "DSA", "Algorithms", "STL"],
    metric: "O(1) amortized insertions",
    snippet: SNIPPET_DS_ENGINE,
    github: "https://github.com/masumali007",
    docs: "https://github.com/masumali007",
    architecture: {
      diagram: 'VectorCore → Manual T* buffer → capacity/length tracking → amortized O(1) growth',
      metrics: ['Zero dependencies (raw arrays)', 'O(1) amortized push_back', 'Strict type safety via Templates']
    }
  },
  {
    id: "automated-data-pipeline",
    title: "Automated Structured Data Processing Pipeline",
    description: "Built a lightweight automation utility in Python to parse, sanitize, and validate structured JSON/CSV datasets. Implemented file stream error-handling, batch processing, and POSIX shell automation workflows.",
    tags: ["Python", "Automation", "CLI", "POSIX Shell"],
    metric: "Automated Batch Ingestion",
    snippet: SNIPPET_PIPELINE,
    github: "https://github.com/masumali007",
    docs: "https://github.com/masumali007",
    architecture: {
      diagram: 'POSIX Shell cron → Batch globbing (*.json) → Python JSON parsing → Validation logic',
      metrics: ['Memory-efficient iteration', 'Robust error-handling', '100% automated ingestion']
    }
  }
];
