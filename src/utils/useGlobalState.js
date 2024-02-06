import { useGlobalContext } from "../context";

export const useGlobalState = () => {
  const { state } = useGlobalContext();
  // console.log(state);
  return state;
};
