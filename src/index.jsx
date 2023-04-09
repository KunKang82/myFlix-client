import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const App = () => {
    return (
        <MainView />
    );
};
// Main compnent (will eventually use all the others)
// const MyFlixApplication = () => {
//     return (
//         <div className="my-flix">
//             <div>Good morning</div>
//         </div>
//     );
// };

// Finds the roote of your app
const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);
// Tells React to render your app in the root DOM element
// root.render(<MyFlixApplication />);
