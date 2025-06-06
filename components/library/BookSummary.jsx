import { useContext } from 'react';
import { LibraryContext } from '@/components/Context';
import { jersey, raleway } from '@/components/Fonts';
import { AboutMeParagraph, BookBounce, LightUpText } from '@/components/BoxAnimations';
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
                    <AboutMeParagraph props={styles['profile-desc']}>{desc}</AboutMeParagraph>
                </div>
            </div>
            <button
                className={styles['category-button']}
                onClick={() => context.deactivateBookProfile()}
            >
              <LightUpText props={styles['page-button']} style={{ fontFamily: jersey.style.fontFamily }}>Back</LightUpText>
            </button>
        </div>
    );
}