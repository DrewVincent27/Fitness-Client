import {useState, useEffect, useContext} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {Button, Form}from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';





export default function AddWorkout() { 

    const { user } = useContext(UserContext);

    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if((name !== "" && duration !== "")) {
    
                    setIsActive(true);
    
                } else {
    
                    setIsActive(false);    
            }
    },  [name, duration])


    function addingWorkout(e) {
        
        e.preventDefault();

        fetch('http://localhost:4000/workout/add-workout', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}` 
    
            },
            body: JSON.stringify({ 
                name,
                duration,
              })
        })
        .then(res => res.json())
        .then(data => {
            if(data.hasOwnProperty("_id")) {
            console.log(data);
            Swal.fire({
                title: 'Product Added',
                icon: 'success',
                text: data.message // Course added successfully
              })

              navigate("/workouts")
            }
        })

        setName("");
        setDuration("");
    }

    return(

        user.access === null ?
        <Navigate to="/" />

        :

        <Form onSubmit={(e) => addingWorkout(e)}>
          
            <h1 className='my-5 text-center'>ADD WORKOUT</h1>  

            <Form.Group controlId="exerciseName">
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                type="name" 
                placeholder="Enter Workout Name" 
                value={name} 
                onChange={e => setName(e.target.value)} required
                />
            </Form.Group>
        
        
            <Form.Group  controlId="workoutDuration">
                <Form.Label>Duration:</Form.Label>
                <Form.Control 
                type="duration" 
                placeholder="Enter Duration of Workout" 
                value={duration} 
                onChange={e => {setDuration(e.target.value)}} required
                />
            </Form.Group>


            {/* Conditional Rendering for the submit button based on the isActive state */}
            {
                isActive ?
            <Button variant="primary" type="submit" id="submitBtn">Submit</Button>
            :
            <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
            }
    
        </Form>
    )

}