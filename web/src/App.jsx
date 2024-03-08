import { Queries } from "./components/queries";
import { CompareShifts } from "./components/shifts/CompareShifts";

export function App() {
  return (
      <div className="app-container">
        <CompareShifts />
        <Queries />
      </div>
  );
}
