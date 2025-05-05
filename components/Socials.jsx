import Image from 'next/image';
import Link from 'next/link';
import styles from "@/components/Socials.module.css";

export default function Socials() {
    return (
        <div
            className={styles['socials']}
        >
            <Link
                href="https://github.com/DALEE9000"
                rel="noopener noreferrer"
                target="_blank"
            >
                <Image
                    className={styles['sm']}
                    src="/socialmedia/github-mark-white.svg"
                    alt="Github"
                    sizes="5vw"
                    width={50}
                    height={50}
            />
           </Link>


            <Link
                href="https://www.linkedin.com/in/david-lee-5b7aa4143/"
                rel="noopener noreferrer"
                target="_blank"
            >
                <Image
                    className={styles['sm']}
                    src="/socialmedia/InBug-White.png"
                    alt="LinkedIn"
                    sizes="5vw"
                    width={50}
                    height={50}
                />
            </Link>


            <Link
                href="https://x.com/lorenz_system"
                rel="noopener noreferrer"
                target="_blank"
            >
                <Image
                    className={styles['sm']}
                    src="/socialmedia/x-logo.svg"
                    alt="X"
                    sizes="5vw"
                    width={50}
                    height={50}
                />
            </Link>


            <Link
                href="https://bsky.app/profile/davidalee.bsky.social"
                rel="noopener noreferrer"
                target="_blank"
            >
                <Image
                    className={styles['sm']}
                    src="/socialmedia/bluesky-1.svg"
                    alt="Bluesky"
                    sizes="5vw"
                    width={50}
                    height={50}
                />
            </Link>


            <Link
                href="https://math.stackexchange.com/users/250241/david-a-lee"
                rel="noopener noreferrer"
                target="_blank"
            >
                <Image
                    className={styles['sm']}
                    src="/socialmedia/se-icon.svg"
                    alt="StackExchange"
                    sizes="5vw"
                    width={50}
                    height={50}
                />
            </Link>
        </div>
    )
}