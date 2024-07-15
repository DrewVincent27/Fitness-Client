import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function EditWorkout({ workout }) {

    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');


    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (workoutId) => {

        // to fetch the specific course after clicking Edit button
        fetch(`http://localhost:4000/workout/getMyWorkouts`, {
            headers : { 
                Authorization : `Bearer ${localStorage.getItem('token')}` 
            }
        })
        
        .then(res => res.json())
        .then(data => {

            const workoutsData = data.workouts;
            // changed findIndex method to find method
            // Error: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component
            const foundWorkout = workoutsData.find(workoutIndex => workoutIndex._id === workoutId);
            // console.log(foundWorkout);

            if(foundWorkout){

                setName(foundWorkout.name);
                setDuration(foundWorkout.duration);

            }
            
            setShowEdit(true);

        }).catch(error => {
            console.error('Error fetching workouts:', error);
        });
    };

        //function for closing the edit window
        const closeEdit = () => {

            // setting the setShowEdit to false
            setShowEdit(false);
    
                // after clicking the close button it will set the values to its initial
                setName('');
                setDuration('');
        }
        const editProduct = (e, workoutId) => {

            e.preventDefault();

            fetch(`http://localhost:4000/workout/updateWorkout/${workoutId}`, {
            method : "PATCH",
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            },
            body : JSON.stringify({
                // simplified form of name: name
                name,
                duration,
            })
        })        .then(res => res.json())
        .then(data => {
            if(data.message === 'Workout updated successfully') {

                Swal.fire ({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Product Successfully Updated'

                }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                } else {

                    Swal.fire ({
                        title: 'Failed',
                        icon: 'error',
                        text: 'Failed in updating exercise'
    
                    })

                }
        })

        }

return(

    <>
    <Button variant="primary" size="sm" onClick={() => openEdit(workout)}>Edit</Button>

    {/* creating the modal after clicking Edit button. we will be using fragments because the show edit is a JSX code */}
    {/* onHide={closeEdit} is for closing the window for Edit */}
    <Modal show={showEdit} onHide={closeEdit}>
        {/* on submit it will be running the editCourse function */}
        <Form onSubmit={e => editProduct(e, workout)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" value={duration} onChange={e => setDuration(e.target.value)}required />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                {/* we add a function upon clicking to trigger the closeEdit function */}
                <Button variant="secondary" onClick={() => closeEdit()}>Close</Button>
                <Button variant="success" type="submit">Submit</Button>
            </Modal.Footer>
        </Form>
    </Modal>
</>
)
}