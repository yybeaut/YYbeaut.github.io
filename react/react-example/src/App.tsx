import logo from './logo.svg';

// 导入样式
// import '@tencent/tea-component/lib/tea.css';
import 'tea-component/lib/tea.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { AppEntry } from './pages/appEntry';

import './App.less';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AppEntry />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
