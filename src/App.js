// MODULES
import { useUserFromLocalStorage, useBlogsDatabase } from "./utils/hooks";
import { Switch, Route } from "react-router-dom";
//STYLES
import './App.css';
//COMPONENTS
import NavBar from './components/NavBar/NavBar.component';
import Blogs from './components/Blogs/Blogs.component'
import DisplayMessage from "./components/DisplayMessage/DisplayMessage.component";
import Footer from "./components/Footer/Footer.component";
import Blog from "./components/Blog/Blog.component";
import LogIn from "./components/LogInForm/LogInForm.component";
import SignUp from "./components/SignUpForm/SignUpForm.component";
import UsersPage from "./components/UsersPage/UsersPage.component";
import User from "./components/User/User.component";
import CommentSection from "./components/CommentSection/CommentSection.component";

function App() {
  useBlogsDatabase();
  useUserFromLocalStorage();
  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <Switch>
        <Route path="/login">
          <main>
            <LogIn/>
          </main>
        </Route>
        <Route path="/blogs/:id">
          <main className="main-blog">
            <Blog/>
            <CommentSection/>
          </main>
        </Route>
        <Route path="/signup">
          <main>
            <SignUp/>
          </main>
        </Route>
        <Route path="/user/:id">
          <User/>
        </Route>
        <Route path="/users">
          <main>
            <UsersPage/>
          </main>
        </Route>
        <Route path="/">
          <main>
            <DisplayMessage/>
            <Blogs/>
          </main>
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
