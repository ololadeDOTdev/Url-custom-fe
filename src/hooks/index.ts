import { IContext } from "../../types";
import React from "react";
import { context } from "../context";

export function useSetUser(): [IContext["user"], IContext["setUser"]] {
  const { user, setUser } = React.useContext(context);

  return [user, setUser];
}

export function useUser(): IContext["user"] {
  const { user } = React.useContext(context);

  return user;
}

export function useIsLoggedIn(): boolean {
  const { user } = React.useContext(context);

  return user !== null;
}

export function useIsInitialLoading(): IContext["isInitialLoading"] {
  const { isInitialLoading } = React.useContext(context);

  return isInitialLoading;
}
