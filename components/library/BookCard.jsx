import { raleway } from '@/components/Fonts';
import styles from './Library.module.css';   

export default function BookCard({ title }) {
    return (
        <div
            className={styles['book-card']}
        >
            <p
                className={styles['book-title']}
                style={{ fontFamily: raleway.style.fontFamily, }}
            >
                {title}
            </p>
        </div>
    )
}