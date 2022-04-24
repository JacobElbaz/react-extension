import React from 'react'

export default function URL(props) {
    return (
        <div>
            <input onChange={e => props.setUrl(e.target.value, props.id)} defaultValue={props.txt} type="text" className="form-control mt-1" id="url"/>
        </div>
    )
}
