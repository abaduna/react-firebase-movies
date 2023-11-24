import {auth,googleProvider  } from "../config/firebase"
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from "firebase/auth"
//createUserWithEmailAndPassword  PARA CREAR USUARIOS
import {useState} from "react"
export const Auth =()=>{
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("");
    

    // console.log(auth?.currentUser?.email);


    const sigin = async()=>{
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario creado con éxito!");
          } catch (error) {
            console.error("Error al crear el usuario", error.message);
          }
    }
     // Aquí, verificamos si hay un usuario actual antes de intentar acceder a la propiedad 'email'
      // Aquí, verificamos si hay un usuario actual antes de intentar acceder a la propiedad 'email'

    const signWithGoogle = async()=>{
        try {
            await signInWithPopup(auth,googleProvider);
            console.log("Usuario creado con éxito!");
          } catch (error) {
            console.error("Error al crear el usuario", error.message);
          }
    }
    const logout = async()=>{
        try {
            await signOut(auth);
            console.log("Usuario eliminado con éxito!");
          } catch (error) {
            console.error("Error al crear el usuario", error.message);
          }
    }
    return <div> 
        <input placeholder="Correo Electronico" 
        onChange={(e)=>setEmail(e.target.value)}/> 
        <input placeholder="Contraseña" 
        type="password"
        onChange={(e)=>setPassword(e.target.value)} /> 
        <button onClick={sigin} >  Entrar</button>

        
        <button onClick={signWithGoogle}>Entrar con Google</button>

        <button onClick={logout}>Salir</button>

        
        </div>
    
}