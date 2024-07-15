import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Login() { 


    const {user,setUser} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);

    function authenticate(e){ 

        e.preventDefault();

        fetch('http://localhost:4000/users/login', { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 

                email: email,
                password: password 
              })

        })
        .then(res => res.json())
        .then(data => { 

            if(typeof data.access !== "undefined") {
            localStorage.setItem('token', data.access);

            Swal.fire({
                title: 'Login Successful',
                icon: 'success',
                text:'Welcome to Fitness Tracker App'
            })

        }else if (data.message === "No email found") {

            //alert(`Email does not exist`);
            Swal.fire({
              title: 'No email found',
              icon: 'error',
              text: 'Email does not exist.'
            })

        } else {
            //alert(`Something went wrong`);
            Swal.fire({
              title: 'Authentication failed',
              icon: 'error',
              text: 'Check your login details and try again'
            })
        }

        })
        setEmail('');
        setPassword('');

    }

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if((email !== "" && password !== "")) {

                    setIsActive(true);

                } else {

                    setIsActive(false);    
            }
    },  [email, password])


    return(

    ( user.access !== null) ?

        <Navigate to="/" />

        :


        <Form onSubmit={(e) => authenticate(e)}>
	        	<h1 className="my-5 text-center">Login</h1>
	            <Form.Group controlId="userEmail">
	                <Form.Label>Email address</Form.Label>
	                <Form.Control 
	                    type="text"
	                    placeholder="Enter email"
	                    value={email}
            			onChange={(e) => setEmail(e.target.value)}
	                    required
	                />
	            </Form.Group>

	            <Form.Group controlId="password">
	                <Form.Label>Password</Form.Label>
	                <Form.Control 
	                    type="password" 
	                    placeholder="Password"
	                    value={password}
            			onChange={(e) => setPassword(e.target.value)}
	                    required
	                />
	            </Form.Group>

	             { isActive ? 
	                <Button variant="primary" type="submit" id="submitBtn">
	                    Submit
	                </Button>
	                : 
	                <Button variant="danger" type="submit" id="submitBtn" disabled>
	                    Submit
	                </Button>
	            }
	        </Form>

    )
}