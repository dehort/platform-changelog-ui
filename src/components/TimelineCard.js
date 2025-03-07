import React from 'react';
import {Card, CardTitle, CardBody, CardFooter} from '@patternfly/react-core';

export const TimelineCardWrapper = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <TimelineCard {...props}/>
        </div>
    )
});

const type = {commit: 'commit', deploy: 'deploy'};

// type TimelineCardProps = {
//     timeline: any;
//     includeRepo: boolean;
//     ghURL: string;
//     glURL: string;
// }

const TimelineCard = (props) => {
    const {timeline, includeRepo, ghURL, glURL} = props;

    return (
        <div style={timeline.type == type.deploy ? deployStyle : commitStyle}>
            <Card isCompact isFlat>
                {includeRepo && <CardTitle>{timeline.repo}</CardTitle>}
                {timeline.type == type.commit &&
                    <CardBody>
                        <p>Commit:&nbsp;
                            <a 
                                href={ghURL != "" 
                                ? `${ghURL}/commit/${timeline.ref}` 
                                : `${glURL}/-/commit/${timeline.ref}`} 
                                target="_blank" 
                                rel="noreferrer noopener"
                            >
                                <b>{timeline.ref}</b>
                            </a>
                        </p>
                        <p>{timeline.author}</p>
                        <p>{timeline.message}</p>
                        <p>{timeline.timestamp}</p>
                    </CardBody>
                }
                {timeline.type == type.deploy &&
                    <CardBody>
                        <p><b>Deploy</b></p>
                        <p>Namespace: {timeline.namespace}</p>
                        <p>Cluster: {timeline.cluster}</p>
                        <p>Status: {timeline.status}</p>
                        <p>Timestamp: {timeline.timestamp}</p>
                    </CardBody>
                }
            </Card>
        </div>
    )
}


var commitStyle = {
    width: "60%",
    marginLeft: "10%",
    paddingBottom: "10px",
}

var deployStyle = {
    width: "60%",
    marginLeft: "30%",
    paddingBottom: "10px",
}