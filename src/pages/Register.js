import {useState, useEffect, useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {Button, Form}from 'react-bootstrap';
import UserContext from '../UserContext';


export default function Register(){ 

    const {user} = useContext(UserContext);
    const [firstName, setFirstName ] = useState("");
    const [lastName, setLastName ] = useState("");
    const [email, setEmail ] = useState("");
    const [mobileNo, setMobileNo ] = useState("");
    const [password, setPassword ] = useState("");
    const [confirmPassword, setConfirmPassword ] = useState("");

    const [isActive, setIsActive ] = useState(false);
    const navigate = useNavigate();

    function registerUser(e) {

        e.preventDefault()
        fetch('http://localhost:4000/users/register', {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data =>{

            if(data.message === 'Registered Successfully') {
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNo("");
                setPassword("");
                setConfirmPassword("");

                alert('Registration successful');

                navigate("/login");

            } else if (data.message === 'Invalid email format') {

                alert('Email Invalid');

            } else if (data.message === 'Mobile number is invalid') {

                alert('Mobile number is invalid');

            } else if (data.message === 'Password must be at least 8 characters long'){

                alert('Password must be at least 8 characters');

            } else {
                alert('Something went wrong.')
            }
        })
    }
    useEffect(() => {

        // Checks if all the variables meets the specific requirements needed
        if((firstName !== "" && lastName !== "" && mobileNo !== "" && email !== "" && password !== "" && confirmPassword !== "") &&(mobileNo.length === 11) && (password === confirmPassword)) {

            setIsActive(true);

        }else {
            setIsActive(false);
        }

    },[firstName, lastName, email, mobileNo, password, confirmPassword])

    console.log(user);
    return(
        
        <Form onSubmit={e => registerUser(e)}>
    
        <h1 className='my-5 text-center'>Register</h1>

        {/* Two way data binding */}
        {/* onChange() method is an Event that when there is changes to firstName it will be saved to setFirstName */}
       <Form.Group>
           <Form.Label>First Name</Form.Label>
           <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={e=> {setFirstName(e.target.value)}} required/>
       </Form.Group>

       <Form.Group>
           <Form.Label>Last Name</Form.Label>
           <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={e=> {setLastName(e.target.value)}} required/>
       </Form.Group>

       <Form.Group>
           <Form.Label>Email</Form.Label>
           <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e=> {setEmail(e.target.value)}} required/>
       </Form.Group>

       <Form.Group>
           <Form.Label>Mobile No:</Form.Label>
           <Form.Control type="text" placeholder="Enter 11 Digit Mobile No" value={mobileNo} onChange={e=> {setMobileNo(e.target.value)}} required/>
       </Form.Group>

       <Form.Group>
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e=> {setPassword(e.target.value)}} required/>
       </Form.Group>

       <Form.Group>
           <Form.Label>Confirm Password</Form.Label>
           <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=> {setConfirmPassword(e.target.value)}} required/>
       </Form.Group>

        {/* Conditional Rendering for the submit button based on the isActive */}
        {/* Conditional Rendering is displaying elements depending on the conditions we have set */}
       {
           isActive ?
           <Button variant="primary" type="submit">Submit</Button>
           :
           <Button variant="danger" type="submit" disabled>Submit</Button>
       }
   </Form>
    )
}