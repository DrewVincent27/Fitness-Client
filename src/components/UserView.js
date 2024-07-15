import { useState, useEffect } from 'react';
import { Container, Row, Table, Button, Col, Stack} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import EditWorkout from './EditWorkout';
import ArchiveWorkout from './ArchiveWorkout';
import DeleteWorkout from './DeleteWorkout';


export default function UserView() {

    const [fetchWorkouts, setFetchWorkouts] = useState([])
    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        
        fetch('http://localhost:4000/workout/getMyWorkouts', {
            headers : { 
                Authorization : `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(data => { 

            // console.log(data);
            setFetchWorkouts(data.workouts);

            const workoutsArr = fetchWorkouts.map(workout => {

                return(
                    <tr className= 'text-center' key={workout._id}>
                    <td>{workout._id}</td>
                    <td>{workout.name}</td>
                    <td>{workout.duration}</td>
                    <td>{workout.status}</td>
                    <td><EditWorkout  workout={workout._id} /></td>
                    <td><DeleteWorkout workout={workout._id}/></td>
                    <td><ArchiveWorkout workout={workout._id} isActive={workout.status} /></td>
                    </tr>

                )
            })

            setWorkouts(workoutsArr);
        })

}, [fetchWorkouts])

return(

    <>
        <h1 className="text-center my-4"> Workout Dashboard </h1>
        <Container>
            <Row>
                
                <Col lg={12} gap={3} className='text-center'>
                <Link className='btn btn-primary m-4' to="/addWorkout">Add New Workout</Link>
                {/* <Link className='btn btn-success m-4 ' to="/userOrders">Show User Orders</Link> */}
                </Col>
                
            </Row>
        </Container>
        <Table striped bordered hover responsive>
            <thead>
                <tr className="text-center">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th colSpan="3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {workouts}
            </tbody>
        </Table>
    </>

)

}
