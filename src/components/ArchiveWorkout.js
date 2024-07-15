import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function ArchiveWorkout({ workout, isActive }) {

    // console.log(workout)
    const completedToggle = () => {
        fetch(`http://localhost:4000/workout/completeWorkoutStatus/${workout}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => { 
            if (data.message === "Workout status updated successfully") {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Congrats! the workout is now completed!'

                }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
        }else {

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

    {isActive === "pending" ?
     <Button variant="danger" size="sm" onClick={() => completedToggle(workout)}>Push if Completed</Button>

     :

     <Button variant="success" size="sm" onClick={() => completedToggle(workout)} disabled>Workout Completed!</Button>

     
    }
     </>
    )


}