import { useContext } from 'react';
import { LibraryContext } from '@/components/Context';
import styles from '@/components/library/Library.module.css';

export default function BookSummary({
    title,
    author,
    bookCover,
    desc,
    pages
}) {
    
    // Establishing context
    const context = useContext(LibraryContext);
    
    return(
        <>
            <span>{title}</span>
            <span>{author}</span>
            <span>{desc}</span>
            <span>{pages}</span>
            <img src={bookCover} alt={title} />

            <button
                onClick={() => context.deactivateBookProfile()}
            >
                Back
            </button>
        </>
    );
}