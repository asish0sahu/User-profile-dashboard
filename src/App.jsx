/* eslint-disable no-unused-vars */
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import UserList from './components/userList';
import UserEdit from './components/userEdit';

const App = () => {
  return (
    <Router>
      <div className='container mx-auto p-6'>
        <Routes>
          <Route path="/" element={<UserList/>}/>
          <Route path="/edit/:id" element={<UserEdit />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;