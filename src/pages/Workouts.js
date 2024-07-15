import { useContext } from 'react';
import {Navigate} from 'react-router-dom';
import UserContext from '../UserContext';
import UserView from '../components/UserView';


export default function Workouts() {

    const { user } = useContext(UserContext);


    return(
        user.access !== null ?

        <UserView/>
        :
        <Navigate to="/login" />

    )

}