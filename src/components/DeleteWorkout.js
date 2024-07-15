import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveWorkout({ workout}) {
    const completedToggle = () => {
        fetch(`http://localhost:4000/workout/deleteWorkout/${workout}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => { 
            if (data.message === "Workout deleted successfully") {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'The work out is now deleted'

                }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                } else {

                    Swal.fire({
                        title: 'Good Job! Lets finish another one!',
                        icon: 'success',
                        text: 'The workout is now completed! Lets Go!'
        
                    }).then((result) => {
                        if (result.isConfirmed) {
                          window.location.reload();
                        }
                      });
                    }
    })
}

    return(
        <>

         <Button variant="danger" size="sm" onClick={() => completedToggle(workout)}>Delete</Button>
    
         </>
    )
}