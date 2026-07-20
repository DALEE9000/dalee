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

export type Category = 'Probability / Statistics / Machine Learning' | 'Mathematics' | 'Physics';

export const categories: Category[] = [
  'Probability / Statistics / Machine Learning',
  'Mathematics',
  'Physics',
];

export type Textbook = {
  slug: string;
  title: string;
  author: string;
  category: Category;
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
    category: 'Mathematics',
    coverDescription: 'Full solutions and visualizations for Gilbert Strang\'s Differential Equations and Linear Algebra.',
    description: 'Full solutions and visualizations for Gilbert Strang\'s Differential Equations and Linear Algebra.',
    fullSolutionsPdfUrl: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/deqla/deqla.pdf',
    chapters: [
      {
        title: 'Chapter 1: First Order Equations',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/deqlachap1/deqlachap1.pdf',
      },
      {
        title: 'Chapter 2: Second Order Equations',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/deqlachap2/deqlachap2.pdf',
      },
      {
        title: 'Chapter 8: Fourier and Laplace Transforms',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/deqlachap8/deqlachap8.pdf',
        sections: [
          {
            title: 'Section 8.3 Animations of the Heat Equation',
            animations: [
              { title: 'Exercise 2', url: 'https://github.com/DALEE9000/Solutions-to-Differential-Equations-and-Linear-Algebra-by-Gilbert-Strang/blob/main/chap8/sec8.3/chap8sec8.3ex2.mp4' },
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
  {
    slug: 'strang-linear-algebra-and-learning-from-data',
    title: 'Linear Algebra and Learning from Data',
    author: 'Gilbert Strang',
    category: 'Probability / Statistics / Machine Learning',
    coverDescription: 'Solutions for Gilbert Strang\'s Linear Algebra and Learning from Data.',
    description: 'Solutions for Gilbert Strang\'s Linear Algebra and Learning from Data.',
    fullSolutionsPdfUrl: 'https://github.com/DALEE9000/Solutions-to-Linear-Algebra-and-Learning-from-Data-by-Gilbert-Strang/blob/main/ladata/ladata.pdf',
    chapters: [
      {
        title: 'Part I: Highlights of Linear Algebra',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Linear-Algebra-and-Learning-from-Data-by-Gilbert-Strang/blob/main/ladatapart1/ladatapart1.pdf',
      },
    ],
  },
  {
    slug: 'haberman-applied-partial-differential-equations',
    title: 'Applied Partial Differential Equations',
    author: 'Richard Haberman',
    category: 'Mathematics',
    coverDescription: 'Solutions for Richard Haberman\'s Applied Partial Differential Equations.',
    description: 'Solutions for Richard Haberman\'s Applied Partial Differential Equations.',
    fullSolutionsPdfUrl: 'https://github.com/DALEE9000/Solutions-to-Applied-Partial-Differential-Equations-by-Richard-Haberman/blob/main/apde/apde.pdf',
    chapters: [
      {
        title: 'Chapter 1: Heat Equation',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Applied-Partial-Differential-Equations-by-Richard-Haberman/blob/main/apdechap1/apdechap1.pdf',
      },
      {
        title: 'Chapter 2: Method of Separation of Variables',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Applied-Partial-Differential-Equations-by-Richard-Haberman/blob/main/apdechap2/apdechap2.pdf',
      },
      {
        title: 'Chapter 3: Fourier Series',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Applied-Partial-Differential-Equations-by-Richard-Haberman/blob/main/apdechap3/apdechap3.pdf',
      },
    ],
  },
  {
    slug: 'wasserman-all-of-statistics',
    title: 'All of Statistics',
    author: 'Larry Wasserman',
    category: 'Probability / Statistics / Machine Learning',
    coverDescription: 'Solutions with Python simulations for Larry Wasserman\'s All of Statistics.',
    description: 'Solutions with Python simulations for Larry Wasserman\'s All of Statistics: A Concise Course in Statistical Inference.',
    fullSolutionsPdfUrl: 'https://github.com/DALEE9000/Solutions-to-All-of-Statistics-by-Larry-Wasserman/blob/main/allofstats/allofstats.pdf',
    chapters: [
      {
        title: 'Chapter 1: Probability',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-All-of-Statistics-by-Larry-Wasserman/blob/main/allofstatschap1/allofstatschap1.pdf',
      },
      {
        title: 'Chapter 2: Random Variables',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-All-of-Statistics-by-Larry-Wasserman/blob/main/allofstatschap2/allofstatschap2.pdf',
      },
      {
        title: 'Chapter 3: Expectation',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-All-of-Statistics-by-Larry-Wasserman/blob/main/allofstatschap3/allofstatschap3.pdf',
      },
      {
        title: 'Chapter 4: Inequalities',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-All-of-Statistics-by-Larry-Wasserman/blob/main/allofstatschap4/allofstatschap4.pdf',
      },
      {
        title: 'Chapter 5: Convergence of Random Variables',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-All-of-Statistics-by-Larry-Wasserman/blob/main/allofstatschap5/allofstatschap5.pdf',
      },
      {
        title: 'Chapter 6: Models, Statistical Inference and Learning',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-All-of-Statistics-by-Larry-Wasserman/blob/main/allofstatschap6/allofstatschap6.pdf',
      },
      {
        title: 'Chapter 7: Estimating the CDF and Statistical Functionals',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-All-of-Statistics-by-Larry-Wasserman/blob/main/allofstatschap7/allofstatschap7.pdf',
      },
      {
        title: 'Chapter 8: The Bootstrap',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-All-of-Statistics-by-Larry-Wasserman/blob/main/allofstatschap8/allofstatschap8.pdf',
      },
    ],
  },
  {
    slug: 'meyer-introductory-probability-and-statistical-applications',
    title: 'Introductory Probability and Statistical Applications',
    author: 'Paul L. Meyer',
    category: 'Probability / Statistics / Machine Learning',
    coverDescription: 'Full solutions for Paul L. Meyer\'s Introductory Probability and Statistical Applications, 2nd edition.',
    description: 'Full solutions for Paul L. Meyer\'s Introductory Probability and Statistical Applications, 2nd edition.',
    fullSolutionsPdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/DAL%20Paul%20Meyer%20Intro%20Prob%20Stats%20Solutions.pdf',
    chapters: [
      {
        title: 'Chapter 1: Introduction to Probability',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%201%20-%20Introduction%20to%20Probability/Chapter%201%20-%20Introduction%20to%20Probability.pdf',
      },
      {
        title: 'Chapter 2: Finite Sample Spaces',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%202%20-%20Finite%20Sample%20Spaces/Chapter%202%20-%20Finite%20Sample%20Spaces.pdf',
      },
      {
        title: 'Chapter 3: Conditional Probability and Independence',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%203%20-%20Conditional%20Probability%20and%20Independence/Chapter%203%20-%20Conditional%20Probability%20and%20Independence.pdf',
      },
      {
        title: 'Chapter 4: One-Dimensional Random Variables',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%204%20-%20One-Dimensional%20Random%20Variables/Chapter%204%20-%20One-Dimensional%20Random%20Variables.pdf',
      },
      {
        title: 'Chapter 5: Functions of Random Variables',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%205%20-%20Functions%20of%20Random%20Variables/Chapter%205%20-%20Functions%20of%20Random%20Variables.pdf',
      },
      {
        title: 'Chapter 6: Two- and Higher-Dimensional Random Variables',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%206%20-%20Two-%20and%20Higher-Dimensional%20Random%20Variables/Chapter%206%20-%20Two-%20and%20Higher-Dimensional%20Random%20Variables.pdf',
      },
      {
        title: 'Chapter 7: Further Characteristics of Random Variables',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%207%20-%20Further%20Characteristics%20of%20Random%20Variables/Chapter%207%20-%20Further%20Characteristics%20of%20Random%20Variables.pdf',
      },
      {
        title: 'Chapter 8: The Poisson and Other Discrete Random Variables',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%208%20-%20The%20Poisson%20and%20Other%20Discrete%20Random%20Variables/Chapter%208%20-%20The%20Poisson%20and%20Other%20Discrete%20Random%20Variables.pdf',
      },
      {
        title: 'Chapter 9: Some Important Continuous Random Variables',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%209%20-%20Some%20Important%20Continuous%20Random%20Variables/Chapter%209%20-%20Some%20Important%20Continuous%20Random%20Variables.pdf',
      },
      {
        title: 'Chapter 10: The Moment-Generating Function',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introductory-Probability-and-Statistical-Applications-2nd-ed.-Paul-L.-Meyer/blob/main/Chapter%2010%20-%20The%20Moment-Generating%20Function/Chapter%2010%20-%20The%20Moment-Generating%20Function.pdf',
      },
    ],
  },
  {
    slug: 'griffiths-introduction-to-electrodynamics',
    title: 'Introduction to Electrodynamics',
    author: 'David J. Griffiths',
    category: 'Physics',
    coverDescription: 'Solutions for David J. Griffiths\' Introduction to Electrodynamics.',
    description: 'Solutions for David J. Griffiths\' Introduction to Electrodynamics.',
    fullSolutionsPdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introduction-to-Electrodynamics-by-David-Griffiths/blob/main/introelectrodynamics/introelectrodynamics.pdf',
    chapters: [
      {
        title: 'Chapter 1: Vector Analysis',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Introduction-to-Electrodynamics-by-David-Griffiths/blob/main/introelectrodynamicschap1/introelectrodynamicschap1.pdf',
      },
    ],
  },
  {
    slug: 'kundu-cohen-dowling-fluid-mechanics',
    title: 'Fluid Mechanics',
    author: 'Pijush K. Kundu, Ira M. Cohen, and David R. Dowling',
    category: 'Physics',
    coverDescription: 'Solutions for Fluid Mechanics, 6th edition, by Kundu, Cohen, and Dowling.',
    description: 'Solutions for Fluid Mechanics, 6th edition, by Kundu, Cohen, and Dowling.',
    fullSolutionsPdfUrl: 'https://github.com/DALEE9000/Solutions-to-Fluid-Mechanics-6th-ed.-Kundu-Cohen-Dowling/blob/main/fluidmechanics/fluidmechanics.pdf',
    chapters: [
      {
        title: 'Chapter 2: Cartesian Tensors',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Fluid-Mechanics-6th-ed.-Kundu-Cohen-Dowling/blob/main/fluidmechanicschap2/fluidmechanicschap2.pdf',
      },
      {
        title: 'Chapter 12: Turbulence',
        pdfUrl: 'https://github.com/DALEE9000/Solutions-to-Fluid-Mechanics-6th-ed.-Kundu-Cohen-Dowling/blob/main/fluidmechanicschap12/fluidmechanicschap12.pdf',
      },
    ],
  },
];

export function getTextbook(slug: string): Textbook | undefined {
  return textbooks.find((b) => b.slug === slug);
}
