import { ReactNotifications } from "react-notifications-component";
import TodoContainer from "./components/todoContainer";

function App() {
  return (
    <div className="App">
      {/* rendering the todo container component */}
      <TodoContainer />
      {/*ReactNotifications for rendering up all the notifications*/}
      <ReactNotifications/>
    </div>
  );
}

export default App;