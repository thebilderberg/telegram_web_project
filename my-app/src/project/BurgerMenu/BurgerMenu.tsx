import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import './BurgerMenu.scss';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { 
    key: '1',
    icon: <PieChartOutlined />, 
    label: <Link to="/">Главная</Link> 
  },
  { 
    key: '2', 
    icon: <DesktopOutlined />, 
    label: <Link to="/clocks">Часы</Link>
  },
  { 
    key: '3', 
    icon: <ContainerOutlined />, 
    label: <Link to="/grid">Сетка</Link>
  },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
];


function BurgerMenu() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

  return (
    <div style={{ width: 256, position: 'absolute' }}>
      <Button className="burgerButton" type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {collapsed ? (
        <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={!collapsed}
        items={items}
        className='collapse'
      />
      ) : null}
    </div>
  );
}

export default BurgerMenu;
