import { Container } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import Notification from './Sections/notification';
import Totp from './Sections/totp';
import Usb from './Sections/usb';
import Version from './Sections/version';
import WebTerminal from './Sections/webTerminal';
import './styles.css';

function Image({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section>
      <Container>
        <motion.article
          ref={ref}
          style={{
            transform: isInView ? 'none' : 'translateX(-200px)',
            opacity: isInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)',
          }}
        >
          {children}
        </motion.article>
      </Container>
    </section>
  );
}

export default function Parallax() {
  return (
    <main id="page">
      {[<Version />, <Notification />, <Totp />, <Usb />, <WebTerminal />].map(
        (image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Image key={index}>{image}</Image>
        ),
      )}
    </main>
  );
}
