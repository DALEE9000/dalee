import { useContext } from 'react';
import clsx from 'clsx';
import { jersey } from './Fonts';
import { StargazerContext } from '@/components/Context';
import styles from "@/components/home/Home.module.css";

export default function Footer() {
  const today = new Date();
  const context = useContext(StargazerContext);

  const stargazer = clsx(context.stargazer && styles['stargazer'])

  return(
          <footer
            className={stargazer}
            style={{
              fontFamily: jersey.style.fontFamily,
            }}
          >
            <p>Created with Next.js, &copy; {today.getFullYear()} David A. Lee </p>
            <p>Festina lente</p>
          </footer>
  );
}