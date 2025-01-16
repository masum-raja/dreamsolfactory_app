import { create } from 'zustand'

const useUserStore = create((set) => ({
  loginuser: [],
  isLoading: false,
  message: "",
  isError: "",
  accessToken: "",
  setUserLogin: (user) => set({ user }),
  setIsLoading: (status) => set({ ...status,isLoading:status }),
  setMessage: (response) => set({ ...response,message:response }),
  setIsError: (status) => set({ ...status,isError:status }),
  setAccessToken: (token) => set({ ...token, token: accessToken})
}));

export default useUserStore;