import Banner from '../components/Banner';

export default function Home() { 

    const data = {
        title: "Fitness Tracker",
        content: "Keep Track Of Your Exercise For Free With Fitness Tracker App!",
        destination: "/register",
        label: "Register today!"
    }

    return (
		<>

			<Banner data={data}/>
            
		</>
	)
}