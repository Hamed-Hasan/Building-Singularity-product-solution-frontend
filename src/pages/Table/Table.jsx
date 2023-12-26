import React from 'react';
import { Tabs, TabList, TabPanels, TabPanel, useTab, useMultiStyleConfig, Box, Button, Tab } from '@chakra-ui/react';
import { FcDownLeft, FcDownRight } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom'; // Step 1

import '../../styles/styles.css';
import UserList from '../../components/user/UserList';
import ItemList from '../../components/items/ItemList';

const Table = () => {
  const navigate = useNavigate(); // Step 2

  const CustomTab = React.forwardRef((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps['aria-selected'];
    const styles = useMultiStyleConfig('Tabs', tabProps);

    return (
      <Button __css={styles.tab} {...tabProps}>
        <Box as='span' mr='2'>
          {isSelected ? <FcDownRight /> : <FcDownLeft />}
        </Box>
        {tabProps.children}
      </Button>
    );
  });

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='table-bg py-14'>
      <div className='flex items-center justify-center my-6'>
        <button onClick={handleLogout} style={{ content: 'Hover me!' }}>
          <div class='left'></div>
          <h1 className='font-bold text-white px-5 py-3'>Logout</h1>
          <div class='right'></div>
        </button>
      </div>
      <Tabs>
        <TabList justifyContent='center' gap='5'>
          <Tab
            color='white'
            fontWeight='700'
            _selected={{ color: 'white', bg: '#E99400', rounded: 'full' }}
          >
            User List
          </Tab>
          <Tab
            color='white'
            fontWeight='700'
            _selected={{ color: 'white', bg: '#E99400', rounded: 'full' }}
          >
            Item List
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserList />
          </TabPanel>
          <TabPanel>
            <ItemList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Table;