// "use client";
// import React from "react";
// import { Provider } from "react-redux";
// import store from "./Redux/Store";

// const MainProvider = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <>
//       <Provider store={store}>{children}</Provider>
//     </>
//   );
// };

// export default MainProvider;
"use client";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./Redux/Store";
import { GlobalStateProvider } from "./Context/GlobalStateContext";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <GlobalStateProvider>
          {children}
        </GlobalStateProvider>
      </ReduxProvider>
    </>
  );
};

export default MainProvider;
