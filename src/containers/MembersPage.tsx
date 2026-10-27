import { useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';

import LinkBoard from '../components/LinkBoard';
import { GROUP_EMAIL } from '../data/Constants';
import banner from '../data/img/member_banner.jpg';
import { type AuthUser, selectUser } from '../store/authSlice';
import { fetchUserData, selectUserData } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import styles from './MembersPage.module.css';

export default function MembersPage() {
  const dispatch = useAppDispatch();
  // Only reachable through RequireAuth.
  const user = useAppSelector(selectUser) as AuthUser;
  const myData = useAppSelector(state => selectUserData(state, user.email));
  const groupData = useAppSelector(state => selectUserData(state, GROUP_EMAIL));

  useEffect(() => {
    void dispatch(fetchUserData(user.email));
    void dispatch(fetchUserData(GROUP_EMAIL));
  }, [dispatch, user.email]);

  return (
    <main>
      <img
        className={styles.banner}
        src={banner}
        alt='The cabin, its deck and the pines on a winter morning'
      />
      <Tabs className={styles.content}>
        <TabList aria-label='Links' className={styles.tabList}>
          <Tab id='mine' className={styles.tab}>
            My Links
          </Tab>
          <Tab id='group' className={styles.tab}>
            Group Links
          </Tab>
        </TabList>
        <TabPanel id='mine' className={styles.panel}>
          <LinkBoard entry={myData} label='My links' />
        </TabPanel>
        <TabPanel id='group' className={styles.panel}>
          <LinkBoard entry={groupData} label='Group links' />
        </TabPanel>
      </Tabs>
    </main>
  );
}
