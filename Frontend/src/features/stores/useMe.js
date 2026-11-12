import { create } from 'zustand'


// const useMe = create((set) => {
//     return {
//         user: {},
//         setUser: (value) => {
//             set({user: value})
//         }
//     }
// })


const useMe = create((set) => ({
    user: {},
    setUser: (value) => set(() => ({user: value})) 
}))

export default useMe