import React from "react";
import { context } from ".";
import { IUser } from "../../types";
import { apiHandler } from "../../function";

const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);

  async function fetchUser() {
    const res = await apiHandler({
      path: "user/info",
    });

    if (res.data) {
      setUser(res.data.data);
    }

    setIsInitialLoading(false);
  }

  React.useEffect(() => {
    console.log("Initial log");
    fetchUser();
  }, []);

  return (
    <context.Provider
      value={{
        user,
        setUser,
        isInitialLoading,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default ContextProvider;
