// src/App.tsx
import React from "react";
import UserForm from "./components/UserForm";

const App: React.FC = () => {
  return (
    <div className="bg-img h-screen w-screen  z-10">
      <div className="h-screen w-screen absolute gradientmy bg-transparent">

      </div>
      <UserForm/>
    </div>
  );
};

export default App;
