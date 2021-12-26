import { d } from "./bar"

//Ideally
export { a } from "../foo";
export const b = "b2"
export { c } from "../foo";


//To compile and test NormalModuleReplacement
// export const a = d;
// export const b = "b2"
// export const c = () => "c2"
