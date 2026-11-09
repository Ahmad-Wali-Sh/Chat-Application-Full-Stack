import { create } from "zustand";

const useToken = create((set) => ({
    token: null,
    setToken: (currentToken) => set(() => ({token: currentToken})) 
}))

export default useToken