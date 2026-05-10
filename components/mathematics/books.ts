export type Animation = {
  title: string; // e.g. "Exercise 4"
  url: string;   // GitHub video URL
};

export type Section = {
  title: string;        // e.g. "Section 8.3: Convolution"
  animations: Animation[];
};

export type Chapter = {
  title: string;
  pdfUrl: string;       // paste GitHub PDF URL here
  sections?: Section[]; // animations grouped by section (optional)
};

export type Textbook = {
  slug: string;
  title: string;
  author: string;
  coverDescription: string;
  description: string;
  fullSolutionsPdfUrl: string;
  chapters: Chapter[];
};

export const textbooks: Textbook[] = [
  {
    slug: 'strang-differential-equations-linear-algebra',
    title: 'Differential Equations and Linear Algebra',
    author: 'Gilbert Strang',
    coverDescription: 'Full solutions and visualizations for Gilbert Strang\'s Differential Equations and Linear Algebra.',
    description: 'Full solutions and visualizations for Gilbert Strang\'s Differential Equations and Linear Algebra.',
    fullSolutionsPdfUrl: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/deqlafull/build/deqlafull.pdf',
    chapters: [
      {
        title: 'Chapter 1: First Order Equations',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/deqlachap1/build/deqlachap1.pdf',
      },
      {
        title: 'Chapter 2: Second Order Equations',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/deqlachap2/build/deqlachap2.pdf',
      },
      {
        title: 'Chapter 8: Fourier and Laplace Transforms',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/deqlachap8/build/deqlachap8.pdf',
        sections: [
          {
            title: 'Section 8.3 Animations of the Heat Equation',
            animations: [
              { title: 'Exercise 4', url: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/chap8/sec8.3/chap8sec8.3ex4.mp4' },
              { title: 'Exercise 5', url: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/chap8/sec8.3/chap8sec8.3ex5.mp4' },
              { title: 'Exercise 6', url: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/chap8/sec8.3/chap8sec8.3ex6.mp4' }
            ],
          },
          {
            title: 'Section 8.4 Animations of the Wave Equation',
            animations: [
              { title: 'Exercise 12', url: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/chap8/sec8.4/chap8sec8.4ex12.mp4' },
              { title: 'Exercise 13', url: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/chap8/sec8.4/chap8sec8.4ex13.mp4' },
              { title: 'Exercise 14', url: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/chap8/sec8.4/chap8sec8.4ex14.mp4' },
              { title: 'Exercise 16', url: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/chap8/sec8.4/chap8sec8.4ex16.mp4' }
            ]
          }
          // Add more sections like this:
          // {
          //   title: 'Section 8.4',
          //   animations: [
          //     { title: 'Exercise 1', url: 'https://...' },
          //   ],
          // },
        ],
      },
    ],
  },
];

export function getTextbook(slug: string): Textbook | undefined {
  return textbooks.find((b) => b.slug === slug);
}
