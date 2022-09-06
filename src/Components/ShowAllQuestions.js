import './style.css';

import React, { useState, useEffect } from 'react';
import api from '../ConfigApi/api';
import QuizCard from './QuizCard';
import Swal2 from "sweetalert2";
import { Nav, NavDropdown } from 'react-bootstrap';

const ShowAllQuestions = () => {

    const userName = localStorage.getItem('name')

    const [questions, setQuestions] = useState([])
    const [answer, setAnswer] = useState([]);


    const setListAns = (_id, correct_option) => {
        const findIndex = answer.findIndex(obj => obj._id === _id)
        findIndex === -1 && setAnswer([...answer, { _id, correct_option }])
    }

    const filter = (e) => {
        api.get("quiz/questions")
            .then((res) => {
                setQuestions(res.data.data)
            })
    }

    useEffect(() => filter(), [])

                const submitHandle = (e) => {
                    e.preventDefault()
                    api.post("quiz/calculate-score", { optionsTicked: answer}) 
                    .then((res)=>{ 
                        if (res.data.message) {
                            const updateArr = questions.map(obj => {
                                const index = res.data.message.findIndex(xyz => xyz._id === obj._id)
                                return {
                                    ...obj,
                                    ...res.data.message[index]
                                }
                            })
                            setQuestions(updateArr)
                        }    
                        Swal2.fire({
                            icon : res.data.status,
                            title: `Your score is ${res.data.score}.`
                        })
                }) 
            }

            const logOut = () => {
                localStorage.clear()
                window.location.href = '/logIn';
            }

return (
    <>
        {/* <!-- ======= Header ======= --> */}
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <a href="index.html" className="logo d-flex align-items-center">
                    <span className="d-none d-lg-block head-title">QUIZ: India-pedia</span>
                </a>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <Nav>
                        <div className="nav-link nav-profile d-flex align-items-center pe-0" style={{ textAlign: 'right', margin: '5px', display: 'block'}} data-bs-toggle="dropdown">
                            <NavDropdown title="LogOut" onClick={logOut}>
                            </NavDropdown>
                            <NavDropdown title={userName} >
                            </NavDropdown>
                        </div>
                    </Nav>
                </ul>
            </nav>
        </header>
        {/* <!-- ======= Header ======= --> */}


        <h1>Quiz</h1>

        <h2 className='p-2'>Let's test your knowledge about India!</h2>

        <hr></hr>
        <form className="row g-3 needs-validation" onSubmit={submitHandle}>
        <section className="section row p-5 ">
            {
                questions.map(e =>
                    <QuizCard key={e._id} {...e} setAnswer={setListAns} answer={answer}/>) 
            }

        <button type="submit" className='submit-button' style={{border: '0', borderRadius: '0.25em', background: 'initial', backgroundColor: '#7066e0', color: '#fff', 
        fontSize: '1em'}}> 
            Submit
        </button>    

            <div className="section row d-flex justify-content-center">
                <div className=' d-flex flex-column py-2'>
                    <section className="section register d-flex flex-column align-items-center justify-content-center py-2">
                    </section>
                </div>
            </div>

        </section>
        </form>


        {/* <!-- ======= Footer ======= --> */}
        <footer className="footer">
            <div className="copyright">
                © Copyright <strong><span>Bingedd!!!</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
        </footer>
        {/* <!-- End Footer --> */}
    </>
)
}

export default ShowAllQuestions;