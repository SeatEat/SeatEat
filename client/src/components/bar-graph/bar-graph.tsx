import React, { FC, useEffect } from 'react';
import './bar-graph.css';

export type BarGraphProps = {
    values: number[],
    limit: number,
    limitText: string
    buildGroundValues: (index: number) => string
}

const BarGraph: FC<BarGraphProps> = (props) => {

    const getSizeRatio = (value: number) => {
        return (value / getMaxValue()) * 100;
    }

    const createBarItems = () => {
        return props.values.map((value, index) => {
            return (
                <div 
                    key={`bar-item-${index}`}
                    className="bar-graph-bar-item bar-graph-bar-size"
                    style={{
                        height: `${getSizeRatio(value)}%`,
                        width: `${getSizeRatio(value)}%`
                    }}></div>
            )
        });
    };

    const getMaxValue = () => {
        const marginToRoof = 1.2;
        return (Math.max(props.limit, Math.max(...props.values))) * marginToRoof;
    }

    const createBarGroundItems = () => {
        return props.values.map((_, index) => {
            return (
                <div key={`bar-ground-item¨-${index}`} className="bar-graph-bar-size bar-graph-bar-ground-unit">
                    {props.buildGroundValues(index)}
                </div>
            )
        });
    }

    const createBarValueItems = () => {
        const amountOfValues = 30;
        const valuePerStep = getMaxValue() / amountOfValues;
        let elements = [];
        for(let i = 1; i <= amountOfValues; i++) {
            elements.push(
                <div key={`bar-value-${i}`} className="bar-graph-bar-value-unit">
                    <div className="bar-graph-bar-value-unit-content">
                        {i % 2 === 1 ? Math.round(valuePerStep * i) : ''}
                        {
                            i !== amountOfValues
                            ? <div className="bar-graph-line"></div>
                            : <></>
                        }
                    </div>
                </div>
            );
        }
        return elements;
    }

    return (
        <div className="bar-graph">
            <div className="bar-graph-bar-base">
                {
                    createBarGroundItems()
                }
            </div>
            <div className="bar-graph-bar-value">
                {
                    createBarValueItems()
                }
            </div>
            <div className="bar-graph-bar-content">
                <div
                    style={{
                        height: `${getSizeRatio(props.limit)}%`,
                        width: `${getSizeRatio(props.limit)}%`
                    }}
                    className="bar-graph-limit">
                        <div className="bar-graph-limit-line"></div>
                        <div className="bar-graph-limit-text">
                            {props.limitText}
                        </div>
                        <div className="bar-graph-limit-line"></div>
                    </div>
                {
                    createBarItems()
                }
            </div>
        </div>
    );
}

export default BarGraph;
