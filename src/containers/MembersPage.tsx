import { useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { GROUP_EMAIL } from '../data/Constants';
import { mapLinkToIcon } from '../data/IconMapper';
import banner from '../data/img/member_banner.jpg';
import { type AuthUser, selectUser } from '../store/authSlice';
import {
  fetchUserData,
  selectUserData,
  type UserDataEntry,
} from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

function LinkGrid({ entry: { status, data } }: { entry: UserDataEntry }) {
  if (status === 'idle' || status === 'pending') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
        <CircularProgress color='primary' />
      </Box>
    );
  }

  const links = Object.entries(data?.links ?? {});
  if (links.length === 0) {
    return (
      <Typography sx={{ textAlign: 'center', my: 6 }}>
        {status === 'failed' ? "Couldn't load links." : 'No links yet.'}
      </Typography>
    );
  }

  return (
    <Grid container spacing={1} sx={{ justifyContent: 'center', my: 3 }}>
      {links.map(([title, url]) => {
        const Icon = mapLinkToIcon(title);
        return (
          <Grid
            key={title}
            size={{ xs: 6, sm: 4, md: 3 }}
            sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              sx={{ width: 128, height: 128, flexDirection: 'column' }}>
              <Icon sx={{ width: 72, height: 72 }} />
              {title}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default function MembersPage() {
  const dispatch = useAppDispatch();
  // Only reachable through RequireAuth.
  const user = useAppSelector(selectUser) as AuthUser;
  const myData = useAppSelector(state => selectUserData(state, user.email));
  const groupData = useAppSelector(state => selectUserData(state, GROUP_EMAIL));
  const [tab, setTab] = useState(0);

  useEffect(() => {
    void dispatch(fetchUserData(user.email));
    void dispatch(fetchUserData(GROUP_EMAIL));
  }, [dispatch, user.email]);

  return (
    <Box component='main' sx={{ pt: '64px' }}>
      <Box
        component='img'
        src={banner}
        alt=''
        sx={{ display: 'block', width: '100%' }}
      />
      <AppBar position='static'>
        <Tabs
          centered
          value={tab}
          onChange={(_event, value: number) => setTab(value)}
          indicatorColor='secondary'
          textColor='inherit'>
          <Tab label='My Links' />
          <Tab label='Group Links' />
        </Tabs>
      </AppBar>
      <LinkGrid entry={tab === 0 ? myData : groupData} />
    </Box>
  );
}
