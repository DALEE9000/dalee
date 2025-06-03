import styles from './ThreeDBook.module.css';

export default function ThreeDBook({ image, alt }) {
    return(
        <div className={styles['book']}>
            <img
                src={image}
                alt={alt} 
            />
        </div>
    )
}