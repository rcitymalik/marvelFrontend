import {useSelector,useDispatch} from "react-redux";
import {selectUser} from "../store/user/userSelectors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {selectTeamCharacters,selectTeam} from "../store/characters/selector";
import {makeTeam, getTeam, deleteCharacter} from "../store/characters/characteractions";
import {useState,useEffect} from "react";

import {Card,Button,Container,Row,Col,Form} from "react-bootstrap";

export const Profile = ()=>{

    const [teamName,setTeamName]= useState("");
    const profile = useSelector(selectUser);
    const teamCharacters = useSelector(selectTeamCharacters);
    const userId = profile?.id;
    const dispatch = useDispatch();
    const team = useSelector(selectTeam);

    useEffect(()=>{
        dispatch(getTeam(userId));
    },[dispatch,profile])

    const submitTeamName = (e) =>{
        e.preventDefault()
        const name = teamName;
        const team = {name,userId}
        dispatch(makeTeam(team))
        setTeamName("")
        dispatch(getTeam(userId))

    }


    console.log(teamCharacters);
    return(
        <div className="gradient-custom-2" style={{ background: "radial-gradient(590px at 8.2% 13.8%, rgb(18, 35, 60) 0%, rgb(187, 187, 187) 90%)" }}>
            <Container className="py-5 h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col lg="9" xl="7">
                        <Card bg='dark'>
                            <Card.Header bg='dark' className="rounded-top text-white d-flex flex-row" style={{  height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px',  }}>
                                    <Card.Img src="#"
                                               alt="#" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                                    <Button variant="outline-light" style={{height: '36px', overflow: 'visible'}}>
                                        Edit profile
                                    </Button>
                                </div>
                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <Card.Text as="h5">{profile?.name.toUpperCase()}</Card.Text>
                                    <Card.Text>GOTHAM CITY</Card.Text>
                                </div>
                            </Card.Header>
                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div className="px-3">
                                        <Card.Text className="mb-1 h5">Email: {profile?.email}</Card.Text>
                                        <Card.Text className="small text-muted mb-0"></Card.Text>
                                    </div>

                                </div>
                            </div>
                            <Card.Body style={{ backgroundColor: '#f8f9fa' }} bg='light' className="text-black p-4">
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1">About</p>
                                    <div className="p-4" style={{ backgroundColor: 'whitesmoke', width:"100%" }}>
                                        <Card.Text>
                                            {profile?.about}
                                        </Card.Text>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <Card.Text className="lead fw-normal mb-0">My Avengers</Card.Text>
                                </div>
                                <Button variant={"outline-dark"}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                                <Row>
                                    {team ? <Card.Text>{team.name.toUpperCase()}</Card.Text> :
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Team Name</Form.Label>
                                                <Form.Control type="name" placeholder="Name" value={teamName} onChange={(e)=> setTeamName(e.target.value)} />
                                                <Form.Text className="text-muted">
                                                    Choose something Fresh & Groovy! 🤯
                                                </Form.Text>
                                            </Form.Group>

                                            <Button onClick={submitTeamName} variant="secondary" type="submit">
                                                Make team
                                            </Button>
                                        </Form>
                                    }
                                    {teamCharacters ? teamCharacters.map(character =>{
                                        return(
                                            <li>
                                                {character.name}
                                                <Button onClick={()=>{dispatch(deleteCharacter(character.id))}}>Delete</Button>
                                            </li>
                                        )
                                    }) : <h5>Your team is empty</h5>
                                    }
                                    <Col className="mb-2">
                                        <Card.Img src="#"
                                                      alt="" className="w-100 rounded-3" />
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}