import React, { useEffect } from 'react';

import Moment from 'react-moment';

import { Td } from '@patternfly/react-table';

import { CodeBranchIcon } from '@patternfly/react-icons';

import GenericTable from './GenericTable';

/**
 * Options to pass in the desired data or the data path to the table
 */
function CommitTable({data = undefined, dataPath = "/api/v1/commits", gh_url="", gl_url=""}) {

    function FormatColumn(column) {
        if (column === "ID") {
            return null;
        } else if (column === "ServiceID") {
            return null;
        } else if (column === "Repo") {
            return "Repository";
        }
        return column;
    }

    function FormatCell(cell, row, columns, rowIndex, cellIndex, compoundExpandParams = null) {
        const column = columns[cellIndex];
   
        let expandable = false;

        // do not display the id or serviceID columns
        if (column === "ID" || column === "ServiceID") {
            return null;
        }

        let cellContents;
        
        if (column === "Ref") {
            // a link to the commit, so this function needs a service's url
            // can a project have a GL and a GH repo?
            const icon = <CodeBranchIcon key="icon" />;

            // example: https://github.com/RedHatInsights/rhsm-subscriptions/commit/{Ref}
            if (gh_url !== "") {
                cellContents = <a href={`${gh_url}/commit/${cell}`} target="_blank" rel="noreferrer noopener">{icon}</a>;
            } 
            else if (gl_url !== "") { // example: https://gitlab.cee.redhat.com/service/app-interface/-/commit/{Ref}
                cellContents = <a href={`${gl_url}/-/commit/${cell}`} target="_blank" rel="noreferrer noopener">{icon}</a>; // might want to handle if the url has a / at the end, too.
            } 
            else {
                cellContents = <>{icon}</>;
                expandable = true;
            } 

        } else if (column === "Timestamp") {
            cellContents = <Moment date={cell} />;
        } else {
            cellContents = <>{cell}</>;
        }

        return <Td key={`${rowIndex}_${cellIndex}`} 
                dataLabel={column} compoundExpand={expandable && compoundExpandParams != null ? compoundExpandParams(rowIndex, cellIndex) : null}>
                    {cellContents}
                </Td>;
    }

    return (
        <GenericTable title="Commits" provideData={data} dataPath={dataPath} cellFunction={FormatCell} columnFunction={FormatColumn} />
    );
}

export default CommitTable;
