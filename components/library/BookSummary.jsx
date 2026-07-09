import { useContext } from 'react';
import { LibraryContext } from '@/components/Context';
import { jersey, raleway } from '@/components/Fonts';
import { AboutMeParagraph, BookBounce, LightUpText } from '@/components/BoxAnimations';
import styles from '@/components/library/Library.module.css';

// Split a description into sentences so each renders on its own line.
// Intl.Segmenter understands abbreviations far better than a period regex.
function splitSentences(text) {
    if (!text) return [];
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
        return [...segmenter.segment(text)]
            .map(s => s.segment.trim())
            .filter(Boolean);
    }
    // Fallback for very old browsers
    return text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
}

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
        <div className={styles['profile-container']}>
            <div
                className={styles['book-profile']}
                style={{
                    fontFamily: raleway.style.fontFamily,
                }}
            >
                <div className={styles['profile-cover-container']}>
                    <BookBounce>
                        <img 
                            className={styles['profile-cover']}
                            src={bookCover} 
                            alt={title}
                        />
                    </BookBounce>
                </div>

                <div className={styles['profile-data']}>
                    <span className={styles['profile-title']}>{title}</span>
                    <span className={styles['profile-author']}>{author}</span>
                    <span className={styles['profile-pages']}>Pages: {pages}</span>
                    <AboutMeParagraph props={styles['profile-desc']}>
                        {splitSentences(desc).map((sentence, index) => (
                            <span key={index} className={styles['desc-sentence']}>
                                {sentence}
                            </span>
                        ))}
                    </AboutMeParagraph>
                </div>
            </div>
            <button
                className={styles['category-button']}
                onClick={() => context.deactivateBookProfile()}
            >
              <LightUpText props={styles['back-button']} style={{ fontFamily: jersey.style.fontFamily }}>Back</LightUpText>
            </button>
        </div>
    );
}