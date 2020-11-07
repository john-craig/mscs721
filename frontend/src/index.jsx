import React from "react";
import ReactDOM from "react-dom";
import UserInterface from './components/UserInterface';
import './index.css';


// const App = () => {  
//   return (
//     <div>
//         <UserInterface></UserInterface>
//     </div>
//   );
// };

ReactDOM.render(<UserInterface />, document.querySelector("#root"));