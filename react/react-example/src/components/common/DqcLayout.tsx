import React, { useEffect, useState, CSSProperties } from 'react';

// import { Menu } from '@tencent/tea-component/lib/menu';
// import { NavMenu } from '@tencent/tea-component/lib/navmenu';
// import { Layout } from '@tencent/tea-component/lib/layout';
import { Menu } from 'tea-component/lib/menu';
import { NavMenu } from 'tea-component/lib/navmenu';
import { Layout } from 'tea-component/lib/layout';
import { Link } from 'react-router-dom';

const { Header, Body, Sider } = Layout;

interface DqcLayoutProps {
  menuList: any[];
  style?: CSSProperties;
  className?: String;
}

export const DqcLayout: React.FC<DqcLayoutProps> = (props: any) => {
  const [workspaceId, setWorkspaceId] = useState('');
  const { children, menuList = [] } = props;
  const { pathname } = window.location;
  return (
    <Layout>
      <Header>
        <NavMenu
          className='wedata-nav'
          left={
            <>
              <NavMenu.Item>
                <a
                  style={{
                    fontSize: '17px',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: 0,
                  }}
                >WeData</a>
              </NavMenu.Item>
              <NavMenu.Item>
                <span
                  style={{
                    fontSize: '16px',
                    color: '#fff',
                    marginLeft: '10px',
                  }}
                >|</span>
              </NavMenu.Item>
              <NavMenu.Item>
                <span
                  style={{
                    fontSize: '16px',
                    color: '#fff',
                    marginLeft: '10px',
                  }}
                >数据质量</span>
              </NavMenu.Item>
            </>
          }
        />
      </Header>
      <Body>
        <Sider>
          <Menu
            collapsable
            theme="dark"
            icon="https://via.placeholder.com/32.png?text=icon"
          >
            {
              menuList?.map((item: any, idx: number) => (
                <div key={idx}>
                  {item.children
                    && item.children.map((child: any, index: number) => (
                      <Menu.Item
                        key={index}
                        title={child.name}
                        selected={pathname.startsWith(child.prefix)}
                        icon={child.icon}
                        render={childObj => <Link to={`${child.url}?workspaceId=${workspaceId}`}>{childObj}</Link>}
                      />
                    ))}
                </div>
              ))
            }
          </Menu>
        </Sider>
        {children}
      </Body>
    </Layout>
  )
}