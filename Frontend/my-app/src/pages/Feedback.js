import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Paper} from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * This is Feedback form for the employees.
 * @returns the form for the feedback from the employees.
 */

/* function Feedback() {
const[name,setName]=useState('')
const[subject,setSubject]=useState('')
const[message,setMessage]=useState('')
const [feedbacks,setFeedbacks]=useState([]);

const handleClick=(e)=>{
    e.preventDefault()
    const feedback={name,subject,message}
    console.log(feedback)
    fetch("http://localhost:8080/feedback/add",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(feedback)

}).then(()=>{
    console.log("New Feedback Submitted")
})


}

useEffect(()=>{
    fetch("http://localhost:8080/feedback/getAll")
    .then(res=>res.json())
    .then((result)=>{
        setFeedbacks(result);
    })
}
)
    return (
        <div className="container-fluid" style={{ backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS83QYOLj-YDwzZNN3_hLOW0mmjuJ3dNeRQ8w&usqp=CAU)", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "115vh" }}>

            <div className="row p-3">
                <div className="col-sm-4 ms-auto me-auto pt-5 mt-3  shadow-sm"
                    style={{
                        backdropFilter: "blur(5px)",
                        backgroundColor: "rgba(179, 192, 192)",
                        borderRadius: "30px"
                    }}>

                    <h4 style={{
                            fontWeight: "900",
                            fontFamily: "sen sarif",
                            textAlign:"center"
                        }}>
                        Feedback
                       
                    </h4>

                    <p style={{
                            fontWeight: "700",
                            fontFamily: "Helvetica",
                            fontSize: "14px",
                            textAlign:"center"
                        }}>
                        feel free to give your opinion
                    </p>

                    <form className='ms-auto me-auto p-5 feedback-form'>
                        <div className='mb-4'>
                            <TextField id="standard-basic1" type={"text"} className='col-sm-12 w-100' label="Full Name" variant="standard" required value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        
                        <div className='mb-4'>
                            <TextField id="standard-basic3" type={"text"} className='col-sm-12 w-100' label="Subject" variant="standard" required value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                        </div>
                        
                        <div className='mb-4'>
                            <TextField id="standard-basic4" minRows={10} className='col-sm-12 w-100' label="Message" variant="standard" requiredvalue={message} onChange={(e)=>setMessage(e.target.value)} />
                        </div>
                        <Button variant="contained" type='submit' className='w-100 mt-3 p-3 mb-5'
                            style={{ backgroundColor: "#032740" }} onClick={handleClick}>
                            Submit &nbsp;
                            <i class="fa-solid fa-paper-plane" ></i>
                        </Button>

                    </form>


<h1>Feedbacks</h1>
<Paper elevation={3}>
    {feedbacks.map(feedback=>(
        <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}}>
             Id:{feedback.id}<br></br>
             Name:{feedback.name}<br></br>
             Subject:{feedback.subject}<br></br>
             Message:{feedback.message}

        </Paper>

        

         ))
    
    }


</Paper>

                </div>
            </div>
        </div>

    );
}

export default Feedback;
*/ 





function Feedback() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const feedback = { name, subject, message };
    console.log(feedback);
    fetch("http://localhost:8080/feedback/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback)
    }).then(() => {
      console.log("New Feedback Submitted");
      navigate("/feedbacks"); // Navigate to the feedbacks page
    });
  };

  return (
    <div className="container-fluid" style={{backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "115vh",}}>
      <div className="row p-3">
        <div className="col-sm-4 ms-auto me-auto pt-5 mt-3  shadow-sm"
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(179, 192, 192)",
            borderRadius: "30px",
            boxShadow: "horizontal-offset vertical-offset blur-radius color"

          }}>
          <h4 style={{
            fontWeight: "900",
            fontFamily: "sen sarif",
            textAlign: "center"
          }}>
            Feedback
          </h4>
          <p style={{
            fontWeight: "700",
            fontFamily: "Helvetica",
            fontSize: "14px",
            textAlign: "center"
          }}>
            feel free to give your opinion
          </p>
          <form className='ms-auto me-auto p-5 feedback-form'>
            <div className='mb-4'>
              <TextField id="standard-basic1" type={"text"} className='col-sm-12 w-100' label="Full Name" variant="standard" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mb-4'>
              <TextField id="standard-basic3" type={"text"} className='col-sm-12 w-100' label="Subject" variant="standard" required value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className='mb-4'>
              <TextField id="standard-basic4" minRows={10} className='col-sm-12 w-100' label="Message" variant="standard" required value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <Button variant="contained" type='submit' className='w-100 mt-3 p-3 mb-5'
              style={{ backgroundColor: "#032740" }} onClick={handleClick}>
              Submit &nbsp;
              <i className="fa-solid fa-paper-plane"></i>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;