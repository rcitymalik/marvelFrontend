import {useSelector,useDispatch} from "react-redux";
import {selectUser,selectToken} from "../store/user/userSelectors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {selectTeamCharacters,selectTeam} from "../store/characters/selector";
import {makeTeam, getTeam, deleteCharacter} from "../store/characters/characteractions";
import {useState,useEffect} from "react";

import {Card,Button,Container,Row,Col,Form} from "react-bootstrap";
import {Link,Navigate} from "react-router-dom";

import {showMakeAuctionModal,showMyAuctionsModal} from "../store/proposals/proposalSlice";
import {fetchAuctions} from "../store/proposals/proposalActions";
import {MakeAuction} from "./MakeAuction";
import {SeeMyAuctions} from "./SeeMyAuctions";

export const Profile = ()=>{

    const [teamName,setTeamName]= useState("");
    const profile = useSelector(selectUser);
    const teamCharacters = useSelector(selectTeamCharacters);
    const userId = profile?.id;

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const team = useSelector(selectTeam);

    useEffect(()=>{
        dispatch(getTeam(userId));
        dispatch(fetchAuctions())
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
    if (!token) return <Navigate to="/login"/>
    return(
        <div  style={{ background: "radial-gradient(590px at 8.2% 13.8%, rgb(18, 35, 60) 0%, rgb(187, 187, 187) 90%)",marginTop:"10px" }}>
            <MakeAuction/>
            <SeeMyAuctions/>
                <Container >
                    <Row className="justify-content-center align-items-center h-100">
                        <Col lg="9" xl="7">
                            <Card bg='dark'>
                                <Card.Header bg='dark' className="rounded-top text-white d-flex flex-row" style={{  height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '180px',  }}>
                                        <Card.Img src="#"
                                                  alt="#" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                                        <Button variant="outline-light" style={{height: '36px', overflow: 'visible',width:"150px"}}>
                                            Edit profile <FontAwesomeIcon icon={faPenToSquare}/>
                                        </Button>
                                        <Card.Text>Email: {profile?.email}</Card.Text>
                                    </div>
                                    <div className="ms-4" style={{ marginTop: '130px',marginBottom:"15px"}}>
                                        <Card.Text as="h5">{profile?.name.toUpperCase()}</Card.Text>
                                        <Card.Text>GOTHAM CITY</Card.Text>
                                    </div>
                                </Card.Header>
                                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div className="px-3">
                                            <Button variant="outline-secondary" onClick={()=>{dispatch(showMyAuctionsModal())}}>My Auctions</Button>
                                        </div>
                                        <div className="px-3">
                                            <Button variant="outline-secondary" onClick={()=>{dispatch(showMakeAuctionModal())}}>Auction</Button>
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

                                    <Row>
                                        {team ? <Card.Text>{team.name.toUpperCase()}</Card.Text> :
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicName">
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
                                        <Col className="mb-4">
                                            {teamCharacters ? teamCharacters.map(character =>{
                                                return(
                                                    <Card>
                                                        <Card.Img variant="top" src={`${character.imageUrl}/portrait_incredible.jpg`} style={{ width: '205px',height:'150px'}}/>
                                                        <Link to={`/details/${character.apiId}`}>
                                                            <Button variant="info" style={{transform: 'rotate(2deg)', alignSelf:'center', margin:'5px',
                                                                padding:'0 5px',
                                                                background:'#ddd',
                                                                border:'1px solid #222',
                                                                boxShadow:'3px 3px 0 #222'}}><Card.Title>{character.name}</Card.Title></Button>
                                                        </Link>
                                                        <Button onClick={()=>{dispatch(deleteCharacter(character.id))}}>❌</Button>
                                                    </Card>
                                                )
                                            }) : <h5>Your team is empty</h5>
                                            }
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