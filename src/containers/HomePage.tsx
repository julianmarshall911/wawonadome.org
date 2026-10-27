import { type Ref, type RefObject, useRef } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Scroll from '../components/Scroll';
import banner from '../data/img/homepage_banner.jpg';
import logo from '../data/img/logo.svg';

const sections = [
  {
    title: 'Geography & History',
    body: `The town of Wawona is located at 4,000 foot elevation in
      Yosemite National Park, California. It is located 4 miles north
      of the southern entrance to the park on State Route 41. The town
      is home to such places as the Pioneer History Center, the Big
      Trees Lodge (formerly the Wawona Hotel), and the Wawona
      Campground. Wawona was established in the mid 1800s, by a miner
      named Galen Clark, who fell in love with the area and build a
      cabin near a spring on the west end of the meadow. The main
      trail to Yosemite ran by his cabin, and travelers low on
      provisions would often stop and ask him for food. This led to
      the establishment of Clark's Station, which would one day become
      the Wawona Hotel. Built by the Washburn family in 1886, the
      "Long House" would eventually become the start of the current
      Wawona Hotel complex. Hosting such guests in its early history
      as President Theodore Roosevelt, John Ruskin, and Lily Langtry,
      the Wawona Hotel and the surrounding area continued under the
      direction of the Washburn family until 1932. At this time, the
      Wawona area was added to Yosemite National Park, and became a
      National Historic Landmark and Historic Hotel of America.`,
  },
  {
    title: 'Wawona Dome',
    body: `Wawona Dome is a 6,800 foot granite dome in the southern area of
      Yosemite National Park. It was formed deep within the Earth by
      the solidification of molten rock, and was subsequently exposed
      to the air by the erosion of the overlying rocks. When glaciers
      formed 2 to 3 million years ago as the Sierra Nevada mountain
      range was uplifted due to plate tectonics, their movement added
      to the continued erosion, giving Wawona Dome the relatively
      smooth shape that is shared by so many other granite domes in
      Yosemite.`,
  },
  {
    title: 'South Fork of the Merced River',
    body: `The South Fork of the Merced River meanders through the valley
      and town of Wawona. Its headwaters are high in the granite
      mountains of the southern region of Yosemite, in the eastern
      Sierra Nevada Mountains near Triple Divide Peak. The river flows
      down through the paths that were carved by the glaciers before
      it, and continues to erode them further. Running directly
      through Wawona itself, the river passes along the southern side
      of Wawona Dome. As it continues further, it picks up water from
      many streams, including streams from the Chain Lakes, Givens
      Lake, and the high country above Chilnualna Falls. Outside the
      entrance to Yosemite, the South Fork merges directly into the
      main body of the Merced River.`,
  },
];

function Banner({ scrollTo }: { scrollTo: RefObject<HTMLElement | null> }) {
  return (
    <Box
      id='banner'
      sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Box
        component='img'
        src={banner}
        alt=''
        sx={{
          display: 'block',
          objectFit: 'cover',
          width: '100%',
          height: '100vh',
        }}
      />
      <Typography
        variant='h1'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          fontSize: '10em',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Box
          component='img'
          src={logo}
          alt=''
          sx={{ width: 128, height: 128, mr: 1 }}
        />
        Wassociates
      </Typography>
      <Scroll to={scrollTo} />
    </Box>
  );
}

function Info({ ref }: { ref: Ref<HTMLDivElement> }) {
  return (
    <Box
      ref={ref}
      id='info'
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        scrollMarginTop: '64px',
      }}>
      <Box sx={{ m: 4, mb: 0 }}>
        <Typography variant='h6' component='p'>
          Wassociates is a private, members-only secret society dedicated to
          preserving the spirit and lifestyle of certain forefathers (who shall
          remain nameless). Together, we try to deliver the experience of
          nirvana in a haphazardly maintained, slightly old-fashioned, somewhat
          run-down, yet delightful environment. By working together, we find the
          happiness we seek ... unless the electricity goes off.
        </Typography>
      </Box>
      <Box sx={{ m: 4, mb: 0 }}>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          {sections.map(({ title, body }) => (
            <Grid key={title} size={{ xs: 12, md: 4 }}>
              <Typography variant='h6' component='h2'>
                {title}
              </Typography>
              <Typography variant='body1'>{body}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default function HomePage() {
  const infoRef = useRef<HTMLDivElement>(null);
  return (
    <main>
      <Banner scrollTo={infoRef} />
      <Info ref={infoRef} />
    </main>
  );
}
