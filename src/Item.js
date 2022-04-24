/*global chrome*/
import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Accordion} from 'react-bootstrap'
import {useState} from 'react'
import {Alert} from 'react-bootstrap'
 
export default function Item(props) {
    
    const [show, setShow] = useState(false)
    const openUrls = () => {
        for (let i = 0; i < props.urls.length; i++) {
            chrome.tabs.create({url: props.urls[i].txt});
        }
    }

    return (
        <Accordion.Item eventKey={props.id}>
            <Accordion.Header>{props.txt}</Accordion.Header>
            <Accordion.Body className='bg-dark'>
                <ul className='list-group'>
                {props.urls.map((item) => {
                    const img =  "https://logo.clearbit.com/"+item.txt.replace('https://', '');
                    return (
                        <li type='button' className="btn-dark d-flex justify-content-between align-items-center p-2 m-0" onClick={() => {window.open(item.txt, item.id)}}>{item.txt}<img src= {img} alt='' height={20}/></li>
                    )
                })}
                <button className='w-100 mt-1 btn btn-secondary' onClick={() => openUrls()}>Open all</button>
                <button className='w-100 mt-1 btn btn-danger' onClick={() => setShow(true)}>Delete this group</button>
                </ul>
                <Alert show={show} variant="danger">
                    <Alert.Heading>Are you sure ?</Alert.Heading>
                    <div className="d-flex justify-content-end">
                    <button className='btn btn-danger' onClick={() => props.delFunc(props.id)} variant="danger">Yes, delete</button>
                    <button className='btn btn-secondary' onClick={() => setShow(false)}>No</button>
                    </div>
                </Alert>
            </Accordion.Body>
        </Accordion.Item>
    )
}
