import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
// import 'antd/dist/antd.dark.min.css';

import Sidebar from 'components/Sidebar';
import QueriesPage from 'pages/QueriesPage';
import './App.css';

const {  Content, Footer } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Queries</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ background: "white", padding: 24, minHeight: 360 }}>
              <QueriesPage />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2022 Created by jmichnowicz</Footer>
        </Layout>
      </Layout>
  )
}

export default App;
