import React from 'react'
import Donutchart from './Donutchart';

const Diagramm = (props) => {
    return (
        <div className="diagram">
            {props.dataSets.map(dataSet => (
                <Donutchart
                    value={dataSet.value}
                    mxaValue={null}
                    label={dataSet.label} />
            ))}
        </div>
    )
}

export default Diagramm;