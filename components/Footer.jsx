import { jersey } from './Fonts';

export default function Footer() {
    const today = new Date();

    return(
            <footer
              style={{
                fontFamily: jersey.style.fontFamily,
              }}
            >
              <p>Created with Next.js, &copy; {today.getFullYear()} David A. Lee </p>
              <p>Festina lente</p>
            </footer>
    );
}