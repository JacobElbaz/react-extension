/*global chrome*/
import {useState} from 'react'
import Item from './Item'
import {v4 as uuidv4} from 'uuid'
import URL from './Url'
import {Accordion} from 'react-bootstrap'

export default function List() {

    let listOfGroups = [];
    
    const [toggle, setToggle] = useState(false)
    
    const [dataArr, setDataArr] = useState(listOfGroups);
    
    chrome.storage.sync.get(['ListOfGroups'], function (result){
        if(result.ListOfGroups != null){
            listOfGroups = result.ListOfGroups;
            setDataArr(listOfGroups);}
    });

    const [stateInput, setStateInput] = useState("");

    const [inputLines, setInputLines] = useState([
        {txt: "", id: uuidv4()}
    ])

    const linkedInput = e => {
        setStateInput(e);
    }

    const changeState = () => {
        setToggle(!toggle);
        setInputLines([{txt: "", id: uuidv4()}]);
    };

    const addGroup = e => {
        e.preventDefault();
        const newArr = [...dataArr];
        const newGroup = {};
        newGroup.txt = stateInput;
        newGroup.id = uuidv4();
        newGroup.urls = [...inputLines];
        newArr.push(newGroup);
        setDataArr(newArr);
        setInputLines([{txt: "", id: uuidv4()}]);
        chrome.storage.sync.set({'ListOfGroups': newArr});
        changeState();
    }

    const deleteElement = id => {
        const filteredSate = dataArr.filter(item => {
            return item.id !== id;
        })
        setDataArr(filteredSate)
        chrome.storage.sync.set({'ListOfGroups': filteredSate});
    }

    const setUrl = (value, id) => {
        const newArr = inputLines.filter(item => {
            return item.id !== id;
        })
        const newU = {txt: value, id: id}
        newArr.push(newU)
        setInputLines(newArr)
        console.log(inputLines[inputLines.length - 1].txt)
    }

    const addLine = () => {
        const newArr = [...inputLines]
        const newInput = {}
        newInput.txt = ""
        newInput.id = uuidv4()
        newArr.push(newInput)
        setInputLines(newArr)
    }

    if(toggle === false){
    return (
        <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">
            <label htmlFor="groups" className="form-label mt-3">Url Groups</label>
            <Accordion className="list-group">
                {dataArr.map((item) => {
                    return (
                        <Item 
                        txt={item.txt} 
                        key={item.id}
                        id={item.id}
                        urls={item.urls}
                        delFunc={deleteElement}/>
                    )
                })}
            </Accordion>
            <button onClick={changeState} className="w-100 mt-2 btn btn-primary">+Add a new group</button>
        </div>
    )}
    else if(toggle){
        return (
        <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">
            <form onSubmit={e => addGroup(e)} className="mb-3">
                <label htmlFor="todo" className="form-label mt-3">Group name</label>
                <input onInput={e => linkedInput(e.target.value)} type="text" className="form-control" id="group-name"/>
                <label htmlFor="todo" className="form-label mt-3">Group urls</label>
                {inputLines.map((line) => {
                    return (
                        <URL
                        txt={line.txt}
                        id={line.id}
                        setUrl={setUrl}/>
                    )
                })}
                <button type="button" disabled={inputLines[inputLines.length - 1].txt == "" || stateInput == ""} onClick={addLine} className="w-100 btn btn-outline-secondary">+</button>
                <button type="submit" disabled={inputLines[inputLines.length - 1].txt == "" || stateInput == ""} className="w-100 mt-1 btn btn-primary">Add</button>
            </form>
            <button onClick={changeState} className="w-100 mt-1 btn btn-danger">Cancel</button>
        </div>
        )
    }
}
