import { FC, ReactNode } from 'react';

// components
import { Box, Small } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './section.scss';

// types
import { E2EAttribute } from 'types';

export type TSectionProps = {
  children: ReactNode;
  label: string;
};

const Section: FC<TSectionProps> = ({ children, label }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      e2eAttribute={E2EAttribute.section}
    >
      <Small classes={{ className: cx(classNamesWithTheme.label) }}>
        {label}
      </Small>
      {children}
    </Box>
  );
};

export default Section;
