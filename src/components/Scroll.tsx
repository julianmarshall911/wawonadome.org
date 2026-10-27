import type { RefObject } from 'react';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ScrollProps {
  to: RefObject<HTMLElement | null>;
}

export default function Scroll({ to }: ScrollProps) {
  return (
    <ButtonBase
      onClick={() => to.current?.scrollIntoView({ behavior: 'smooth' })}
      sx={{
        color: '#fff',
        opacity: 0.8,
        background: '#000',
        padding: '10px',
        borderRadius: '32px',
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
      <Typography
        component='span'
        variant='h5'
        sx={{ ml: '12px', display: 'flex', alignItems: 'center' }}>
        See More <ArrowDownIcon sx={{ width: 32, height: 32 }} />
      </Typography>
    </ButtonBase>
  );
}
