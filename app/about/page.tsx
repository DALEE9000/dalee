import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center text-center">

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <p>This is David&apos;s about page</p>

          <p>Click <Link href="/">here to go back home</Link></p>
        </div>
      </main>
      <footer className="mt-8 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}